"use client";

/* ======================================================
FLOWBIZ AI
FINAL AI ASSISTANT
====================================================== */

import "./ai.css";

import {

  useState,

} from "react";

import {

  BrainCircuit,
  Send,
  Sparkles,
  Bot,
  User2,
  WandSparkles,
  FileText,
  Mail,
  Megaphone,
  TrendingUp,
  Lightbulb,

} from "lucide-react";

/* ======================================================
MESSAGE
====================================================== */

interface Message{

  id:number;

  role:string;

  content:string;
}

/* ======================================================
INITIAL
====================================================== */

const initialMessages:Message[] = [

  {
    id:1,

    role:"assistant",

    content:
      "Bonjour Jordan 👋 Je suis l’assistant IA FlowBiz. Comment puis-je vous aider aujourd’hui ?",
  },
];

/* ======================================================
PAGE
====================================================== */

export default function AIPage(){

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [

    messages,
    setMessages,

  ] =
    useState(initialMessages);

  const [

    input,
    setInput,

  ] =
    useState("");

  /*
  ====================================================
  SEND
  ====================================================
  */

  function sendMessage(){

    if(!input.trim())
      return;

    const userMessage = {

      id:Date.now(),

      role:"user",

      content:input,
    };

    const aiMessage = {

      id:Date.now()+1,

      role:"assistant",

      content:
        "Analyse FlowBiz générée automatiquement. Cette réponse sera connectée plus tard à OpenAI API + automatisations métier.",
    };

    setMessages([

      ...messages,

      userMessage,

      aiMessage,
    ]);

    setInput("");
  }

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="aiPage">

      {/* ==================================================
      SIDEBAR
      ================================================== */}

      <aside className="aiSidebar">

        <div className="aiSidebarTop">

          <div className="aiLogo">

            <BrainCircuit />

          </div>

          <h2>

            FlowBiz AI

          </h2>

          <p>

            Copilote intelligent
            business & CRM.

          </p>

        </div>

        {/* ============================================== */}

        <div className="aiTools">

          <div className="aiTool active">

            <Sparkles size={18} />

            Assistant IA

          </div>

          <div className="aiTool">

            <Mail size={18} />

            Emails IA

          </div>

          <div className="aiTool">

            <FileText size={18} />

            Devis IA

          </div>

          <div className="aiTool">

            <Megaphone size={18} />

            Marketing IA

          </div>

          <div className="aiTool">

            <TrendingUp size={18} />

            Analytics IA

          </div>

          <div className="aiTool">

            <Lightbulb size={18} />

            Automatisation

          </div>

        </div>

      </aside>

      {/* ==================================================
      CHAT
      ================================================== */}

      <section className="aiChat">

        {/* ==============================================
        HEADER
        ============================================== */}

        <header className="aiChatHeader">

          <div>

            <div className="aiBadge">

              <WandSparkles size={16} />

              FLOWBIZ GPT

            </div>

            <h1>

              AI Workspace

            </h1>

          </div>

        </header>

        {/* ==============================================
        MESSAGES
        ============================================== */}

        <div className="aiMessages">

          {
            messages.map(

              message => (

                <div

                  key={message.id}

                  className={`

                    aiMessage

                    ${
                      message.role ===
                      "assistant"

                      ? "assistant"

                      : "user"
                    }

                  `}
                >

                  <div className="aiMessageIcon">

                    {
                      message.role ===
                      "assistant"

                      ? <Bot size={18} />

                      : <User2 size={18} />
                    }

                  </div>

                  <div className="aiMessageContent">

                    {
                      message.content
                    }

                  </div>

                </div>
              )
            )
          }

        </div>

        {/* ==============================================
        INPUT
        ============================================== */}

        <div className="aiInputContainer">

          <div className="aiInput">

            <input

              type="text"

              placeholder="
              Écrire à FlowBiz AI...
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

            <button
              onClick={
                sendMessage
              }
            >

              <Send size={18} />

            </button>

          </div>

        </div>

      </section>

    </div>
  );
}
