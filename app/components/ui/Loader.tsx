"use client";

import "./ui.css";
import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="fbLoader">
      <Loader2 className="spin" />
    </div>
  );
}
