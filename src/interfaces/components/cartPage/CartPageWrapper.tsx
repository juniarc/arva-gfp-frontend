"use client";
import { useEffect, useState } from "react";
import { CartItem } from "@/types/types";
import CartPage from "./CartPage";
import { useRouter } from "next/navigation";
import CartPageDesktop from "./desktop/CartPageDekstop";

interface CartPageWrapperProps {
  separatedByShop: any;
  cart: CartItem[];
  viewport: string | undefined;
}

export default function CartPageWrapper({ separatedByShop, cart, viewport }: CartPageWrapperProps) {
  const router = useRouter();
  const [userCart, setUserCart] = useState<CartItem[]>(cart);
  const initializeCheckedState = () => {
    const initialCheckedProducts: { [key: number]: boolean } = {};
    const initialCheckedShops: { [key: number]: boolean } = {};

    userCart.forEach((item) => {
      initialCheckedProducts[item.id] = false;

      initialCheckedShops[item.shop.shopId] = false;
    });

    return { initialCheckedProducts, initialCheckedShops };
  };
  const { initialCheckedProducts, initialCheckedShops } = initializeCheckedState();
  const [checkedProducts, setCheckedProducts] = useState<{ [productId: number]: boolean }>(initialCheckedProducts);
  const [checkedShops, setCheckedShops] = useState<{ [shopId: number]: boolean }>(initialCheckedShops);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const handleShopCheckboxChange = (shopId: number, checked: boolean) => {
    setCheckedShops((prev) => {
      const updatedShops = { ...prev, [shopId]: checked };
      const updatedProducts = separatedByShop[shopId].products.reduce(
        (acc, item) => {
          acc[item.id] = checked;
          return acc;
        },
        {} as { [key: number]: boolean },
      );

      setCheckedProducts((prev) => ({
        ...prev,
        ...updatedProducts,
      }));

      return updatedShops;
    });
  };

  const handleProductCheckboxChange = (productId: number, checked: boolean) => {
    setCheckedProducts((prev) => ({
      ...prev,
      [productId]: checked,
    }));
  };

  const calculatedTotalPrice = () => {
    const selectedItems = userCart.filter((item) => checkedProducts[item.id]);
    const totalPrice = selectedItems.reduce((total, item) => total + item.selectedVariant.price * item.quantity, 0);
    setTotalPrice(totalPrice);
    setSelectedItems(selectedItems);
  };

  useEffect(() => {
    calculatedTotalPrice();
  }, [checkedProducts, userCart]);

  const handleButtonCO = () => {
    sessionStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    router.push("/cart/shipment");
    console.log(selectedItems);
  };

  const handleQuantityChange = (productId: number, newQuantity: number, maxStock: number) => {
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      const updatedCart = userCart
        .map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      console.log(updatedCart);
      setUserCart(updatedCart);
    }
  };
  if (viewport === "mobile")
    return (
      <CartPage
        separatedByShop={separatedByShop}
        handleProductCheckboxChange={handleProductCheckboxChange}
        handleShopCheckboxChange={handleShopCheckboxChange}
        checkedProducts={checkedProducts}
        checkedShops={checkedShops}
        handleBtnCO={handleButtonCO}
        totalItems={selectedItems.length}
        totalPrice={totalPrice}
        handleQuantityChange={handleQuantityChange}
        cart={userCart}
      />
    );
  return (
    <CartPageDesktop
      separatedByShop={separatedByShop}
      handleProductCheckboxChange={handleProductCheckboxChange}
      handleShopCheckboxChange={handleShopCheckboxChange}
      checkedProducts={checkedProducts}
      checkedShops={checkedShops}
      handleBtnCO={handleButtonCO}
      totalItems={selectedItems.length}
      totalPrice={totalPrice}
      handleQuantityChange={handleQuantityChange}
      cart={userCart}
    />
  );
}
