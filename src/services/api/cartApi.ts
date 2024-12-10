const cartApi = (() => {
  const BASE_URL = "https://localhost:3001";

  const getAllCart = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart`);
      if (!response.ok) {
        throw new Error("failed to fetch");
        return response.json();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNewCart = async (cartItem) => {
    try {
      const response = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      });
      if (!response.ok) {
        throw new Error("Failed to add cart item");
      }
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllCart, addNewCart };
})();

export default cartApi;
