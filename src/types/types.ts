export interface ShippingInfo {
  packageWeight: number;
  packageHeight: number;
  packageWidth: number;
  packageLength: number;
  shippingFee: number;
}

export interface Variants {
  id: number | null;
  name: string | null;
  price: number | null;
}

export interface Shop {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  shippingOptions: string[];
  openingHours: string;
  closingHours: string;
  productList: Product[];
  addressLabel: string;
  addressProvince: string;
  addressCity: string;
  addressDistrict: string;
  addressSubdistrict: string;
  addressStreet: string;
  shippingChannel: string[];
  zipCode: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string[];
  category: string;
  stocks: number;
  unit: string;
  discount: number;
  rating: number;
  isWishlist: boolean;
  shippingInfo: ShippingInfo;
  shop: { id: number; name: string; imageUrl: string; addressCity: string; shippingChannel: string[] };
  sold: number;
  variants: Variants[];
  tags: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  imageUrl: string | null;
  phoneNumber: string | null;
  addressLabel: string | null;
  addressStreet: string | null;
  addressSubdistrict: string | null;
  addressDistrict: string | null;
  addressCity: string | null;
  addressProvince: string | null;
  zipCode: number | null;
}

export interface Shop {
  id: number;
  userId: number;
  name: string;
  imageUrl: string;
  phoneNumber: string;
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

export interface CartItem {
  id: number;
  userId: number;
  product: {
    id: number;
    name: string;
    category: string;
    imageUrl: string;
    stocks: number;
  };
  shop: {
    shopId: number;
    shopName: string;
    imageUrl: string;
    addressCity: string;
    shippingChannel: string[];
  };
  selectedVariant: {
    variantId: number;
    variantName: string;
    price: number;
  };
  quantity: number;
  createdAt: string;
  updatedAt: string;
}
