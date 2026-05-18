"use client";

/* ======================================================
FLOWBIZ CRM CHAT
REALTIME TEAM CHAT
====================================================== */

import "./crm-chat.css";

import {

  useEffect,
  useRef,
  useState,

} from "react";

import {

  supabase,

} from "../../../lib/supabase";

import {

  BrainCircuit,
  Send,
  Loader2,
  MessageSquare,
  Users,
  Hash,

} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface Message{

  id:string;

  sender:string;

  message:string;

  room:string;

  created_at:string;
}

/* ======================================================
ROOMS
====================================================== */

const rooms = [

  "general",
  "sales",
  "support",
  "marketing",
];

/* ======================================================
PAGE
====================================================== */

export default function ChatPage(){

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

    messages,
    setMessages,

  ] =
    useState<Message[]>([]);

  const [

    room,
    setRoom,

  ] =
    useState("general");

  const [

    sender,
    setSender,

  ] =
    useState("");

  const [

    input,
    setInput,

  ] =
    useState("");

  const messagesEndRef =
    useRef<HTMLDivElement>(
      null
    );

  /*
  ====================================================
  LOAD
  ====================================================
  */

  useEffect(()=>{

    loadMessages();

  },[room]);

  /*
  ====================================================
  REALTIME
  ====================================================
  */

  useEffect(()=>{

    const channel =

      supabase

        .channel(
          "crm-chat-live"
        )

        .on(

          "postgres_changes",

          {

            event:"INSERT",

            schema:"public",

            table:
              "crm_chat_messages",
          },

          ()=>{

            loadMessages();
          }
        )

        .subscribe();

    return ()=>{

      supabase.removeChannel(
        channel
      );
    };

  },[room]);

  /*
  ====================================================
  AUTO SCROLL
  ====================================================
  */

  useEffect(()=>{

    messagesEndRef.current
      ?.scrollIntoView({

        behavior:"smooth",
      });

  },[messages]);

  /*
  ====================================================
  LOAD MESSAGES
  ====================================================
  */

  async function loadMessages(){

    try{

      const {

        data,
        error,

      } =

        await supabase

          .from(
            "crm_chat_messages"
          )

          .select("*")

          .eq(
            "room",
            room
          )

          .order(
            "created_at",
            {
              ascending:true,
            }
          );

      if(error){

        console.log(error);

        return;
      }

      setMessages(data || []);

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);
    }
  }

  /*
  ====================================================
  SEND
  ====================================================
  */

  async function sendMessage(){

    if(

      !sender ||

      !input

    ) return;

    try{

      const { error } =

        await supabase

          .from(
            "crm_chat_messages"
          )

          .insert([

            {

              sender,

              message:input,

              room,
            },
          ]);

      if(error){

        console.log(error);

        return;
      }

      setInput("");

    }catch(error){

      console.log(error);
    }
  }

  /*
  ====================================================
  LOADING
  ====================================================
  */

  if(loading){

    return(

      <div className="chatLoader">

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

    <div className="chatPage">

      {/* ==================================================
      SIDEBAR
      ================================================== */}

      <aside className="chatSidebar">

        <div className="chatLogo">

          <BrainCircuit
            size={18}
          />

          FLOWBIZ CHAT

        </div>

        {/* ============================================== */}

        <div className="chatRooms">

          {

            rooms.map(

              item => (

                <button

                  key={item}

                  className={`

                    roomButton

                    ${
                      room === item
                      ? "active"
                      : ""
                    }

                  `}

                  onClick={()=>

                    setRoom(item)
                  }
                >

                  <Hash size={16} />

                  {
                    item
                  }

                </button>
              )
            )
          }

        </div>

        {/* ============================================== */}

        <div className="chatUser">

          <Users size={16} />

          Équipe connectée

        </div>

      </aside>

      {/* ==================================================
      CHAT CONTENT
      ================================================== */}

      <section className="chatContent">

        {/* ==============================================
        HEADER
        ============================================== */}

        <div className="chatHeader">

          <div>

            <MessageSquare
              size={18}
            />

            {
              room
            }

          </div>

        </div>

        {/* ==============================================
        MESSAGES
        ============================================== */}

        <div className="chatMessages">

          {

            messages.map(

              msg => (

                <div
                  key={msg.id}
                  className="chatMessage"
                >

                  <div className="chatAvatar">

                    {

                      msg.sender
                        .charAt(0)
                    }

                  </div>

                  {/* ==========================
                  CONTENT
                  ========================== */}

                  <div className="chatBubble">

                    <div className="chatTop">

                      <strong>

                        {
                          msg.sender
                        }

                      </strong>

                      <span>

                        {

                          new Date(
                            msg.created_at
                          )

                          .toLocaleTimeString()
                        }

                      </span>

                    </div>

                    <p>

                      {
                        msg.message
                      }

                    </p>

                  </div>

                </div>
              )
            )
          }

          <div ref={messagesEndRef} />

        </div>

        {/* ==============================================
        INPUT
        ============================================== */}

        <div className="chatInputBox">

          <input

            type="text"

            placeholder="
            Votre nom
            "

            value={sender}

            onChange={(e)=>

              setSender(
                e.target.value
              )
            }
          />

          {/* ========================================== */}

          <input

            type="text"

            placeholder="
            Message...
            "

            value={input}

            onChange={(e)=>

              setInput(
                e.target.value
              )
            }

            onKeyDown={(e)=>{

              if(
                e.key === "Enter"
              ){

                sendMessage();
              }
            }}
          />

          {/* ========================================== */}

          <button
            onClick={sendMessage}
          >

            <Send size={18} />

          </button>

        </div>

      </section>

    </div>
  );
}
