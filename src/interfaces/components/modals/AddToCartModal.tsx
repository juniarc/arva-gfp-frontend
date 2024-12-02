"use client";

import React, { useState } from "react";
import { Modal } from "flowbite-react";
import ReactDOM from "react-dom";

export default function AddToCartModal({ isOpen, handleCloseModal }: { isOpen: boolean; handleCloseModal: () => void }) {
  if (isOpen) {
    return ReactDOM.createPortal(
      <Modal show={isOpen} onClose={handleCloseModal}>
        <Modal.Header>Modal title</Modal.Header>
        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseModal}>Close</button>
        </Modal.Footer>
      </Modal>,
      document.getElementById("modal-root")!,
    );
  }
}
