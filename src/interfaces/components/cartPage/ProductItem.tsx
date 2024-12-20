import { Checkbox } from "@material-tailwind/react";
import Image from "next/image";
import { LuMinus, LuPlus } from "react-icons/lu";
import { CartItem } from "@/types/types";
import { useMemo } from "react";
import { currencyFormater } from "@/utils/elementHelpers";

interface ProductItemProps extends CartItem {
  checkedProducts: { [key: number]: boolean };
  cart: CartItem[];
  handleProductCheckboxChange: (productId: number, checked: boolean) => void;
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
  checkedProducts,
  cart,
  discount,
  handleProductCheckboxChange,
  handleQuantityChange,
}: ProductItemProps) {
  const cartItem = cart.find((item) => item.product_id === product_id);
  const currentQuantity = cartItem ? cartItem.quantity : quantity;

  const discountValue = useMemo(() => discount?.find((item) => item.discount_type === "percentage"), [discount]);
  const priceAfterDiscount = useMemo(() => {
    if (!discountValue) return selectedVariant?.variant_price ?? 0;

    const discountPrice = ((selectedVariant?.variant_price ?? 0) * discountValue.discount_value) / 100;
    return (selectedVariant?.variant_price ?? 0) - discountPrice;
  }, [selectedVariant, discountValue]);

  const formatedPriceDiscount = currencyFormater.format(priceAfterDiscount);

  return (
    <div className="mt-5 flex items-start gap-5 w-full min-w-full">
      <div className="p-0">
        <Checkbox
          color="blue"
          checked={checkedProducts[product_id]}
          onChange={(e) => handleProductCheckboxChange(product_id, e.target.checked)}
          crossOrigin={undefined}
          className="w-10 h-10 tablet:w-20 tablet:h-20"
        />
      </div>
      <div className="w-full">
        <div className="pt-3 flex items-start gap-5 tablet:gap-10 desktop:gap-10 w-full">
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
            <div className="flex items-center justify-end mt-5 desktop:mt-10 w-full">
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
                  className="w-30 tablet:w-40 desktop:w-36 bg-transparent text-center text-black tablet:text-[1.375rem] desktop:text-[1.375rem]"
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
    </div>
  );
}
