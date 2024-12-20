import React from "react";
import { Alert } from "@material-tailwind/react";

interface SuccessAlertProps {
  className?: string;
  text: string;
  isOpen: boolean;
}
export default function SuccessAlert({ className, text, isOpen }: SuccessAlertProps) {
  return (
    <div className="fixed top-10 w-screen left-0 px-5 z-50">
      <Alert
        animate={{
          mount: { y: 0 },
          unmount: { y: -100 },
        }}
        open={isOpen}
        className={`${className} bg-secondary border border-primary font-semibold text-primary text-sm min-h-18 p-5`}
      >
        {text}
      </Alert>
    </div>
  );
}
