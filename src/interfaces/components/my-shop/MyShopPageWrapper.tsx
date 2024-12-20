"use client";

import { ShopDevelop } from "@/services/api/dummyShop";
import MyShopPage from "./MyShopPage";
import { calculateAverageRatingShop } from "@/utils/elementHelpers";
import { useEffect, useState } from "react";
import MyShopPageDesktop from "./desktop/MyShopPageDesktop";
import { CreateDiscountBody, Product, ReqProductBody, ReqShopBody, ShopDetail, Voucher } from "@/types/types";
import api from "@/services/api/api";
import { format } from "date-fns";

interface MyShopPageWrapperProps {
  shop: ShopDetail;
  viewport: string | undefined;
  products: Product[];
  token: string | undefined;
  userId: number;
  vouchers: Voucher[];
}
export default function MyShopPageWrapper({ shop, viewport, token, userId, products, vouchers }: MyShopPageWrapperProps) {
  const [shopProfileValues, setShopProfileValues] = useState(shop);
  const [editShopStatus, setEditShopStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleEditShop = async (value: ReqShopBody) => {
    setEditShopStatus("loading");
    const formatedBody = formatReqShopBodyToLowerCase(value);
    try {
      await api.editShopInfo(userId, token, formatedBody);

      setShopProfileValues((prevState) => ({
        ...prevState,
        ...value,
      }));

      const latestShopInfo = await api.getShopById(shop.shop_id);
      setShopProfileValues(latestShopInfo);

      setEditShopStatus("success");
      setTimeout(() => {
        setEditShopStatus("idle");
      }, 2000);
    } catch (error) {
      setEditShopStatus("error");
      setTimeout(() => {
        setEditShopStatus("idle");
      }, 2000);
    }
  };

  const formatReqShopBodyToLowerCase = (value: ReqShopBody) => {
    return {
      ...value,
      shop_image: value.shop_image,
      shop_name: value.shop_name.toLowerCase(),
      description: value.description.toLowerCase(),
      shop_address_province: value.shop_address_province.toLowerCase(),
      shop_address_city: value.shop_address_city.toLowerCase(),
      shop_address_district: value.shop_address_district.toLowerCase(),
      shop_address_subdistrict: value.shop_address_subdistrict.toLowerCase(),
      shop_address_street: value.shop_address_street.toLowerCase(),
      shop_email: value.shop_email.toLowerCase(),
      shop_phone_number: value.shop_phone_number.toString(),
      shop_zip_code: value.shop_zip_code.toString(),
    };
  };

  const [productList, setProductList] = useState<Product[]>(products);
  const [manageProductStatus, setManageProductStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleAddProduct = async (value: any) => {
    setManageProductStatus("loading");
    const formatedBody = formatProductToLowerCase(value);
    try {
      const product = await api.createProduct(shop.shop_id, token, formatedBody);

      if (product.product_id) {
        const formatedDiscount = formatDiscountToLowerCase(value.discount);
        await api.createDiscount(product.product_id, token, formatedDiscount);
      }

      setProductList((prevState) => ({
        ...prevState,
        ...value,
      }));

      getUpdatedProductList();

      setManageProductStatus("success");
      setTimeout(() => {
        setManageProductStatus("idle");
      }, 2000);
    } catch (error) {
      setManageProductStatus("error");
      setTimeout(() => {
        setManageProductStatus("idle");
      }, 2000);
    }
  };

  const formatProductToLowerCase = (values: ReqProductBody): ReqProductBody => {
    return {
      product_type: values.product_type.toLowerCase(),
      product_name: values.product_name.toLowerCase(),
      images: values.images,
      description: values.description.toLowerCase(),
      category_id: values.category_id,
      variants: values.variants.map((variant) => ({
        variant_name: variant.variant_name.toLowerCase(),
        price: parseInt(String(variant.price).replace(/\./g, ""), 10),
        stock: variant.stock,
        unit: variant.unit.toLowerCase(),
      })),
      shipping_cost: values.shipping_cost,
    };
  };

  const formatDiscountToLowerCase = (values: CreateDiscountBody): CreateDiscountBody => {
    return {
      discount_name: values.discount_name.toLowerCase(),
      discount_type: "percentage",
      discount_value: values.discount_value,
      start_date: format(new Date(values.start_date), "yyyy-MM-dd"),
      end_date: format(new Date(values.end_date), "yyyy-MM-dd"),
    };
  };

  const getUpdatedProductList = async () => {
    const latestShopInfo = await api.getProductByShopId(shop.shop_id);
    setProductList(latestShopInfo);
  };
  const { totalRating, averageRating } = calculateAverageRatingShop(products);
  if (viewport === "mobile")
    return (
      <MyShopPage
        manageProductStatus={manageProductStatus}
        shop={shopProfileValues}
        products={productList}
        totalRatings={totalRating}
        averageRatings={averageRating}
        handleEditShop={handleEditShop}
        editShopStatus={editShopStatus}
        handleSubmit={handleAddProduct}
        token={token}
        getUpdateProductList={getUpdatedProductList}
        vouchers={vouchers}
      />
    );
  return (
    <MyShopPageDesktop
      manageProductStatus={manageProductStatus}
      shop={shopProfileValues}
      products={productList}
      totalRatings={totalRating}
      averageRatings={averageRating}
      handleEditShop={handleEditShop}
      editShopStatus={editShopStatus}
      handleSubmit={handleAddProduct}
      token={token}
      getUpdateProductList={getUpdatedProductList}
      vouchers={vouchers}
    />
  );
}
