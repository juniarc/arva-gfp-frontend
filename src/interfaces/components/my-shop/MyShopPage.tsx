import ShopInfo from "./ShopInfo";
import ProductList from "./ProductList";
import { Product, ReqShopBody, ShopDetail, Voucher } from "@/types/types";
import SuccessAlert from "../alerts/SuccessAlert";
import FailAlert from "../alerts/FailAlert";
import { ManageProductValuesProps } from "../modals/ManageProductModal";
import VoucherSection from "./VoucherSection";
import LineDivider from "../dividers/LineDivider";

interface ShopPageProps {
  shop: ShopDetail;
  totalRatings: number;
  averageRatings: number;
  handleEditShop: (value: ReqShopBody) => void;
  products: Product[];
  editShopStatus: "idle" | "loading" | "success" | "error";
  handleSubmit: (values: ManageProductValuesProps) => void;
  manageProductStatus: "idle" | "loading" | "success" | "error";
  token: string | undefined;
  getUpdateProductList: () => void;
  vouchers: Voucher[];
}
export default function MyShopPage({
  shop,
  totalRatings,
  averageRatings,
  handleEditShop,
  products,
  editShopStatus,
  handleSubmit,
  manageProductStatus,
  token,
  vouchers,
  getUpdateProductList,
}: ShopPageProps) {
  return (
    <main className="min-h-[90vh] p-10 tablet:p-15 desktop:px-[120px] desktop:pt-20">
      <section>
        <ShopInfo
          editShopStatus={editShopStatus}
          {...shop}
          totalProducts={products.length}
          totalRatings={totalRatings}
          averageRatings={averageRatings}
          handleEditShop={handleEditShop}
        />
      </section>
      <section className="mt-10">
        <VoucherSection vouchers={vouchers} token={token} shop_id={shop.shop_id} />
      </section>
      <LineDivider className="my-10" />
      <section className="mt-10">
        <ProductList
          handleSubmit={handleSubmit}
          products={products}
          manageProductStatus={manageProductStatus}
          token={token}
          getUpdateProductList={getUpdateProductList}
        />
      </section>
      <SuccessAlert isOpen={editShopStatus === "success" || manageProductStatus === "success"} text="Success Update Shop" />
      <FailAlert isOpen={editShopStatus === "error" || manageProductStatus === "error"} text="Failed" />
    </main>
  );
}
