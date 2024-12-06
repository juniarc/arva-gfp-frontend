import React from "react";

export default function LineDivider({ className }: { className?: string }) {
  return <div className={`w-full h-[1px] bg-gray ${className}`}></div>;
}
