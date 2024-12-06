"use client";

import React, { useEffect, useState, useMemo } from "react";
import AddressSection from "@/interfaces/components/buynowPage/AddressSection";
import PaynowBtn from "@/interfaces/components/buynowPage/PaynowBtn";
import PaymentMehtod from "@/interfaces/components/buynowPage/PaymentMethod";
import ProductsInfo from "@/interfaces/components/buynowPage/ProductsInfo";
import ShippingSection from "@/interfaces/components/buynowPage/ShippingSection";
import SummarySection from "@/interfaces/components/buynowPage/SummarySection";
import VoucherSection from "@/interfaces/components/buynowPage/VoucherSection";
import LineDivider from "@/interfaces/components/dividers/LineDivider";
import { mockApiRequestPostUser } from "@/services/api/dummyData";
import { Product, User } from "@/types/types";

interface BuynowPageChildProps {
  user: User;
  product: Product;
  quantity: number;
}

export default function BuynowPageChild({ user, product, quantity }: BuynowPageChildProps) {
  const [currentUser, setCurrentUser] = useState(user);
  const handleFetchUpdatedUser = async (updatedAddress: any) => {
    try {
      const response = await mockApiRequestPostUser("/user", updatedAddress);
      setCurrentUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [productQuantity, setProductQuantity] = useState<number>(quantity);
  const [totalPrice, setTotalPrice] = useState<number>(product.price * productQuantity);
  const [isProtected, setIsProtected] = useState<boolean>(false);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsProtected(e.target.checked);
  };
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stocks) {
      setProductQuantity(newQuantity);
      setTotalPrice(product.price * newQuantity);
    }
  };

  const [selectedShipping, setSelectedShipping] = useState<string>("");
  const handleSelectedShipping = (shipping: string) => {
    setSelectedShipping(shipping);
  };

  const [paymentMethod, setPaymentMethod] = useState<{ imageUrl: string; name: string }>({
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    name: "Mandiri Virtual Account",
  });
  const handlePaymentMethod = (method: { imageUrl: string; name: string }) => {
    setPaymentMethod(method);
  };

  const isCompleted = useMemo(() => {
    return currentUser && productQuantity >= 1 && selectedShipping !== "" && paymentMethod && paymentMethod.name !== "";
  }, [currentUser, productQuantity, selectedShipping, paymentMethod]);

  return (
    <>
      <section>
        <AddressSection {...currentUser} handleUpdateAddress={handleFetchUpdatedUser} />
      </section>
      <section>
        <ProductsInfo
          handleCheckbox={handleCheckbox}
          isChecked={isProtected}
          product={product}
          productQuantity={productQuantity}
          totalPrice={totalPrice}
          handleQuantityChange={handleQuantityChange}
        />
      </section>
      <section>
        <ShippingSection
          selectedShipping={selectedShipping}
          handleSelectedShipping={handleSelectedShipping}
          shippingOptions={product.shop.shippingOptions}
        />
        <LineDivider className="my-5" />
      </section>
      <section>
        <VoucherSection />
        <LineDivider className="my-5" />
      </section>
      <section>
        <PaymentMehtod handleSelectedPayment={handlePaymentMethod} selectedPayment={paymentMethod} />
      </section>
      <section>
        <SummarySection totalPrice={totalPrice} shippingPrice={1000} appliedVoucher={null} isProtected={isProtected} />
      </section>
      <PaynowBtn isCompleted={isCompleted} />
    </>
  );
}
