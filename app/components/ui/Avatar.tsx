"use client";

import "./ui.css";

interface AvatarProps {
  name: string;
}

export default function Avatar({
  name,
}: AvatarProps) {
  return (
    <div className="fbAvatar">
      {name.charAt(0)}
    </div>
  );
}
