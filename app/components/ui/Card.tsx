"use client";

import "./ui.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div className={`fbCard ${className}`}>
      {children}
    </div>
  );
}
