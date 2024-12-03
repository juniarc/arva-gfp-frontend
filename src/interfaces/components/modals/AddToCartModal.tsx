"use client";

import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
export default function AddToCartModal({ isOpen, handleCloseModal }: { isOpen: boolean; handleCloseModal: () => void }) {
  if (isOpen) {
    return (
      <Dialog open={isOpen} handler={handleCloseModal} className="outline-none">
        <DialogHeader>
          <h2>Modal title</h2>
        </DialogHeader>
        <DialogBody>
          <p>Modal body text goes here.</p>
        </DialogBody>
      </Dialog>
    );
  }
}
