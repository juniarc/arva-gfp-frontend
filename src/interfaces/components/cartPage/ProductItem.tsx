import { Checkbox } from "@material-tailwind/react";
import Image from "next/image";
import Foto from "@/../public/images/dummy-photo-product.jpg";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { LuMinus, LuPlus } from "react-icons/lu";
import { CartItem } from "@/types/types";

interface ProductItemProps {
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
  checkedProducts: { [key: number]: boolean };
  cart: CartItem[];
  handleProductCheckboxChange: (productId: number, checked: boolean) => void;
  handleQuantityChange: (productId: number, newQuantity: number, maxStock: number) => void;
}

export default function ProductItem({
  id,
  userId,
  product,
  shop,
  selectedVariant,
  quantity,
  checkedProducts,
  cart,
  handleProductCheckboxChange,
  handleQuantityChange,
}: ProductItemProps) {
  const cartItem = cart.find((item) => item.id === id);
  const currentQuantity = cartItem ? cartItem.quantity : quantity;
  return (
    <div className="mt-5 flex items-start gap-5 w-full min-w-full">
      <div className="p-0">
        <Checkbox
          color="blue"
          checked={checkedProducts[id]}
          onChange={(e) => handleProductCheckboxChange(id, e.target.checked)}
          crossOrigin={undefined}
          className="w-10 h-10"
        />
      </div>
      <div className="w-full">
        <div className="pt-3 flex items-start gap-5 w-full">
          <div className="w-30 h-30 min-w-30 min-h-30">
            <Image
              src={Foto}
              width={60}
              height={30}
              className="w-full h-full overflow-hidden object-cover object-center rounded-lg"
              alt="Product image"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <p className="text-dark-gray truncate max-w-[240px]">{product.name}</p>
            <p className="text-xs text-dark-gray">{selectedVariant.variantName}</p>
            <p className="font-semibold">Rp. {selectedVariant.price}</p>
            <div className="flex items-center justify-between mt-5 w-full">
              <button className="text-dark-gray text-xl">
                <FaRegHeart />
              </button>
              <div className="text-dark-gray flex items-center border-solid border-gray border w-fit rounded-lg py-1 px-5">
                <button
                  onClick={() => {
                    handleQuantityChange(id, currentQuantity - 1, product.stocks);
                  }}
                >
                  <LuMinus />
                </button>
                <input
                  type="number"
                  minLength={1}
                  maxLength={product.stocks}
                  value={currentQuantity}
                  onChange={(e) => {
                    const newQuantity = Number(e.target.value);
                    if (!isNaN(newQuantity)) {
                      handleQuantityChange(id, newQuantity, product.stocks);
                    }
                  }}
                  className="w-30 text-center text-black"
                />
                <button
                  onClick={() => {
                    handleQuantityChange(id, currentQuantity + 1, product.stocks);
                  }}
                  disabled={quantity >= product.stocks}
                >
                  <LuPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
