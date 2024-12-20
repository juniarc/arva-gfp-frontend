import React from "react";
import { Alert } from "@material-tailwind/react";

interface FailAlertProps {
  className?: string;
  text: string;
  isOpen: boolean;
}
export default function FailAlert({ className, text, isOpen }: FailAlertProps) {
  return (
    <div className="fixed top-10 w-screen left-0 px-5 z-50">
      <Alert
        animate={{
          mount: { y: 0 },
          unmount: { y: -100 },
        }}
        open={isOpen}
        className={`${className} bg-light-red font-semibold border border-red text-red text-sm min-h-18 p-5 shadow px-10`}
      >
        {text}
      </Alert>
    </div>
  );
}
