import { LuMinus, LuPlus } from "react-icons/lu";
import { CartItem } from "@/types/types";
import Image from "next/image";
import { currencyFormater } from "@/utils/elementHelpers";
interface ProductItemProps extends CartItem {
  cart: CartItem[];
  handleQuantityChange: (productId: number, newQuantity: number, maxStock: number) => void;
}
export default function ProductItem({
  product_id,
  user_id,
  product_name,
  shop,
  image,
  selectedVariant,
  quantity,
  cart,
  discount,
  handleQuantityChange,
}: ProductItemProps) {
  const cartItem = cart.find((item) => item.product_id === product_id);
  const currentQuantity = cartItem ? cartItem.quantity : quantity;
  const price = cartItem ? cartItem.priceAfterDiscount * currentQuantity : selectedVariant.variant_price * currentQuantity;
  const formatedPriceDiscount = currencyFormater.format(price);

  return (
    <div className="w-full mb-10">
      <div className=" flex items-start gap-5 w-full">
        <div className="w-30 h-30 tablet:w-[122px] tablet:h-[122px] desktop:w-[126px] desktop:h-[126px] tablet:min-w-[122px] tablet:min-h-[122px] desktop:min-w-[126px] desktop:min-h-[126px] min-w-30 min-h-30">
          <Image
            src={image}
            width={126}
            height={126}
            className="w-full h-full overflow-hidden object-cover object-center rounded-lg"
            alt="Product image"
          />
        </div>
        <div className="flex flex-col gap-3 tablet:gap-5 desktop:gap-5 w-full ">
          <p className=" truncate max-w-[240px]">{product_name}</p>
          <p className="text-xs tablet:text-sm desktop:text-base text-dark-gray">{selectedVariant.variant_name}</p>
          <p className="font-semibold tablet:text-[1.375rem] desktop:text-2xl">{formatedPriceDiscount}</p>
          <div className="flex items-center justify-end mt-5 w-full">
            <div className="text-dark-gray flex items-center border-solid border-gray border w-fit rounded-lg py-1 px-5 tablet:py-3 tablet:px-10 desktop:px-10 desktop:py-3">
              <button
                onClick={() => {
                  handleQuantityChange(product_id, currentQuantity - 1, selectedVariant.variant_stock);
                }}
                className="tablet:text-[1.375rem]"
              >
                <LuMinus />
              </button>
              <input
                type="number"
                minLength={1}
                maxLength={selectedVariant.variant_stock}
                value={currentQuantity}
                onChange={(e) => {
                  const newQuantity = Number(e.target.value);
                  if (!isNaN(newQuantity)) {
                    handleQuantityChange(product_id, newQuantity, selectedVariant.variant_stock);
                  }
                }}
                className="w-30 tablet:w-40 desktop:w-36 text-center bg-transparent text-black tablet:text-[1.375rem] desktop:text-[1.375rem]"
                disabled
              />
              <button
                onClick={() => {
                  handleQuantityChange(product_id, currentQuantity + 1, selectedVariant.variant_stock);
                }}
                disabled={quantity >= selectedVariant.variant_stock}
                className="tablet:text-[1.375rem]"
              >
                <LuPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
