"use client";

import "./ui.css";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  full?: boolean;
  type?: "button" | "submit";
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  loading = false,
  full = false,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`fbButton ${variant} ${
        full ? "full" : ""
      }`}
    >
      {loading ? (
        <Loader2 className="spin" />
      ) : (
        children
      )}
    </button>
  );
}
