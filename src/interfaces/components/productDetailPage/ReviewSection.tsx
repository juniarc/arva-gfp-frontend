"use client";

import React, { useEffect, useState } from "react";
import { FaStar, FaCircle } from "react-icons/fa6";
import { BsChevronDown } from "react-icons/bs";
import ReviewItem from "./ReviewItem";

interface ReviewItemProps {
  name: string;
  review: string;
  rating: number;
  date: string;
  imageUrl: string;
}
interface ReviewSectionProps {
  reviews: ReviewItemProps[];
}
export default function ReviewSection({ reviews }: ReviewSectionProps) {
  const [showMoreOpen, setShowMoreOpen] = useState<boolean>(false);
  const totalRating = reviews.reduce((total, review) => total + review.rating, 0);

  const handleShowMoreButton = () => {
    setShowMoreOpen((prev) => !prev);
  };

  return (
    <div className="p-10 tablet:px-[150px]">
      <div>
        <h3>Product Reviews</h3>
        <div className="flex items-center text-xs tablet:text-base text-dark-gray gap-3 mt-5">
          <span className="flex items-center gap-2 text-xs tablet:text-base text-black font-semibold">
            <FaStar className="text-yellow" /> {totalRating}
          </span>
          <p>from {reviews.length} ratings</p>
          <FaCircle className="text-[0.25rem] " />
          <span>{reviews.length} reviews</span>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-6">
        {reviews.slice(0, showMoreOpen ? reviews.length : 1).map((review, index) => (
          <ReviewItem key={index} {...review} />
        ))}
      </div>
      <button
        onClick={handleShowMoreButton}
        className="w-full bg-secondary text-xs tablet:text-base flex items-center justify-center py-5 rounded mt-5"
      >
        <span className="flex items-center gap-2">
          <p className="font-light">{showMoreOpen ? "Hide description" : "Read description"}</p>
          <BsChevronDown className={showMoreOpen ? "rotate-180" : ""} />
        </span>
      </button>
    </div>
  );
}
