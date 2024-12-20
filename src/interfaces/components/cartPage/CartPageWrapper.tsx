"use client";
import { useEffect, useState } from "react";
import { CartItem } from "@/types/types";
import CartPage from "./CartPage";
import { useRouter } from "next/navigation";
import CartPageDesktop from "./desktop/CartPageDekstop";
import { useCart } from "@/hooks/cart/CartContext";
import LoadingSkeleton from "./LoadingSkeleton";

interface CartPageWrapperProps {
  separatedByShop?: any;
  viewport: string | undefined;
  userId: number;
  token: string | undefined;
}

export default function CartPageWrapper({ viewport, token, userId }: CartPageWrapperProps) {
  const router = useRouter();
  const { state, fetchCart, updateCart, removeItemFromCart } = useCart();
  const { items: separatedByShop, loading, error } = state;

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [userId]);
  const initializeCheckedState = () => {
    const initialCheckedProducts: { [key: number]: boolean } = {};
    const initialCheckedShops: { [key: number]: boolean } = {};

    Object.values(separatedByShop).forEach((shop) => {
      shop.products.forEach((item) => {
        initialCheckedProducts[item.product_id] = false;
        initialCheckedShops[item.shop.shop_id] = false;
      });
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
      const updatedProducts = separatedByShop[shop_id]?.products.reduce(
        (acc: any, item: any) => {
          acc[item.product_id] = checked;
          return acc;
        },
        {} as { [key: number]: boolean },
      );

      setCheckedProducts((prev) => ({
        ...prev,
        ...(updatedProducts || {}),
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
    const selectedItemsWithDiscount = Object.values(separatedByShop)
      .flatMap((shop) => shop.products.filter((item) => checkedProducts[item.product_id]))
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
  }, [checkedProducts, state.items]);

  const handleButtonCO = () => {
    if (selectedItems.length > 0) {
      sessionStorage.setItem("selectedItems", JSON.stringify(selectedItems));
      window.location.href = "/cart/shipment";
    } else {
      alert("Please select a product to checkout");
    }
  };

  const handleDeleteCart = (cartId: number) => {
    removeItemFromCart(cartId, token);
  };

  const handleQuantityChange = (product_id: number, newQuantity: number, maxStock: number) => {
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      const updatedItem = JSON.parse(JSON.stringify(state.items)); // Deep copy
      let selectedCartId = 0;

      for (const shopId in updatedItem) {
        const shop = updatedItem[shopId];

        shop.products = shop.products.map((item: any) => {
          if (item.product_id === product_id) {
            item.quantity = newQuantity;
            selectedCartId = item.cart_id;
          }
          return item;
        });
      }

      updateCart(selectedCartId, newQuantity, token, updatedItem);
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
        handleDeleteCart={handleDeleteCart}
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
      handleDeleteCart={handleDeleteCart}
    />
  );
}
