import { Product, User } from "@/types/types";
import { mockApiRequest, mockApiRequestUser } from "./dummyData";

const api = (() => {
  const BASE_URL = "https//";

  async function getAllProducts(limit?: number): Promise<Product[] | undefined> {
    try {
      const response: Product[] = await mockApiRequest("/products", { limit: limit });
      return response;
    } catch (error) {
      console.error(error);
      return undefined;
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

  async function getUser() {
    try {
      const response: User = await mockApiRequestUser("/user");
      return response;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  return { getAllProducts, getAllProductsByCategory, getProductById, getUser };
})();

export default api;
