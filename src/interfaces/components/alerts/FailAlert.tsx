import React from "react";
import { Alert } from "@material-tailwind/react";

interface FailAlertProps {
  className: string;
  text: string;
  isOpen: boolean;
}
export default function FailAlert({ className, text, isOpen }: FailAlertProps) {
  return (
    <div className="fixed top-10 w-screen left-0 px-5">
      <Alert
        animate={{
          mount: { y: 0 },
          unmount: { y: -100 },
        }}
        open={isOpen}
        className={`${className} bg-light-red font-semibold text-red text-sm min-h-18 p-5`}
      >
        {text}
      </Alert>
    </div>
  );
}
