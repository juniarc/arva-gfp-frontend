import { CreateShopBody, Product, UploadProductBody, User } from "@/types/types";
import { mockApiRequest, mockApiRequestShop, mockApiRequestUser } from "./dummyData";

const api = (() => {
  const BASE_URL = "http://127.0.0.1:5000";

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

  async function getAllProductsByCategory(category: string, limit?: number): Promise<Product[] | undefined> {
    try {
      const response: Product[] = await mockApiRequest("/products", { limit: limit, category: category });
      return response;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function getProductById(id: number): Promise<Product | undefined> {
    try {
      const response: Product = await mockApiRequest("/products", { id: id });
      return response;
    } catch (error) {
      console.error(error);
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

  async function createShop(userId: number, token: string | undefined, shop: CreateShopBody) {
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

  async function createProduct(userId: number, token: string | undefined, product: UploadProductBody) {
    try {
      const response = await fetch(`${BASE_URL}/createproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
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

  return { getAllProducts, getAllProductsByCategory, getProductById, getUser, getShop, createShop, createProduct };
})();

export default api;
