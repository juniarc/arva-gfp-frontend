"use client";

import React, { useEffect, useState, useMemo } from "react";

import { ReqOrderItemBody, ReqUserBody, ShopingItem, User, UserInShipmentPage, Voucher } from "@/types/types";
import BuynowPage from "./BuynowPage";
import BuynowPageDesktop from "./desktop/BuynowPageDesktop";
import { InitialValues } from "../modals/AdressModal";
import api from "@/services/api/api";
import { useRouter } from "next/navigation";

interface BuynowPageWrapperProps {
  user: UserInShipmentPage;
  token: string | undefined;
  viewport: string | undefined;
  userId: number;
}

export default function BuynowPageWrapper({ user, viewport, token, userId }: BuynowPageWrapperProps) {
  const initialShopingItem = {
    product_id: 0,
    category: "",
    discount: [],
    image: "",
    priceAfterDiscount: 0,
    product_name: "",
    quantity: 0,
    selectedVariant: {
      variant_id: 0,
      variant_name: "",
      variant_price: 0,
      variant_stock: 0,
      variant_unit: "",
    },
    shipping_cost: 0,
    shop: {
      shop_id: 0,
      shop_name: "",
      shop_phone_number: "",
      shop_email: "",
      description: "",
      shop_image: "",
      created_at: "",
      shop_address_province: "",
      shop_address_city: "",
      shop_address_district: "",
      shop_address_subdistrict: "",
      shop_address_street: "",
      shop_zip_code: 0,
      status: "",
      user_id: 0,
    },
  };
  const [shopingItem, setShopingItem] = useState<ShopingItem>(initialShopingItem);
  const [totalPriceItem, setTotalPriceItem] = useState<number>(shopingItem.priceAfterDiscount);
  const [totalShippingCost, setTotalShippingCost] = useState(shopingItem.shipping_cost * shopingItem.quantity);
  const [vouhcerShop, setVoucherShop] = useState<Voucher[]>([]);

  const getVoucherShop = async () => {
    const response = await api.getAllVoucherShop(shopingItem.shop.shop_id);
    setVoucherShop(response);
  };
  useEffect(() => {
    const itemFromStorage = sessionStorage.getItem("shopingItem");
    const parsedItem = itemFromStorage ? JSON.parse(itemFromStorage) : null;
    setShopingItem(parsedItem);
    setTotalPriceItem(parsedItem.priceAfterDiscount);
  }, []);

  useEffect(() => {
    if (shopingItem.shop.shop_id) {
      getVoucherShop();
    }
  }, [shopingItem.shop.shop_id]);

  console.log(vouhcerShop);

  const [currentUser, setCurrentUser] = useState({ ...user, address_label: "Home", address_street: user.address_street ?? "" });
  const [editAddressStatus, setEditAddressStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formatReqUserBodyToLowerCase = (value: InitialValues): ReqUserBody => {
    return {
      address_city: value.address_city.toLowerCase(),
      address_district: value.address_district.toLowerCase(),
      address_subdistrict: value.address_subdistrict.toLowerCase(),
      address_street: value.address_street.toLowerCase(),
      address_province: value.address_province.toLowerCase(),
      zip_code: value.zip_code.toString(),
    };
  };

  const handleFetchUpdatedUser = async (updatedAddress: any) => {
    setEditAddressStatus("loading");
    const formatedBody = formatReqUserBodyToLowerCase(updatedAddress);
    console.log(formatedBody);
    try {
      await api.updateUser(userId, token, formatedBody);

      const updatedUser = await api.getUser(userId, token);
      setCurrentUser((prevState) => ({
        ...prevState,
        ...updatedUser,
        address_label: updatedAddress.address_label,
      }));

      setEditAddressStatus("success");
      setTimeout(() => {
        setEditAddressStatus("idle");
      }, 2000);
    } catch (error) {
      console.log(error);
      setEditAddressStatus("error");
      setTimeout(() => {
        setEditAddressStatus("idle");
      }, 2000);
    }
  };

  const [distance, setDisctance] = useState(0);

  useEffect(() => {
    const calculateDistance = async () => {
      try {
        if (user.address_city && shopingItem) {
          const userAddress = `${user.address_street}, ${user.address_subdistrict}, ${user.address_district}, ${user.address_city}, ${user.address_province}, Indonesia`;
          const shopAddress = `${shopingItem.shop.shop_address_street}, ${shopingItem.shop.shop_address_subdistrict}, ${shopingItem.shop.shop_address_district}, ${shopingItem.shop.shop_address_city}, ${shopingItem.shop.shop_address_province}, Indonesia`;

          const distance = await api.calculateDistance(userAddress, shopAddress);

          // const totalShippingCost = distance * shopingItem.shipping_cost * shopingItem.quantity;
          setDisctance(distance);
        }
      } catch (error) {
        alert("Fail to calculate shipping cost");
        setDisctance(0);
      }
    };

    calculateDistance();
  }, [user.address_city, shopingItem]);

  useEffect(() => {
    if (distance) {
      setTotalShippingCost(shopingItem.shipping_cost * shopingItem.quantity * distance);
    } else {
      setTotalShippingCost(shopingItem.shipping_cost * shopingItem.quantity);
    }
  }, [shopingItem.shipping_cost, shopingItem.quantity, distance]);

  const [isProtected, setIsProtected] = useState<boolean>(false);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsProtected(e.target.checked);
  };

  const handleQuantityChange = (newQuantity: number, maxStock: number) => {
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      setShopingItem((prevState) => ({
        ...prevState,
        quantity: newQuantity,
      }));
      setTotalPriceItem(shopingItem.priceAfterDiscount * newQuantity);
    }
  };

  const [selectedShipping, setSelectedShipping] = useState<string>("");
  const handleSelectedShipping = (shipping: string) => {
    setSelectedShipping(shipping);
  };

  const [paymentMethod, setPaymentMethod] = useState<{ imageUrl: string; name: string }>({
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    name: "Mandiri Virtual Account",
  });
  const handlePaymentMethod = (method: { imageUrl: string; name: string }) => {
    setPaymentMethod(method);
  };

  const [selectedVoucher, setSelectedVoucher] = useState<{ voucher_id: number; voucher_name: string; voucher_value: number }>({
    voucher_id: 0,
    voucher_name: "",
    voucher_value: 0,
  });
  const handleSelectedVoucher = (voucher: { voucher_id: number; voucher_name: string; voucher_value: number }) => {
    setSelectedVoucher(voucher);
  };

  const isCompleted = useMemo(() => {
    return currentUser && shopingItem.quantity >= 1 && selectedShipping !== "" && paymentMethod && paymentMethod.name !== "";
  }, [currentUser, selectedShipping, paymentMethod]);

  const [orderStatus, setOrderStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const createReqOrderBody = (): ReqOrderItemBody => {
    const orderBody: ReqOrderItemBody = {
      product_id: shopingItem.product_id,
      quantity: shopingItem.quantity,
      variant_id: shopingItem.selectedVariant.variant_id,
      shipping_cost: totalShippingCost,
    };

    if (selectedVoucher.voucher_id !== 0) {
      orderBody.voucher_id = selectedVoucher.voucher_id;
    }

    return orderBody;
  };

  const router = useRouter();
  const handleOrder = async () => {
    setOrderStatus("loading");
    try {
      const requestBody = createReqOrderBody();
      const orderResponse = await api.createOrderItem(token, requestBody);

      if (orderResponse.order_id) {
        await api.checkoutOrder(orderResponse.order_id, token, {});
        setOrderStatus("success");

        setTimeout(() => {
          setOrderStatus("idle");
        }, 3000);

        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setOrderStatus("error");

      setTimeout(() => {
        setOrderStatus("idle");
      }, 2000);
    }
  };

  if (!shopingItem) return null;
  if (viewport === "mobile") {
    return (
      <BuynowPage
        isCompleted={isCompleted}
        handleCheckbox={handleCheckbox}
        handleFetchUpdatedUser={handleFetchUpdatedUser}
        handleQuantityChange={handleQuantityChange}
        handleSelectedPayment={handlePaymentMethod}
        handleSelectedShipping={handleSelectedShipping}
        selectedShipping={selectedShipping}
        paymentMethod={paymentMethod}
        currentUser={currentUser}
        shoppingItem={shopingItem}
        isProtected={isProtected}
        handlePayBtn={handleOrder}
        editAddressStatus={editAddressStatus}
        orderStatus={orderStatus}
        totalPriceItem={totalPriceItem}
        totalShippingCost={totalShippingCost}
        handleSelectedVoucher={handleSelectedVoucher}
        selectedVocuher={selectedVoucher}
        voucherShop={vouhcerShop}
      />
    );
  }
  return (
    <BuynowPageDesktop
      isCompleted={isCompleted}
      handleCheckbox={handleCheckbox}
      handleFetchUpdatedUser={handleFetchUpdatedUser}
      handleQuantityChange={handleQuantityChange}
      handleSelectedPayment={handlePaymentMethod}
      handleSelectedShipping={handleSelectedShipping}
      selectedShipping={selectedShipping}
      paymentMethod={paymentMethod}
      currentUser={currentUser}
      shoppingItem={shopingItem}
      isProtected={isProtected}
      handlePayBtn={handleOrder}
      editAddressStatus={editAddressStatus}
      orderStatus={orderStatus}
      totalPriceItem={totalPriceItem}
      totalShippingCost={totalShippingCost}
      handleSelectedVoucher={handleSelectedVoucher}
      selectedVocuher={selectedVoucher}
      voucherShop={vouhcerShop}
    />
  );
}
