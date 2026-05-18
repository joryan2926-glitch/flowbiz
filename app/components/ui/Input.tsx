"use client";

import "./ui.css";

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  type?: string;
}

export default function Input({
  placeholder,
  value,
  onChange,
  type = "text",
}: InputProps) {
  return (
    <input
      className="fbInput"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
}
