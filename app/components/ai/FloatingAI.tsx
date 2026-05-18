"use client";

import { Sparkles } from "lucide-react";

type FloatingAIProps = {
  onClick?: () => void;
};

export default function FloatingAI({
  onClick,
}: FloatingAIProps) {
  return (
    <button
      className="floating-ai"
      onClick={onClick}
    >
      <Sparkles size={18} />
      Demander à FlowBiz IA
    </button>
  );
}
	
