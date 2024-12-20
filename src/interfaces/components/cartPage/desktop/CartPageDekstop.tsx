import ProductList from "../ProductList";
import LineDivider from "../../dividers/LineDivider";
import { CartItem } from "@/types/types";
interface CartPageProps {
  checkedShops: { [key: number]: boolean };
  checkedProducts: { [key: number]: boolean };
  handleShopCheckboxChange: (shop_id: number, checked: boolean) => void;
  handleProductCheckboxChange: (product_id: number, checked: boolean) => void;
  handleQuantityChange: (product_id: number, newQuantity: number, maxStock: number) => void;
  separatedByShop: { [shop_id: number]: { products: CartItem[]; shop_name: string } };
  handleBtnCO: () => void;
  totalPrice: number;
  totalItems: number;
  handleDeleteCart: (cartId: number) => void;
}

export default function CartPageDesktop({
  separatedByShop,
  checkedProducts,
  checkedShops,
  totalItems,
  totalPrice,
  handleProductCheckboxChange,
  handleShopCheckboxChange,
  handleBtnCO,
  handleQuantityChange,
  handleDeleteCart,
}: CartPageProps) {
  return (
    <main className="px-[120px] py-20">
      <div className="flex items-start justify-between gap-20">
        <div className="w-full">
          <h1 className="text-primary text-[2.25rem]">Your Cart</h1>
          <div className="flex items-center justify-between mt-10 border-b border-b-gray pb-10 tablet:pb-10">
            <p>{totalItems} items selected</p>
            <button className=" text-red font-semibold">Delete</button>
          </div>
          <div className="mt-10">
            {Object.entries(separatedByShop).map(([shop_id, shop], index) => (
              <div key={index}>
                <ProductList
                  checkedShops={checkedShops}
                  shop_id={Number(shop_id)}
                  handleShopCheckboxChange={handleShopCheckboxChange}
                  shop={shop}
                  handleProductCheckboxChange={handleProductCheckboxChange}
                  checkedProducts={checkedProducts}
                  handleQuantityChange={handleQuantityChange}
                  handleDeleteCart={handleDeleteCart}
                />
                <LineDivider className="mt-10 mb-5 tablet:my-10" />
              </div>
            ))}
          </div>
        </div>
        <div className="min-w-[382px] shadow-lg rounded-lg p-10 flex flex-col items-center">
          <h2 className="mb-20">Cart Summary</h2>
          <div className="flex items-center justify-between w-full mb-10">
            <p className="text-dark-gray">Total: </p>
            <p className="font-semibold text-[1.375rem]">Rp. {totalPrice}</p>
          </div>
          <button className="bg-primary rounded-lg py-3 px-20 text-white font-semibold w-full text-[1.375rem]" onClick={handleBtnCO}>
            Buy
          </button>
        </div>
      </div>
    </main>
  );
}
