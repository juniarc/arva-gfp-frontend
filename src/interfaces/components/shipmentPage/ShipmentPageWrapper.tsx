"use client";

import { useEffect, useMemo, useState } from "react";
import { CartItem, User } from "@/types/types";
import ShipmentPage from "./ShipmentPage";
import { mockApiRequestPostUser } from "@/services/api/dummyData";
import ShipmentPageDesktop from "./desktop/ShipmentPageDesktop";

interface ShipmentPageWrapperProps {
  user: User;
  viewport: string | undefined;
}
export default function ShipmentPageWrapper({ user, viewport }: ShipmentPageWrapperProps) {
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState(user);
  const separatedByShop = selectedItems.reduce(
    (acc, item) => {
      const { shopId } = item.shop;
      if (!acc[shopId]) {
        acc[shopId] = {
          shopName: item.shop.shopName,
          products: [],
        };
      }
      acc[shopId].products.push(item);
      return acc;
    },
    {} as Record<number, { shopName: string; products: CartItem[] }>,
  );

  const handleFetchUpdatedUser = async (updatedAddress: any) => {
    try {
      const response = await mockApiRequestPostUser("/user", updatedAddress);
      setCurrentUser(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const cart = sessionStorage.getItem("selectedItems");
    const parsedCart = cart ? JSON.parse(cart) : [];
    setSelectedItems(parsedCart);
  }, []);

  const handleQuantityChange = (productId: number, newQuantity: number, maxStock: number) => {
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      const updatedCart = selectedItems
        .map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      setSelectedItems(updatedCart);
    }
  };
  const [selectedShipping, setSelectedShipping] = useState<Record<number, string>>({});
  const handleSelectedShipping = (shopId: number, shippingOption: string) => {
    setSelectedShipping((prev) => ({ ...prev, [shopId]: shippingOption }));
  };

  const [isProtected, setIsProtected] = useState<Record<number, boolean>>({});
  const handleCheckboxChange = (shopId: number, isChecked: boolean) => {
    setIsProtected((prevState) => ({
      ...prevState,
      [shopId]: isChecked,
    }));
  };
  const checkedCount = Object.values(isProtected).filter(Boolean).length;

  useEffect(() => {
    // Set default value false for all shopIds when component mounts
    const initialProtectionState: Record<number, boolean> = {};
    selectedItems.forEach((product: any) => {
      initialProtectionState[product.shop.shopId] = false;
    });
    setIsProtected(initialProtectionState);
  }, [selectedItems]);

  const [paymentMethod, setPaymentMethod] = useState<{ imageUrl: string; name: string }>({
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    name: "Mandiri Virtual Account",
  });
  const handlePaymentMethod = (method: { imageUrl: string; name: string }) => {
    setPaymentMethod(method);
  };

  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const calculateCartSummary = () => {
    const totalItems = selectedItems.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = selectedItems.reduce((total, item) => total + item.quantity * item.selectedVariant.price, 0);
    setTotalPrice(totalPrice);
    setTotalItems(totalItems);
  };

  useEffect(() => {
    calculateCartSummary();
  }, [selectedItems]);

  const isCompleted = useMemo(() => {
    const allShippingSelected = Object.keys(selectedShipping).length > 0 && Object.values(selectedShipping).every((value) => value !== "");
    return currentUser && totalItems >= 1 && allShippingSelected && paymentMethod && paymentMethod.name !== "";
  }, [currentUser, totalItems, selectedShipping, paymentMethod]);

  if (selectedItems.length === 0) return null;
  if (viewport === "mobile")
    return (
      <ShipmentPage
        separatedByShop={separatedByShop}
        user={currentUser}
        handleFetchUpdatedUser={handleFetchUpdatedUser}
        cart={selectedItems}
        handleQuantityChange={handleQuantityChange}
        selectedShipping={selectedShipping}
        handleSelectedShipping={handleSelectedShipping}
        handleCheckbox={handleCheckboxChange}
        isProtected={isProtected}
        paymentMethod={paymentMethod}
        handleSelectedPayment={handlePaymentMethod}
        totalItems={totalItems}
        totalPrice={totalPrice}
        isCompleted={isCompleted}
        totalProtectedShop={checkedCount}
      />
    );
  return (
    <ShipmentPageDesktop
      separatedByShop={separatedByShop}
      user={currentUser}
      handleFetchUpdatedUser={handleFetchUpdatedUser}
      cart={selectedItems}
      handleQuantityChange={handleQuantityChange}
      selectedShipping={selectedShipping}
      handleSelectedShipping={handleSelectedShipping}
      handleCheckbox={handleCheckboxChange}
      isProtected={isProtected}
      paymentMethod={paymentMethod}
      handleSelectedPayment={handlePaymentMethod}
      totalItems={totalItems}
      totalPrice={totalPrice}
      isCompleted={isCompleted}
      totalProtectedShop={checkedCount}
    />
  );
}
