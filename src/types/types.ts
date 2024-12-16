export interface ShippingInfo {
  packageWeight: number;
  packageHeight: number;
  packageWidth: number;
  packageLength: number;
  shippingFee: number;
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
  product_id: number;
  product_name: string;
  description: string;
  product_type: string | null;
  image: string[] | null;
  category: string;
  discount: Discount[] | null;
  rating: number;
  shipping_cost: number;
  shop: { shop_id: number; shop_address_city: string };
  sold: number;
  variant: Variant[] | null;
  status: string;
  // tags: string[];
}

export interface UploadProductBody {
  image_data: string[];
  product_name: string;
  product_description: string;
  category: string;
  variant_name: string;
  price: number;
  unit: string;
  stock: number;
  discount_name: string;
  discount_value: number;
  start_date: string;
  end_date: string;
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

export interface CreateShopBody {
  shop_image: string;
  shop_name: string;
  description: string;
  shop_address_province: string;
  shop_address_city: string;
  shop_address_district: string;
  shop_address_subdistrict: string;
  shop_address_street: string;
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
