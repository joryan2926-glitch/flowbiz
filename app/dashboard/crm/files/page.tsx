"use client";

/* ======================================================
FLOWBIZ CRM FILES
SUPABASE STORAGE CONNECTED
====================================================== */

import "./crm-files.css";

import {

  useEffect,
  useState,

} from "react";

import {

  supabase,

} from "../../../lib/supabase";

import {

  BrainCircuit,
  Upload,
  Trash2,
  Loader2,
  Search,
  FileText,
  Download,
  HardDrive,

} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface CRMFile{

  id:string;

  file_name:string;

  file_url:string;

  file_size:number;

  client_name:string;

  uploaded_by:string;

  created_at:string;
}

/* ======================================================
PAGE
====================================================== */

export default function FilesPage(){

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [

    loading,
    setLoading,

  ] =
    useState(true);

  const [

    uploading,
    setUploading,

  ] =
    useState(false);

  const [

    files,
    setFiles,

  ] =
    useState<CRMFile[]>([]);

  const [

    search,
    setSearch,

  ] =
    useState("");

  const [

    clientName,
    setClientName,

  ] =
    useState("");

  const [

    uploadedBy,
    setUploadedBy,

  ] =
    useState("");

  /*
  ====================================================
  LOAD FILES
  ====================================================
  */

  useEffect(()=>{

    loadFiles();

    realtime();

  },[]);

  async function loadFiles(){

    try{

      const {

        data,
        error,

      } =

        await supabase

          .from("crm_files")

          .select("*")

          .order(
            "created_at",
            {
              ascending:false,
            }
          );

      if(error){

        console.log(error);

        return;
      }

      setFiles(data || []);

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);
    }
  }

  /*
  ====================================================
  REALTIME
  ====================================================
  */

  function realtime(){

    supabase

      .channel("crm-files-live")

      .on(

        "postgres_changes",

        {

          event:"*",

          schema:"public",

          table:"crm_files",
        },

        ()=>{

          loadFiles();
        }
      )

      .subscribe();
  }

  /*
  ====================================================
  UPLOAD
  ====================================================
  */

  async function uploadFile(
    event:any
  ){

    const file =
      event.target.files?.[0];

    if(!file) return;

    try{

      setUploading(true);

      /*
      ================================================
      FILE NAME
      ================================================
      */

      const fileName =

        `${Date.now()}-${
          file.name
        }`;

      /*
      ================================================
      STORAGE UPLOAD
      ================================================
      */

      const {

        error:uploadError,

      } =

        await supabase

          .storage

          .from("crm-files")

          .upload(

            fileName,

            file
          );

      if(uploadError){

        console.log(uploadError);

        return;
      }

      /*
      ================================================
      GET URL
      ================================================
      */

      const {

        data:urlData,

      } =

        supabase

          .storage

          .from("crm-files")

          .getPublicUrl(
            fileName
          );

      /*
      ================================================
      INSERT DB
      ================================================
      */

      const {

        error:dbError,

      } =

        await supabase

          .from("crm_files")

          .insert([

            {

              file_name:
                file.name,

              file_url:
                urlData.publicUrl,

              file_size:
                file.size,

              client_name:
                clientName,

              uploaded_by:
                uploadedBy,
            },
          ]);

      if(dbError){

        console.log(dbError);
      }

    }catch(error){

      console.log(error);

    }finally{

      setUploading(false);
    }
  }

  /*
  ====================================================
  DELETE
  ====================================================
  */

  async function deleteFile(
    item:CRMFile
  ){

    /*
    ================================================
    STORAGE DELETE
    ================================================
    */

    const filePath =

      item.file_url
        .split("/")
        .pop();

    if(filePath){

      await supabase

        .storage

        .from("crm-files")

        .remove([
          filePath
        ]);
    }

    /*
    ================================================
    DB DELETE
    ================================================
    */

    await supabase

      .from("crm_files")

      .delete()

      .eq(
        "id",
        item.id
      );
  }

  /*
  ====================================================
  FILTER
  ====================================================
  */

  const filteredFiles =

    files.filter(

      item =>

        item.file_name
          .toLowerCase()

          .includes(
            search.toLowerCase()
          )

        ||

        item.client_name
          ?.toLowerCase()

          .includes(
            search.toLowerCase()
          )
    );

  /*
  ====================================================
  SIZE FORMAT
  ====================================================
  */

  function formatSize(
    bytes:number
  ){

    if(bytes < 1024){

      return `${bytes} B`;
    }

    if(bytes < 1048576){

      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    return `${(
      bytes / 1048576
    ).toFixed(1)} MB`;
  }

  /*
  ====================================================
  LOADING
  ====================================================
  */

  if(loading){

    return(

      <div className="filesLoader">

        <Loader2
          className="spin"
        />

      </div>
    );
  }

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="filesPage">

      {/* ==================================================
      HEADER
      ================================================== */}

      <header className="filesHeader">

        <div>

          <div className="filesBadge">

            <BrainCircuit
              size={16}
            />

            FLOWBIZ FILES

          </div>

          <h1>

            Smart Documents

          </h1>

          <p>

            Gestion des documents
            clients connectés
            avec Supabase Storage.

          </p>

        </div>

      </header>

      {/* ==================================================
      UPLOAD
      ================================================== */}

      <section className="filesUpload">

        <input

          type="text"

          placeholder="
          Nom client
          "

          value={clientName}

          onChange={(e)=>

            setClientName(
              e.target.value
            )
          }
        />

        {/* ============================================== */}

        <input

          type="text"

          placeholder="
          Uploadé par
          "

          value={uploadedBy}

          onChange={(e)=>

            setUploadedBy(
              e.target.value
            )
          }
        />

        {/* ============================================== */}

        <label className="uploadButton">

          {

            uploading

            ? "Upload..."

            : (

              <>

                <Upload
                  size={18}
                />

                Importer fichier

              </>
            )
          }

          <input

            type="file"

            hidden

            onChange={uploadFile}
          />

        </label>

      </section>

      {/* ==================================================
      SEARCH
      ================================================== */}

      <section className="filesSearch">

        <Search size={18} />

        <input

          type="text"

          placeholder="
          Rechercher...
          "

          value={search}

          onChange={(e)=>

            setSearch(
              e.target.value
            )
          }
        />

      </section>

      {/* ==================================================
      LIST
      ================================================== */}

      <section className="filesList">

        {

          filteredFiles.map(

            item => (

              <div
                key={item.id}
                className="fileCard"
              >

                {/* ==============================
                LEFT
                ============================== */}

                <div className="fileLeft">

                  <div className="fileIcon">

                    <FileText
                      size={24}
                    />

                  </div>

                  {/* ========================== */}

                  <div>

                    <h3>

                      {
                        item.file_name
                      }

                    </h3>

                    <span>

                      {
                        item.client_name
                      }

                    </span>

                    {/* ====================== */}

                    <div className="fileMeta">

                      <div>

                        <HardDrive
                          size={14}
                        />

                        {
                          formatSize(
                            item.file_size
                          )
                        }

                      </div>

                      {/* ================== */}

                      <div>

                        Uploadé par :

                        {
                          item.uploaded_by
                        }

                      </div>

                    </div>

                  </div>

                </div>

                {/* ==============================
                RIGHT
                ============================== */}

                <div className="fileRight">

                  <a

                    href={
                      item.file_url
                    }

                    target="_blank"

                    className="fileDownload"
                  >

                    <Download
                      size={18}
                    />

                  </a>

                  {/* ========================== */}

                  <button

                    className="fileDelete"

                    onClick={()=>

                      deleteFile(item)
                    }
                  >

                    <Trash2
                      size={18}
                    />

                  </button>

                </div>

              </div>
            )
          )
        }

      </section>

    </div>
  );
}
