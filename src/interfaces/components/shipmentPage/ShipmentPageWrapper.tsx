"use client";

import { useEffect, useMemo, useState } from "react";
import { CartItem, ReqUserBody, User, UserInShipmentPage } from "@/types/types";
import ShipmentPage from "./ShipmentPage";
import ShipmentPageDesktop from "./desktop/ShipmentPageDesktop";
import { InitialValues } from "../modals/AdressModal";
import api from "@/services/api/api";
import { useRouter } from "next/navigation";

interface ShipmentPageWrapperProps {
  user: User;
  viewport: string | undefined;
  userId: number;
  token: string | undefined;
}
export default function ShipmentPageWrapper({ user, viewport, userId, token }: ShipmentPageWrapperProps) {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<UserInShipmentPage>({
    ...user,
    address_label: "Home",
    address_street: user.address_street ?? "",
    zip_code: user.zip_code ?? "",
  });
  const separatedByShop = selectedItems.reduce(
    (acc, item) => {
      const { shop_id } = item.shop;
      if (!acc[shop_id]) {
        acc[shop_id] = {
          shop_name: item.shop.shop_name,
          products: [],
        };
      }
      acc[shop_id].products.push(item);
      return acc;
    },
    {} as Record<number, { shop_name: string; products: CartItem[] }>,
  );

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

  const [totalShippingCost, setTotalShippingCost] = useState(0);
  const calculateTotalShippingCost = async () => {
    try {
      if (user.address_city && selectedItems.length > 0) {
        const userAddress = `${user.address_street}, ${user.address_subdistrict}, ${user.address_district}, ${user.address_city}, ${user.address_province}, Indonesia`;

        const shippingCosts = await Promise.all(
          selectedItems.map(async (item) => {
            const shopAddress = `${item.shop.shop_address_street}, ${item.shop.shop_address_subdistrict}, ${item.shop.shop_address_district}, ${item.shop.shop_address_city}, ${item.shop.shop_address_province}, Indonesia`;

            const distance = await api.calculateDistance(userAddress, shopAddress);

            return {
              product_id: item.product_id,
              shipping_cost: distance * item.shipping_cost * item.quantity,
            };
          }),
        );

        const totalShippingCost = shippingCosts.reduce((total, item) => total + item.shipping_cost, 0);
        setTotalShippingCost(totalShippingCost);
        return {
          totalShippingCost,
          shippingCosts,
        };
      } else {
        return { shippingCosts: [], totalShippingCost: 0 };
      }
    } catch (error) {
      alert(`Error calculating shipping cost:${error}`);
      return { shippingCosts: [], totalShippingCost: 0 };
    }
  };

  useEffect(() => {
    calculateTotalShippingCost();
  }, [user, selectedItems]);

  useEffect(() => {
    const cart = sessionStorage.getItem("selectedItems");
    const parsedCart = cart ? JSON.parse(cart) : [];
    setSelectedItems(parsedCart);
  }, []);

  const handleQuantityChange = (productId: number, newQuantity: number, maxStock: number) => {
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      const updatedCart = selectedItems
        .map((item) => {
          if (item.product_id === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      setSelectedItems(updatedCart);
    }
  };
  const [selectedShipping, setSelectedShipping] = useState<Record<number, string>>({});
  const handleSelectedShipping = (shop_id: number, shippingOption: string) => {
    setSelectedShipping((prev) => ({ ...prev, [shop_id]: shippingOption }));
  };

  const [isProtected, setIsProtected] = useState<Record<number, boolean>>({});
  const handleCheckboxChange = (shop_id: number, isChecked: boolean) => {
    setIsProtected((prevState) => ({
      ...prevState,
      [shop_id]: isChecked,
    }));
  };
  const checkedCount = Object.values(isProtected).filter(Boolean).length;

  useEffect(() => {
    // Set default value false for all shopIds when component mounts
    const initialProtectionState: Record<number, boolean> = {};
    selectedItems.forEach((product: CartItem) => {
      initialProtectionState[product.shop.shop_id] = false;
    });
    setIsProtected(initialProtectionState);
  }, [selectedItems]);

  const [paymentMethod, setPaymentMethod] = useState<{ imageUrl: string; name: string }>({
    imageUrl: "https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY",
    name: "Mandiri Virtual Account",
  });
  const handlePaymentMethod = (method: { imageUrl: string; name: string }) => {
    setPaymentMethod(method);
  };

  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const calculateCartSummary = () => {
    const totalItems = selectedItems.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = selectedItems.reduce((total, item) => total + item.quantity * item.priceAfterDiscount, 0);
    setTotalPrice(totalPrice);
    setTotalItems(totalItems);
  };

  useEffect(() => {
    calculateCartSummary();
  }, [selectedItems]);

  const [selectedVoucher, setSelectedVoucher] = useState<{ voucher_id: number; voucher_name: string; voucher_value: number; shop_id?: number }[]>([]);
  const handleSelectedVoucher = (voucher: { voucher_id: number; voucher_name: string; voucher_value: number; shop_id?: number }[]) => {
    setSelectedVoucher(voucher);
  };

  const [orderStatus, setOrderStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isCompleted = useMemo(() => {
    const allShippingSelected = Object.keys(selectedShipping).length > 0 && Object.values(selectedShipping).every((value) => value !== "");
    return currentUser && totalItems >= 1 && allShippingSelected && paymentMethod && paymentMethod.name !== "";
  }, [currentUser, totalItems, selectedShipping, paymentMethod]);

  const createReqOrderBody = async () => {
    const { shippingCosts } = await calculateTotalShippingCost();
    const requestBody = selectedItems.map((item) => {
      const shippingCost = shippingCosts.find((cost) => cost.product_id === item.product_id)?.shipping_cost ?? 0;
      const voucher = selectedVoucher.find((v) => v.shop_id === item.shop.shop_id);
      return {
        product_id: item.product_id,
        variant_id: item.selectedVariant.variant_id,
        quantity: item.quantity,
        shipping_cost: shippingCost,
        voucher_id: voucher?.voucher_id ?? 0,
      };
    });

    return requestBody;
  };

  const handleOrder = async () => {
    // const requestBody = await createReqOrderBody();
    // console.log(requestBody);
    setOrderStatus("loading");
    try {
      const requestBody = await createReqOrderBody();
      const createOrder = await api.createOrder(token);

      if (createOrder.order_id) {
        await Promise.all([
          api.createMultipleOrderItem(createOrder.order_id, token, requestBody),
          api.checkoutOrder(createOrder.order_id, token, {}),
        ]);

        setOrderStatus("success");

        setTimeout(() => {
          setOrderStatus("idle");
        }, 2000);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setOrderStatus("error");

      setTimeout(() => {
        setOrderStatus("idle");
      }, 2000);
    }
  };

  if (viewport === "mobile")
    return (
      <ShipmentPage
        separatedByShop={separatedByShop}
        user={currentUser}
        handleFetchUpdatedUser={handleFetchUpdatedUser}
        cart={selectedItems}
        handleQuantityChange={handleQuantityChange}
        selectedShipping={selectedShipping}
        handleSelectedShipping={handleSelectedShipping}
        handleCheckbox={handleCheckboxChange}
        isProtected={isProtected}
        paymentMethod={paymentMethod}
        handleSelectedPayment={handlePaymentMethod}
        totalItems={totalItems}
        totalPrice={totalPrice}
        isCompleted={isCompleted}
        totalProtectedShop={checkedCount}
        editAddressStatus={editAddressStatus}
        shippingPrice={totalShippingCost}
        handlePayBtn={handleOrder}
        orderStatus={orderStatus}
        handleSelectedVoucher={handleSelectedVoucher}
        selectedVocuher={selectedVoucher}
      />
    );
  return (
    <ShipmentPageDesktop
      separatedByShop={separatedByShop}
      user={currentUser}
      handleFetchUpdatedUser={handleFetchUpdatedUser}
      cart={selectedItems}
      handleQuantityChange={handleQuantityChange}
      selectedShipping={selectedShipping}
      handleSelectedShipping={handleSelectedShipping}
      handleCheckbox={handleCheckboxChange}
      isProtected={isProtected}
      paymentMethod={paymentMethod}
      handleSelectedPayment={handlePaymentMethod}
      totalItems={totalItems}
      totalPrice={totalPrice}
      isCompleted={isCompleted}
      totalProtectedShop={checkedCount}
      editAddressStatus={editAddressStatus}
      shippingPrice={totalShippingCost}
      handlePayBtn={handleOrder}
      orderStatus={orderStatus}
      handleSelectedVoucher={handleSelectedVoucher}
      selectedVocuher={selectedVoucher}
    />
  );
}
