import { CartItem } from "@/types/types";

export interface CartState {
  items: Record<number, { shop_name: string; products: CartItem[]; shop_id: number }>;
  loading: boolean;
  error: string | null;
}

export const initalState: CartState = {
  items: {},
  loading: false,
  error: null,
};

export const cartReducer = (state: CartState, action: any): CartState => {
  switch (action.type) {
    case "FETCH_CART_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_CART_SUCCESS":
      return { ...state, items: action.payload, loading: false };
    case "FETCH_CART_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "ADD_ITEM":
      return { ...state, items: action.payload };
    case "UPDATE_ITEM":
      return { ...state, items: action.payload };
    case "REMOVE_ITEM":
      const newItems = { ...state.items };
      for (const shopId in newItems) {
        newItems[shopId].products = newItems[shopId].products.filter((item) => item.cart_id !== action.payload);
        if (newItems[shopId].products.length === 0) {
          delete newItems[shopId];
        }
      }
      return { ...state, items: newItems };
    default:
      return state;
  }
};
