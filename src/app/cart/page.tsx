import CartPageWrapper from "@/interfaces/components/cartPage/CartPageWrapper";
import { CartItem } from "@/types/types";
import { cookies } from "next/headers";

const cart: CartItem[] = [
  {
    id: 1,
    userId: 1,
    product: {
      id: 1,
      name: "banana fruits from bali",
      category: "fruits",
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      stocks: 15,
    },
    shop: {
      shopId: 1,
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      shopName: "shopname",
      addressCity: "shop city",
      shippingChannel: ["JNE", "J&T", "Ninja Express"],
    },
    selectedVariant: {
      variantId: 1,
      variantName: "Variant's Name",
      price: 1000,
    },
    quantity: 1,
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
  },
  {
    id: 3,
    userId: 1,
    product: {
      id: 2,
      name: "banana fruits from bali",
      category: "fruits",
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      stocks: 15,
    },
    shop: {
      shopId: 1,
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      shopName: "shopname",
      addressCity: "shop city",
      shippingChannel: ["JNE", "J&T", "Ninja Express"],
    },
    selectedVariant: {
      variantId: 1,
      variantName: "Variant's Name",
      price: 1000,
    },
    quantity: 1,
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
  },
  {
    id: 2,
    userId: 1,
    product: {
      id: 2,
      name: "dragon fruit from yogyakarta",
      category: "fruits",
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      stocks: 15,
    },
    shop: {
      shopId: 2,
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      shopName: "shopname",
      addressCity: "shop city",
      shippingChannel: ["JNE", "J&T", "Ninja Express"],
    },
    selectedVariant: {
      variantId: 1,
      variantName: "Variant's Name",
      price: 1000,
    },
    quantity: 1,
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
  },
];

export default async function Page() {
  const cookiesList = await cookies();
  const userId = cookiesList.get("userId")?.value || null;
  const viewport = cookiesList.get("viewport")?.value || undefined;
  const userCart = cart.filter((item) => item.userId === Number(userId));
  const separatedByShop = userCart.reduce(
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
  return <CartPageWrapper separatedByShop={separatedByShop} cart={userCart} viewport={viewport} />;
}
