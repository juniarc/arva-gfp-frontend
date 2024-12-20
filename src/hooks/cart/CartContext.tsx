"use client";

import { createContext, useContext, useReducer } from "react";
import { cartReducer, CartState, initalState } from "./cartReducer";
import api from "@/services/api/api";
import { convertCartResponseToCartItems, separateCartItemsByShop } from "@/utils/elementHelpers";
import { CartItem } from "@/types/types";

interface CartContextProps {
  state: CartState;
  fetchCart: (userId: number) => Promise<void>;
  addItemToCart: (product_id: number, quantity: number, variant_id: number, token: string | undefined, user_id: number) => Promise<void>;
  updateCart: (cartId: number, quantity: number, token: string | undefined, updatedCart: CartState) => Promise<void>;
  removeItemFromCart: (cart_id: number, token: string | undefined) => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initalState);

  const fetchCart = async (userId: number) => {
    dispatch({ type: "FETCH_CART_REQUEST" });
    try {
      const cartResponse = await api.getCart(userId);
      const processedCart = await convertCartResponseToCartItems(cartResponse);
      const separatedByShop = separateCartItemsByShop(processedCart);
      dispatch({ type: "FETCH_CART_SUCCESS", payload: separatedByShop });
    } catch (error) {
      dispatch({ type: "FETCH_CART_FAILURE", payload: error });
    }
  };

  // Add item to cart
  const addItemToCart = async (product_id: number, quantity: number, variant_id: number, token: string | undefined, user_id: number) => {
    try {
      const addToCartReqBody = { product_id, quantity, variant_id };
      await api.addProductToCart(token, addToCartReqBody);
      console.log("tes");
      const cartResponse = await api.getCart(user_id);
      const processedCart = await convertCartResponseToCartItems(cartResponse);
      const separatedByShop = separateCartItemsByShop(processedCart);
      dispatch({ type: "FETCH_CART_SUCCESS", payload: separatedByShop });
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  // Update item quantity in cart
  const updateCart = async (cartId: number, quantity: number, token: string | undefined, updatedCart: CartState) => {
    try {
      await api.updateCart(cartId, token, quantity);
      dispatch({ type: "FETCH_CART_SUCCESS", payload: { ...updatedCart } });
    } catch (error) {
      console.error("Failed to update item quantity in cart", error);
    }
  };

  // Remove item from cart
  const removeItemFromCart = async (cartId: number, token: string | undefined) => {
    try {
      await api.removeProductFromCart(cartId, token);
      dispatch({ type: "REMOVE_ITEM", payload: cartId });
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  return <CartContext.Provider value={{ state, fetchCart, addItemToCart, removeItemFromCart, updateCart }}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
