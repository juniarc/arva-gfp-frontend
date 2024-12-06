import { Product, User } from "@/types/types";

const products: Product[] = [
  {
    id: 1,
    name: "Banan fruits Banan fruitsBanan fruitsBanan fruitsBanan fruits",
    category: "fruit",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    price: 100,
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
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
    variants: ["Red", "Yellow", "Green"],
    shop: {
      id: 1,
      name: "Shop 1",
      imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
      location: "jakarta",
      openingHours: "10:00",
      closingHours: "18:00",
      shippingOptions: ["JNE", "J&T"],
      createdAt: "2023-01-01",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    },
    sold: 10,
  },
  {
    id: 2,
    name: "Apple Red",
    category: "vegetable",
    variants: [],

    description: "Fresh and juicy apples directly from the farm, perfect for a healthy snack or dessert.",
    price: 120,
    imageUrl: "https://fastly.picsum.photos/id/59/200/200.jpg?hmac=q9DbuoFh1L_NWnGk3AGdzuEOlg5bBW4JmBSgWmQdT74",
    stocks: 150,
    unit: "kg",
    discount: 15,
    rating: 4.8,
    isWishlist: true,
    shippingInfo: {
      packageWeight: 2,
      packageHeight: 2,
      packageWidth: 2,
      packageLength: 2,
      shippingFee: 5000,
    },
    shop: {
      id: 2,
      name: "Shop 2",
      imageUrl: "https://fastly.picsum.photos/id/59/200/200.jpg?hmac=q9DbuoFh1L_NWnGk3AGdzuEOlg5bBW4JmBSgWmQdT74",
      location: "bandung",
      openingHours: "10:00",
      closingHours: "18:00",
      shippingOptions: ["JNE", "J&T"],
      createdAt: "2023-01-01",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    },
    sold: 10,
  },
  {
    id: 3,
    name: "Grapes",
    category: "vegetable",
    variants: ["Red", "Yellow", "Green"],

    description: "Sweet and seedless grapes, ideal for snacking or wine making.",
    price: 90,
    imageUrl: "https://fastly.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
    stocks: 150,
    unit: "kg",
    discount: 5,
    rating: 4.2,
    isWishlist: false,
    shippingInfo: {
      packageWeight: 1,
      packageHeight: 1,
      packageWidth: 1,
      packageLength: 1,
      shippingFee: 0,
    },
    shop: {
      id: 1,
      name: "Shop 1",
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      location: "jakarta",
      openingHours: "10:00",
      closingHours: "18:00",
      shippingOptions: ["JNE", "J&T"],
      createdAt: "2023-01-01",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    },
    sold: 10,
  },
  {
    id: 4,
    name: "Mangoes",
    category: "fertilizer",
    variants: ["Red", "Yellow", "Green"],

    description: "Ripe and tropical mangoes with a rich flavor, straight from tropical regions.",
    price: 200,
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    stocks: 150,
    unit: "kg",
    discount: 20,
    rating: 4.9,
    isWishlist: false,
    shippingInfo: {
      packageWeight: 2,
      packageHeight: 3,
      packageWidth: 2,
      packageLength: 3,
      shippingFee: 10,
    },
    shop: {
      id: 3,
      name: "Shop 3",
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      location: "banten",
      openingHours: "10:00",
      closingHours: "18:00",
      shippingOptions: ["JNE", "J&T"],
      createdAt: "2023-01-01",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    },
    sold: 10,
  },
  {
    id: 5,
    name: "Pineapple",
    category: "equipment",
    variants: ["Red", "Yellow", "Green"],

    description: "Tropical and tangy pineapples perfect for juices and desserts.",
    price: 180,
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    stocks: 150,
    unit: "piece",
    discount: 12,
    rating: 4.3,
    isWishlist: true,
    shippingInfo: {
      packageWeight: 2,
      packageHeight: 4,
      packageWidth: 2,
      packageLength: 2,
      shippingFee: 15,
    },
    shop: {
      id: 1,
      name: "Shop 1",
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      location: "jakarta",
      openingHours: "10:00",
      closingHours: "18:00",
      shippingOptions: ["JNE", "J&T"],
      createdAt: "2023-01-01",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    },
    sold: 10,
  },
  {
    id: 6,
    name: "Strawberries",
    category: "fruit",
    variants: [],

    description: "Fresh strawberries with vibrant color and sweet flavor.",
    price: 300,
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    stocks: 150,
    unit: "kg",
    discount: 10,
    rating: 4.7,
    isWishlist: false,
    shippingInfo: {
      packageWeight: 1,
      packageHeight: 1,
      packageWidth: 1,
      packageLength: 1,
      shippingFee: 0,
    },
    shop: {
      id: 2,
      name: "Shop 2",
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      location: "bandung",
      openingHours: "10:00",
      closingHours: "18:00",
      shippingOptions: ["JNE", "J&T"],
      createdAt: "2023-01-01",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    },
    sold: 10,
  },
  {
    id: 7,
    name: "Oranges",
    category: "vegetable",
    variants: ["Red", "Yellow", "Green"],

    description: "Citrusy and juicy oranges full of vitamin C.",
    price: 150,
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    stocks: 150,
    unit: "kg",
    discount: 8,
    rating: 4.4,
    isWishlist: false,
    shippingInfo: {
      packageWeight: 1,
      packageHeight: 2,
      packageWidth: 2,
      packageLength: 2,
      shippingFee: 2,
    },
    shop: {
      id: 4,
      name: "Shop 4",
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      location: "yogyakarta",
      openingHours: "10:00",
      closingHours: "18:00",
      shippingOptions: ["JNE", "J&T"],
      createdAt: "2023-01-01",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    },
    sold: 100,
  },
  {
    id: 8,
    name: "Watermelon",
    category: "equipment",
    variants: ["Red", "Yellow", "Green"],

    description: "Large and refreshing watermelons, perfect for summer.",
    price: 220,
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    stocks: 150,
    unit: "piece",
    discount: 15,
    rating: 4.6,
    isWishlist: true,
    shippingInfo: {
      packageWeight: 5,
      packageHeight: 5,
      packageWidth: 5,
      packageLength: 5,
      shippingFee: 20,
    },
    shop: {
      id: 1,
      name: "Shop 1",
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      location: "jakarta",
      openingHours: "10:00",
      closingHours: "18:00",
      shippingOptions: ["JNE", "J&T"],
      createdAt: "2023-01-01",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    },
    sold: 3,
  },
  {
    id: 9,
    name: "Papaya",
    category: "fruit",
    variants: ["Red", "Yellow", "Green"],

    description: "Ripe and sweet papayas, packed with nutrients.",
    price: 130,
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    stocks: 150,
    unit: "kg",
    discount: 5,
    rating: 4.1,
    isWishlist: false,
    shippingInfo: {
      packageWeight: 2,
      packageHeight: 3,
      packageWidth: 2,
      packageLength: 3,
      shippingFee: 7,
    },
    shop: {
      id: 1,
      name: "Shop 1",
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      location: "jakarta",
      openingHours: "10:00",
      closingHours: "18:00",
      shippingOptions: ["JNE", "J&T"],
      createdAt: "2023-01-01",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    },
    sold: 10,
  },
  {
    id: 10,
    name: "Strawberries",
    category: "fruit",
    variants: ["Red", "Yellow", "Green"],

    description: "Fresh strawberries with vibrant color and sweet flavor.",
    price: 300,
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    stocks: 150,
    unit: "kg",
    discount: 10,
    rating: 4.7,
    isWishlist: false,
    shippingInfo: {
      packageWeight: 1,
      packageHeight: 1,
      packageWidth: 1,
      packageLength: 1,
      shippingFee: 0,
    },
    shop: {
      id: 1,
      name: "Shop 1",
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      location: "jakarta",
      openingHours: "10:00",
      closingHours: "18:00",
      shippingOptions: ["JNE", "J&T"],
      createdAt: "2023-01-01",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    },
    sold: 10,
  },
  {
    id: 11,
    name: "Oranges",
    category: "seed",
    variants: ["Red", "Yellow", "Green"],

    description: "Citrusy and juicy oranges full of vitamin C.",
    price: 150,
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    stocks: 150,
    unit: "kg",
    discount: 8,
    rating: 4.4,
    isWishlist: false,
    shippingInfo: {
      packageWeight: 1,
      packageHeight: 2,
      packageWidth: 2,
      packageLength: 2,
      shippingFee: 2,
    },
    shop: {
      id: 1,
      name: "Shop 1",
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      location: "jakarta",
      openingHours: "10:00",
      closingHours: "18:00",
      shippingOptions: ["JNE", "J&T"],
      createdAt: "2023-01-01",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    },
    sold: 5,
  },
  {
    id: 12,
    name: "Watermelon",
    category: "seed",
    variants: ["Red", "Yellow", "Green"],

    description: "Large and refreshing watermelons, perfect for summer.",
    price: 220,
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    stocks: 150,
    unit: "piece",
    discount: 15,
    rating: 4.6,
    isWishlist: true,
    shippingInfo: {
      packageWeight: 5,
      packageHeight: 5,
      packageWidth: 5,
      packageLength: 5,
      shippingFee: 20,
    },
    shop: {
      id: 1,
      name: "Shop 1",
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      location: "jakarta",
      openingHours: "10:00",
      closingHours: "18:00",
      shippingOptions: ["JNE", "J&T"],
      createdAt: "2023-01-01",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    },
    sold: 3,
  },
  {
    id: 13,
    name: "Papaya",
    category: "fertilizer",
    variants: ["Red", "Yellow", "Green"],

    description: "Ripe and sweet papayas, packed with nutrients.",
    price: 130,
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    stocks: 150,
    unit: "kg",
    discount: 5,
    rating: 4.1,
    isWishlist: false,
    shippingInfo: {
      packageWeight: 2,
      packageHeight: 3,
      packageWidth: 2,
      packageLength: 3,
      shippingFee: 7,
    },
    shop: {
      id: 1,
      name: "Shop 1",
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      location: "jakarta",
      openingHours: "10:00",
      closingHours: "18:00",
      shippingOptions: ["JNE", "J&T"],
      createdAt: "2023-01-01",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    },
    sold: 10,
  },
  {
    id: 14,
    name: "Papaya",
    category: "fruit",
    variants: ["Red", "Yellow", "Green"],

    description: "Ripe and sweet papayas, packed with nutrients.",
    price: 130,
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    stocks: 150,
    unit: "kg",
    discount: 5,
    rating: 4.1,
    isWishlist: false,
    shippingInfo: {
      packageWeight: 2,
      packageHeight: 3,
      packageWidth: 2,
      packageLength: 3,
      shippingFee: 7,
    },
    shop: {
      id: 1,
      name: "Shop 1",
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      location: "jakarta",
      openingHours: "10:00",
      closingHours: "18:00",
      shippingOptions: ["JNE", "J&T"],
      createdAt: "2023-01-01",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    },
    sold: 20,
  },
  {
    id: 15,
    name: "Papaya",
    category: "fertilizer",
    variants: ["Red", "Yellow", "Green"],

    description: "Ripe and sweet papayas, packed with nutrients.",
    price: 130,
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    stocks: 150,
    unit: "kg",
    discount: 5,
    rating: 4.1,
    isWishlist: false,
    shippingInfo: {
      packageWeight: 2,
      packageHeight: 3,
      packageWidth: 2,
      packageLength: 3,
      shippingFee: 7000,
    },
    sold: 10,
    shop: {
      id: 1,
      name: "Shop 1",
      imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
      location: "jakarta",
      openingHours: "10:00",
      closingHours: "18:00",
      shippingOptions: ["JNE", "J&T"],
      createdAt: "2023-01-01",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    },
  },
];

export const mockApiRequest = (
  endpoint: string,
  options?: { category?: string; limit?: number; id?: number },
  delay = 300,
): Promise<Product[] | Product> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint === "/products") {
        let result = products;

        // Filter by category if provided
        if (options?.category) {
          result = result.filter((product) => product.category === options.category);
        }

        // Apply limit if provided
        if (options?.limit) {
          result = result.slice(0, options.limit);
        }

        // Filter by id if provided
        if (options?.id !== undefined) {
          const product = result.find((product) => product.id === options.id);
          if (product) {
            resolve(product);
          }
        }

        resolve(result);
      } else {
        reject(new Error("Endpoint not found"));
      }
    }, delay);
  });
};

const user: User = {
  id: 1,
  name: "John Doe",
  email: "tMmGg@example.com",
  imageUrl: "exampple.com",
  username: "username",
  phoneNumber: "08123456789",
  addressLabel: "",
  addressStreet: "Jl. Contoh",
  addressSubdistrict: "Kel. Contoh",
  addressDistrict: "Kec. Contoh",
  addressCity: "Kota Contoh",
  addressProvince: "Provinsi Contoh",
  zipCode: "12345",
};

export const mockApiRequestUser = (endpoint: string, delay = 300): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint === "/user") {
        let result = user;

        resolve(result);
      } else {
        reject(new Error("Endpoint not found"));
      }
    }, delay);
  });
};

export const mockApiRequestPostUser = (endpoint: string, data: Partial<User>, delay = 300): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint === "/user") {
        const updatedUser = {
          ...data,
          id: 1,
          name: data.name || "",
          email: data.email || "tMmGg@example.com",
          imageUrl: data.imageUrl || "exampple.com",
          username: data.username || "username",
          phoneNumber: data.phoneNumber || "08123456789",
          addressLabel: data.addressLabel || "",
          addressStreet: data.addressStreet || "Jl. Contoh",
          addressSubdistrict: data.addressSubdistrict || "Kel. Contoh",
          addressDistrict: data.addressDistrict || "Kec. Contoh",
          addressCity: data.addressCity || "Kota Contoh",
          addressProvince: data.addressProvince || "Provinsi Contoh",
          zipCode: data.zipCode || "12345",
        };

        resolve(updatedUser);
      } else {
        reject(new Error("Endpoint not found"));
      }
    }, delay);
  });
};
