export interface ShippingInfo {
  packageWeight: number;
  packageHeight: number;
  packageWidth: number;
  packageLength: number;
  shippingCost: number;
}

export interface Variant {
  variant_id: number;
  variant_name: string;
  variant_price: number;
  variant_stock: number;
  variant_unit: string;
}

export interface Discount {
  discount_id: number;
  discount_name: string;
  discount_type: string;
  discount_value: number;
  end_date: string;
  product_id: number;
  start_date: string;
}

export interface Shop {
  shop_id: number;
  shop_name: string;
  shop_phone_number: string;
  shop_email: string;
  description: string;
  shop_image: string;
  created_at: string;
  shop_address_province: string;
  shop_address_city: string;
  shop_address_district: string;
  shop_address_subdistrict: string;
  shop_address_street: string;
  shop_zip_code: number;
  status: string;
  user_id: number;
}

export interface ShopDetail {
  shop_id: number;
  shop_name: string;
  shop_image: string;
  description: string;
  shop_address_province: string;
  shop_address_city: string;
  shop_address_district: string;
  shop_address_subdistrict: string;
  shop_address_street: string;
  shop_zip_code: string;
  shop_email: string;
  shop_phone_number: string;
  created_at: string;
}

export interface Product {
  product_id: number;
  product_name: string;
  description: string;
  product_type: string;
  image: string[];
  category: string;
  discount: Discount[];
  ratings: string;
  shipping_cost: number;
  shop: { shop_id: number; shop_address_city: string; shop_name: string };
  sold: number;
  variant: Variant[];
  status: string;
  created_at: string;
  tag: any;
}

export interface ReqProductBody {
  images: string[];
  product_name: string;
  description: string;
  product_type: string;
  category_id: number;
  variants: {
    variant_name: string;
    price: number;
    stock: number;
    unit: string;
  }[];
  shipping_cost: number;
}

export interface ProductDetail {
  product_id: number;
  product_name: string;
  description: string;
  product_type: string;
  shipping_cost: number;
  created_at: string;
  sold: number;
  status: string;
  category: string;
  image: { image_data: string; image_id: number }[];
  variant: Variant[];
  tag: string[];
  discount: Discount[];
  shop: Shop;
  ratings: string;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
  phone_number: string;
  profile_image: string;
  role: string;
  address_city: string;
  address_district: string;
  address_province: string;
  address_street: string;
  address_subdistrict: string;
  zip_code: string;
}

export interface UserInShipmentPage extends User {
  address_label: string;
}

export interface ReqShopBody {
  shop_image: string;
  shop_name: string;
  description: string;
  shop_address_province: string;
  shop_address_city: string;
  shop_address_district: string;
  shop_address_subdistrict: string;
  shop_address_street: string;
  shop_zip_code: string;
  shop_email: string;
  shop_phone_number: string;
}

export interface CreateDiscountBody {
  discount_name: string;
  discount_value: number;
  discount_type: string;
  start_date: string;
  end_date: string;
}

export interface CartItem {
  cart_id: number;
  user_id: number;
  product_id: number;
  product_name: string;
  category: string;
  image: string;
  shop: Shop;
  selectedVariant: Variant;
  quantity: number;
  discount: Discount[];
  priceAfterDiscount: number;
  shipping_cost: number;
}

export interface CreateTagBody {
  tag_name: string;
}

export interface Tag {
  "tag.status": string;
  tag_name: string;
  tag_id: number;
}

export interface ReqCartbody {
  product_id: number;
  variant_id: number | undefined;
  quantity: number;
}

export interface ResponseGetCartUser {
  cart: ResponseGetCartUserItem[];
}

export interface ResponseGetCartUserItem {
  cart_id: number;
  created_at: string;
  product_id: number;
  quantity: number;
  user_id: number;
  variant_id: number;
}

export interface ReqUserBody {
  address_city: string;
  address_district: string;
  address_province: string;
  address_street: string;
  address_subdistrict: string;
  zip_code: string;
}

export interface ReqOrderItemBody {
  product_id: number;
  variant_id: number;
  quantity: number;
  shipping_cost: number;
}

export interface ShopingItem {
  product_id: number;
  category: string;
  discount: Discount[];
  image: string;
  priceAfterDiscount: number;
  product_name: string;
  quantity: number;
  selectedVariant: Variant;
  shipping_cost: number;
  shop: Shop;
}

export interface OrderHistory {
  created_at: string;
  order_id: number;
  payment_amount: number;
  status: "completed";
  total_amount: number;
  user_id: number;
  voucher_id: number | null;
}

export interface CreateVoucherBody {
  voucher_name: string;
  voucher_type: string;
  voucher_value: number;
  start_date: string;
  end_date: string;
}

export interface Voucher {
  end_date: string;
  shop_id: number;
  start_date: string;
  voucher_id: number;
  voucher_name: string;
  voucher_type: "percentage";
  voucher_value: number;
}

export interface WishlistItem {
  product_id: number;
  product_name: string;
  description: string;
  product_type: string;
  image: { image_data: string; image_id: number; product_id: number }[];
  category_name: string;
  discount: Discount[];
  rating: string;
  shipping_cost: number;
  shop: { shop_id: number; shop_address_city: string; shop_name: string };
  sold: number;
  variant: {
    price: number;
    product_id: number;
    stock: number;
    unit: string;
    variant_id: number;
    variant_name: string;
  }[];
  status: "active";
}
