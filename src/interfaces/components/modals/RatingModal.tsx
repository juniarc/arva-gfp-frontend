"use client";

import React, { useState } from "react";
import { Dialog, DialogBody, Spinner, Textarea } from "@material-tailwind/react";
import { LuX } from "react-icons/lu";
import { FaStar } from "react-icons/fa6";
import dynamic from "next/dynamic";
import { customeTheme } from "@/interfaces/theme/customTheme";

interface SpinnerModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  product_id: number;
  order_id: number;
  handleStatus: (status: "idle" | "loading" | "success" | "error") => void;
  token: string | undefined;
  status: "idle" | "loading" | "success" | "error";
}

const DynamicThemeProvider = dynamic(() => import("@material-tailwind/react").then((mod) => mod.ThemeProvider), { ssr: false });

export default function RatingModal({ isOpen, token, handleCloseModal, product_id, handleStatus, order_id, status }: SpinnerModalProps) {
  const [rating, setRating] = useState(0);
  const [reviewInput, setReviewInput] = useState("");

  const handleRating = (value: any) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    handleStatus("loading");
    // const reqBody = {
    //   rating_product: rating,
    //   review: reviewInput,
    //   product_id: product_id,
    // };

    // try {
    //   await api.createRating(order_id, token, reqBody);

    //   handleStatus("success");
    //   setTimeout(() => {
    //     handleStatus("idle");
    //   }, 2000);
    // } catch (error) {
    //   handleStatus("error");
    //   setTimeout(() => {
    //     handleStatus("idle");
    //   }, 2000);
    // }
  };
  if (isOpen) {
    return (
      <Dialog open={isOpen} handler={handleCloseModal} className="outline-none relative p-5 tablet:p-15 desktop:p-10">
        <button onClick={handleCloseModal} className="absolute top-10 right-10 z-10">
          <LuX className="tablet:text-[2rem]" />
        </button>
        <DialogBody className="min-h-[50vh]">
          <DynamicThemeProvider value={customeTheme}>
            <div className="min-h-[50vh]">
              <h3 className="text-black w-full text-center">Rating Product</h3>
              <div className="mt-10">
                <div className="w-full flex flex-col items-center gap-5">
                  <div className="w-full flex items-center justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => handleRating(star)} className="text-yellow focus:outline-none">
                        <FaStar color={star <= rating ? "#FFD700" : "#E0E0E0"} className="text-base" />
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-black">Rating Product</p>
                </div>
                <div className="mt-10">
                  <Textarea label="Review Product" value={reviewInput} onChange={(e) => setReviewInput(e.target.value)} />
                </div>
              </div>
              <button onClick={handleSubmit} className="w-full text-center py-3 bg-primary text-white mt-10 rounded font-semibold">
                {status === "loading" ? (
                  <div className="w-full flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  "Submit Rating"
                )}
              </button>
            </div>
          </DynamicThemeProvider>
        </DialogBody>
      </Dialog>
    );
  }
}
