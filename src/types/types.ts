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
  stocks: string;
  unit: string;
  discount: string;
  rating: number;
  isWishlist: boolean;
  shippingInfo: ShippingInfo;
  shop: Shop;
  sold: number;
}
