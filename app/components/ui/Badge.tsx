"use client";

import "./ui.css";

interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({
  children,
}: BadgeProps) {
  return (
    <span className="fbBadge">
      {children}
    </span>
  );
}
