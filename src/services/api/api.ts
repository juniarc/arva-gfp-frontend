import {
  CreateDiscountBody,
  CreateTagBody,
  CreateVoucherBody,
  LoginBody,
  Product,
  RegisterBody,
  ReqCartbody,
  ReqOrderItemBody,
  ReqProductBody,
  ReqShopBody,
  User,
} from "@/types/types";

const api = (() => {
  const BASE_URL = "https://arva-backend-production.up.railway.app";
  // const BASE_URL = "http://127.0.0.1:5000";

  async function getAllProducts(limit?: number): Promise<Product[] | undefined> {
    try {
      const response = await fetch(`${BASE_URL}/product/getreqallproduct`);
      const products: Product[] = await response.json();

      // const imageListResponse = await fetch(`${BASE_URL}/image_product/allimage`);
      // const imageList = await imageListResponse.json();

      // const productsWithImages = products.map((product) => {
      //   const productImage = imageList.find((image: any) => image.product_id === product.product_id)?.image_data || [];
      //   return { ...product, imageUrl: productImage };
      // });
      // return productsWithImages;
      return products;
    } catch (error) {
      throw Error("failed to fetch");
    }
  }

  async function getAllProductsByCategory(category_id: number, limit?: number): Promise<Product[] | undefined> {
    try {
      const response = await fetch(`${BASE_URL}/product/getproductbycategory/${category_id}`);
      if (!response.ok) {
        throw Error("failed to fetch");
      }
      return response.json();
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function getProductsByName(product_name: string): Promise<Product[] | undefined> {
    try {
      const response = await fetch(`${BASE_URL}/product/searchproduct/${product_name}`);
      if (!response.ok) {
        throw Error("failed to fetch");
      }
      return response.json();
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  // async function getProductById(id: number): Promise<Product | undefined> {
  //   try {
  //     const response = await mockApiRequest("/products", { id: id });
  //     return response;
  //   } catch (error) {
  //     console.error(error);
  //     return undefined;
  //   }
  // }

  async function getDetailProductById(productId: number) {
    try {
      const response = await fetch(`${BASE_URL}/product/getreqproductdetail/${productId}`);
      return response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function getProductByShopId(shopId: number) {
    try {
      const response = await fetch(`${BASE_URL}/product/getproductbyseller/${shopId}`);
      return response.json();
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function createProduct(userId: number, token: string | undefined, product: ReqProductBody) {
    try {
      const response = await fetch(`${BASE_URL}/product/createnewproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw Error("Failed to create product");
      }

      return response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function editProduct(product_id: number, token: string | undefined, product: ReqProductBody) {
    try {
      const response = await fetch(`${BASE_URL}/product/${product_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw Error("Failed to edit product");
      }

      return response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function deleteProduct(product_id: number, token: string | undefined) {
    try {
      const response = await fetch(`${BASE_URL}/product/${product_id}/deactivate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "deactivate" }),
      });

      if (!response.ok) {
        throw Error("Failed to delete product");
      }

      return response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function createDiscount(product_id: number, token: string | undefined, discount: CreateDiscountBody) {
    try {
      const response = await fetch(`${BASE_URL}/discount/creatediscount/${product_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(discount),
      });

      if (!response.ok) {
        throw Error("Failed to edit product");
      }

      return response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function editDiscount(discount_id: number, token: string | undefined, discount: CreateDiscountBody) {
    try {
      const response = await fetch(`${BASE_URL}/discount/updatediscount/${discount_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(discount),
      });

      if (!response.ok) {
        throw Error("Failed to edit product");
      }

      return response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function getUser(userId: number, token: string | undefined) {
    try {
      const response = await fetch(`${BASE_URL}/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function updateUser(userId: number, token: string | undefined, body: any) {
    try {
      const response = await fetch(`${BASE_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      return response.json();
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function regiser(body: RegisterBody) {
    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function login(body: LoginBody) {
    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function createShop(userId: number, token: string | undefined, shop: ReqShopBody) {
    console.log(shop);
    try {
      const response = await fetch(`${BASE_URL}/shop/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(shop),
      });

      if (!response.ok) {
        throw Error("Failed to create shop");
      }

      return response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function editShopInfo(userId: number, token: string | undefined, shop: ReqShopBody) {
    console.log(shop);
    try {
      const response = await fetch(`${BASE_URL}/shop/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(shop),
      });

      if (!response.ok) {
        throw Error("Failed to edit shop");
      }

      return response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function getShop(userId: number, token: string | undefined) {
    try {
      const response = await fetch(`${BASE_URL}/shop/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function getShopById(shopId: number) {
    try {
      const response = await fetch(`${BASE_URL}/shop/getshopbyid/${shopId}`);
      return response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function getAllTags() {
    try {
      const response = await fetch(`${BASE_URL}/tag/alltag`);
      return response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function getTagsProductByProductId(product_id: number, token: string | undefined) {
    try {
      const response = await fetch(`${BASE_URL}/tag_product/gettagbyproductid/${product_id}`);
      return response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function createTag(token: string | undefined, tagBody: CreateTagBody) {
    try {
      const response = await fetch(`${BASE_URL}/tag/createtag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tagBody),
      });
      return response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function createProductTag(product_id: number, token: string | undefined, tagProductBody: { tag_id: number }) {
    try {
      const response = await fetch(`${BASE_URL}/tag_product/createtagproduct/${product_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tagProductBody),
      });
      return response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function deleteProductTag(product_id: number, token: string | undefined, tagId: number) {
    try {
      const response = await fetch(`${BASE_URL}/tag_product/deletetagproduct/${product_id}/${tagId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function getCart(userId: number) {
    try {
      const response = await fetch(`${BASE_URL}/cart/getcartbyuserid/${userId}`);
      return await response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function addProductToCart(token: string | undefined, reqCartbody: ReqCartbody) {
    try {
      const response = await fetch(`${BASE_URL}/cart/addtocart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reqCartbody),
      });
      return response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function removeProductFromCart(productId: number, token: string | undefined) {
    try {
      const response = await fetch(`${BASE_URL}/cart/removefromcart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCart(cartId: number, token: string | undefined, quantity: number) {
    try {
      const response = await fetch(`${BASE_URL}/cart/updatecart/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: quantity }),
      });
      return response.json();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async function calculateDistance(userAddress: string, shopAddress: string, api_key?: string) {
    console.log(`origins=${shopAddress}&destinations=${userAddress}`);
    return 20;
    // try {
    //   const response = await fetch(
    //     `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${shopAddress}&destinations=${userAddress}&key=${api_key}`,
    //   );
    //   const responseJson = await response.json();
    //   const rows = responseJson.rows;
    //   const firstElement = rows[0].elements;
    //   const elementContent = firstElement[0].disctance;
    //   return elementContent;
    // } catch (error) {
    //   console.log(error);
    //   return undefined;
    // }
  }

  async function createOrder(token: string | undefined) {
    try {
      const response = await fetch(`${BASE_URL}/order/createorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function createMultipleOrderItem(orderId: number, token: string | undefined, orderItemBody: ReqOrderItemBody[]) {
    try {
      const response = await fetch(`${BASE_URL}/orderitem/createmultipleorder/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderItemBody),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function createOrderItem(token: string | undefined, orderItemBody: ReqOrderItemBody) {
    try {
      const response = await fetch(`${BASE_URL}/orderitem/createorderandorderitem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderItemBody),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function checkoutOrder(order_id: number, token: string | undefined, body?: any) {
    try {
      const response = await fetch(`${BASE_URL}/order/checkoutorder/${order_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function getOrderList(userid: number) {
    try {
      const response = await fetch(`${BASE_URL}/order/getcompleteorderbyuser/${userid}`);
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function createRating(orderId: number, token: string | undefined, body: { product_id: number; rating_product: number; review: string }) {
    try {
      const response = await fetch(`${BASE_URL}/rating/createrating/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function addToWishlist(product_id: number, token: string | undefined) {
    try {
      const response = await fetch(`${BASE_URL}/wishlist/addwishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: product_id }),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function getWishlist(userId: number) {
    try {
      const response = await fetch(`${BASE_URL}/wishlist/getwishlistuser/${userId}`);
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteWishlist(wishlist_id: number, token: string | undefined) {
    try {
      const response = await fetch(`${BASE_URL}/wishlist/deletewishlist/${wishlist_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function allWishlist() {
    try {
      const response = await fetch(`${BASE_URL}/wishlist/allwishlist`);
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function createVoucher(token: string | undefined, reqBody: CreateVoucherBody) {
    console.log(token);
    try {
      const response = await fetch(`${BASE_URL}/voucher/createvoucher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reqBody),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function getVoucher(shop_id: number) {
    try {
      const response = await fetch(`${BASE_URL}/voucher/getvouchershop/${shop_id}`);
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteVoucher(voucher_id: number, token: string | undefined) {
    try {
      const response = await fetch(`${BASE_URL}/voucher/deletevoucher/${voucher_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllVoucherShop(shop_id: number) {
    try {
      const response = await fetch(`${BASE_URL}/voucher/getvouchershop/${shop_id}`);
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getAllProducts,
    getAllProductsByCategory,
    // getProductById,
    getProductsByName,
    getDetailProductById,
    getProductByShopId,
    createProduct,
    editProduct,
    deleteProduct,
    createDiscount,
    editDiscount,
    getUser,
    updateUser,
    getShop,
    getShopById,
    createShop,
    editShopInfo,
    getAllTags,
    getTagsProductByProductId,
    createTag,
    createProductTag,
    deleteProductTag,
    addProductToCart,
    getCart,
    updateCart,
    removeProductFromCart,
    calculateDistance,
    createOrder,
    createMultipleOrderItem,
    createOrderItem,
    checkoutOrder,
    getOrderList,
    createRating,
    addToWishlist,
    getWishlist,
    allWishlist,
    deleteWishlist,
    getVoucher,
    createVoucher,
    deleteVoucher,
    getAllVoucherShop,
    login,
    regiser,
  };
})();

export default api;
