import api from "@/services/api/api";
import { avaibleCategories } from "@/services/fixedData";
import { CartItem, Discount, Product, ProductDetail, ResponseGetCartUser, ResponseGetCartUserItem } from "@/types/types";

export const checkIsTextClamped = (element: HTMLElement): boolean => {
  return element.scrollHeight > element.clientHeight;
};

export const currencyFormater = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export const formatPrice = (value: string) => {
  const numericValue = value.replace(/\D/g, "");
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const paginateArray = (array: any, itemsPerPage: any) => {
  if (array.length === 0) {
    return "Products not found";
  }
  return array.reduce((result: any, item: any, index: number) => {
    const pageIndex = Math.floor(index / itemsPerPage);
    if (!result[pageIndex]) {
      result[pageIndex] = [];
    }
    result[pageIndex].push(item);
    return result;
  }, []);
};

export const startPage = (currentPage: any, maxIndicators: any, totalPages: any) => {
  return Math.max(0, Math.min(currentPage - Math.floor(maxIndicators / 2), totalPages - maxIndicators));
};

export const endPage = (startPage: any, maxIndicators: any, totalPages: any) => {
  return Math.min(startPage + maxIndicators, totalPages);
};

export const calculateAverageRatingShop = (products: any) => {
  const validRatings = products.map((product: any) => (product.ratings === "number" && !isNaN(product.ratings) ? product.ratings : 0));

  const totalRating = validRatings.reduce((sum: any, rating: any) => sum + rating, 0);

  const averageRating = validRatings.length > 0 ? totalRating / validRatings.length : 0;

  return { totalRating, averageRating };
};

export const convertCategoryNameToId = (categoryName: string) => {
  const category = avaibleCategories.find((category) => category.category_name === categoryName);
  return category ? category.category_id : 0;
};

export const convertCategoryIdToName = (categoryId: number) => {
  const category = avaibleCategories.find((category) => category.category_id === categoryId);
  return category ? category.category_name : "";
};

export const convertCartResponseToCartItems = async (cartResponse: ResponseGetCartUser) => {
  try {
    const getProductDetails = cartResponse.cart.map(async (item) => {
      const response = await api.getDetailProductById(item.product_id);
      return response;
    });

    const productDetails = await Promise.all(getProductDetails);

    const cartItems: CartItem[] = cartResponse.cart.map((cartItem) => {
      const productDetail = productDetails.find((product) => product.product_id === cartItem.product_id);
      if (!productDetail) {
        throw new Error(`Product detail not found for product_id: ${cartItem.product_id}`);
      }
      const selectedVariant = productDetail.variant.find((item: any) => item.variant_id === cartItem.variant_id);
      if (!selectedVariant) {
        throw new Error(`Variant not found for variant_id: ${cartItem.variant_id}`);
      }

      return {
        cart_id: cartItem.cart_id,
        user_id: cartItem.user_id,
        product_id: productDetail.product_id,
        product_name: productDetail.product_name,
        category: productDetail.category,
        image: productDetail.image[0]?.image_data || "",
        shop: productDetail.shop,
        selectedVariant,
        quantity: cartItem.quantity,
        discount: productDetail.discount,
        priceAfterDiscount: selectedVariant.variant_price,
        shipping_cost: productDetail.shipping_cost,
      };
    });

    return cartItems;
  } catch (error) {
    throw error;
  }
};

export const separateCartItemsByShop = (cartItems: CartItem[]): Record<number, { shop_name: string; products: CartItem[] }> => {
  return cartItems.reduce(
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
};

export const calculateRatings = (products: Product[]) => {
  if (!Array.isArray(products) || products.length === 0) {
    return { totalRating: 0, averageRating: 0 };
  }

  const totalRating = products.reduce((sum, product) => sum + (Number(product.ratings) || 0), 0);
  const averageRating = totalRating / products.length;

  return { totalRating, averageRating };
};
