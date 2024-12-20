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
      initialCheckedProducts[item.product_id] = false;

      initialCheckedShops[item.shop.shop_id] = false;
    });

    return { initialCheckedProducts, initialCheckedShops };
  };
  const { initialCheckedProducts, initialCheckedShops } = initializeCheckedState();
  const [checkedProducts, setCheckedProducts] = useState<{ [product_id: number]: boolean }>(initialCheckedProducts);
  const [checkedShops, setCheckedShops] = useState<{ [shopId: number]: boolean }>(initialCheckedShops);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const handleShopCheckboxChange = (shop_id: number, checked: boolean) => {
    setCheckedShops((prev) => {
      const updatedShops = { ...prev, [shop_id]: checked };
      const updatedProducts = separatedByShop[shop_id].products.reduce(
        (acc: any, item: any) => {
          acc[item.product_id] = checked;
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

  const handleProductCheckboxChange = (product_id: number, checked: boolean) => {
    setCheckedProducts((prev) => ({
      ...prev,
      [product_id]: checked,
    }));
  };

  const calculatedTotalPrice = () => {
    const selectedItemsWithDiscount = userCart
      .filter((item) => checkedProducts[item.product_id])
      .map((item) => {
        let priceAfterDiscount = item.selectedVariant.variant_price;

        if (item.discount && item.discount.length > 0) {
          item.discount.forEach((discount) => {
            if (discount.discount_type === "percentage") {
              priceAfterDiscount -= (priceAfterDiscount * discount.discount_value) / 100;
            }
          });
        }

        return {
          ...item,
          priceAfterDiscount: priceAfterDiscount,
        };
      });

    const totalPrice = selectedItemsWithDiscount.reduce((total, item) => total + item.priceAfterDiscount * item.quantity, 0);

    setTotalPrice(totalPrice);
    setSelectedItems(selectedItemsWithDiscount);
  };

  useEffect(() => {
    calculatedTotalPrice();
  }, [checkedProducts, userCart]);

  const handleButtonCO = () => {
    if (selectedItems.length > 0) {
      sessionStorage.setItem("selectedItems", JSON.stringify(selectedItems));
      window.location.href = "/cart/shipment";
    } else {
      alert("Please select a product to checkout");
    }
  };

  const handleQuantityChange = (product_id: number, newQuantity: number, maxStock: number) => {
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      const updatedCart = userCart
        .map((item) => {
          if (item.product_id === product_id) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
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
