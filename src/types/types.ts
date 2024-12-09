export interface ShippingInfo {
  packageWeight: number;
  packageHeight: number;
  packageWidth: number;
  packageLength: number;
  shippingFee: number;
}

export interface Shop {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  shippingOptions: string[];
  location: string;
  openingHours: string;
  closingHours: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stocks: number;
  unit: string;
  discount: number;
  rating: number;
  isWishlist: boolean;
  shippingInfo: ShippingInfo;
  shop: Shop;
  sold: number;
  variants: string[];
}

export interface CartItem extends Product {
  selectedVariant: string;
  quantity: number;
  totalPrice: number;
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
