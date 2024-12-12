import { Product } from "@/types/types";

export interface ShopDevelop {
  id: number;
  userId: number;
  name: string;
  imageUrl: string;
  phoneNumber: string;
  email: string;
  addressLabel: string;
  addressStreet: string;
  addressSubdistrict: string;
  addressDistrict: string;
  addressCity: string;
  addressProvince: string;
  zipCode: number;
  openingHours: string;
  closingHours: string;
  shippingOptions: string[];
  createdAt: string;
  description: string;
  products: Product[];
}

export const dummyShop: ShopDevelop = {
  id: 1,
  userId: 1,
  name: "Shop 1",
  imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
  phoneNumber: "08123456789",
  email: "shopEmail",
  addressLabel: "",
  addressStreet: "Jl. Contoh",
  addressSubdistrict: "Kel. Contoh",
  addressDistrict: "Kec. Contoh",
  addressCity: "Kota Contoh",
  addressProvince: "Provinsi Contoh",
  zipCode: 12345,
  openingHours: "10:00",
  closingHours: "18:00",
  shippingOptions: ["JNE", "J&T"],
  createdAt: "2023-01-01",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
  products: [
    {
      id: 1,
      name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
      category: "fruit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
      price: 100,
      imageUrl: [
        "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
        "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
        "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
      ],
      stocks: 15,
      unit: "kg",
      discount: 10,
      rating: 4.5,
      isWishlist: false,
      shippingInfo: {
        packageWeight: 1,
        packageHeight: 1,
        packageWidth: 1,
        packageLength: 1,
        shippingFee: 10000,
      },
      variants: [
        {
          id: 1,
          name: "Red",
          price: 100,
        },
        {
          id: 2,
          name: "Green",
          price: 100,
        },
        {
          id: 3,
          name: "Yellow",
          price: 100,
        },
      ],
      shop: {
        id: 1,
        name: "Shop 1",
        imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
        addressCity: "jakarta",
        shippingChannel: ["JNE", "J&T", "Ninja Express"],
      },
      sold: 10,
      tags: ["fruit", "vegetable"],
    },
    {
      id: 2,
      name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
      category: "vegetable",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
      price: 100,
      imageUrl: [
        "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
        "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
        "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
      ],
      stocks: 15,
      unit: "kg",
      discount: 10,
      rating: 4.5,
      isWishlist: false,
      shippingInfo: {
        packageWeight: 1,
        packageHeight: 1,
        packageWidth: 1,
        packageLength: 1,
        shippingFee: 10000,
      },
      variants: [
        {
          id: 1,
          name: "Red",
          price: 100,
        },
        {
          id: 2,
          name: "Green",
          price: 100,
        },
        {
          id: 3,
          name: "Yellow",
          price: 100,
        },
      ],
      shop: {
        id: 1,
        name: "Shop 1",
        imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
        addressCity: "jakarta",
        shippingChannel: ["JNE", "J&T", "Ninja Express"],
      },
      sold: 10,
      tags: ["fruit", "vegetable"],
    },
    {
      id: 3,
      name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
      category: "fruit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
      price: 100,
      imageUrl: [
        "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
        "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
        "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
      ],
      stocks: 15,
      unit: "kg",
      discount: 10,
      rating: 4.5,
      isWishlist: false,
      shippingInfo: {
        packageWeight: 1,
        packageHeight: 1,
        packageWidth: 1,
        packageLength: 1,
        shippingFee: 10000,
      },
      variants: [
        {
          id: 1,
          name: "Red",
          price: 100,
        },
        {
          id: 2,
          name: "Green",
          price: 100,
        },
        {
          id: 3,
          name: "Yellow",
          price: 100,
        },
      ],
      shop: {
        id: 1,
        name: "Shop 1",
        imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
        addressCity: "jakarta",
        shippingChannel: ["JNE", "J&T", "Ninja Express"],
      },
      sold: 10,
      tags: ["fruit", "vegetable"],
    },
    {
      id: 4,
      name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
      category: "fruit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
      price: 100,
      imageUrl: [
        "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
        "https://fastly.picsum.photos/id/243/200/200.jpg?hmac=fW5ZwzzyTBy2t2MROp988oq12mZnKwN0coFLhZEE87s",
        "https://fastly.picsum.photos/id/532/200/200.jpg?hmac=PPwpqfjXOagQmhd_K7H4NXyA4B6svToDi1IbkDW2Eos",
      ],
      stocks: 15,
      unit: "kg",
      discount: 10,
      rating: 4.5,
      isWishlist: false,
      shippingInfo: {
        packageWeight: 1,
        packageHeight: 1,
        packageWidth: 1,
        packageLength: 1,
        shippingFee: 10000,
      },
      variants: [
        {
          id: 1,
          name: "Red",
          price: 100,
        },
        {
          id: 2,
          name: "Green",
          price: 100,
        },
        {
          id: 3,
          name: "Yellow",
          price: 100,
        },
      ],
      shop: {
        id: 1,
        name: "Shop 1",
        imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
        addressCity: "jakarta",
        shippingChannel: ["JNE", "J&T", "Ninja Express"],
      },
      sold: 10,
      tags: ["fruit", "vegetable"],
    },
  ],
};
