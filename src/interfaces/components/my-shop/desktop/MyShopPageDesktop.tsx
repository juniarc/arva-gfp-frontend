import LineDivider from "../../dividers/LineDivider";
import ProductList from "../ProductList";
import ShopInfoDesktop from "./ShopInfoDesktop";
import { Product, ReqShopBody, ShopDetail, Voucher } from "@/types/types";
import { ManageProductValuesProps } from "../../modals/ManageProductModal";
import VoucherSection from "../VoucherSection";

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
export default function MyShopPageDesktop({
  shop,
  totalRatings,
  averageRatings,
  editShopStatus,
  handleEditShop,
  handleSubmit,
  manageProductStatus,
  token,
  getUpdateProductList,
  products,
  vouchers,
}: ShopPageProps) {
  return (
    <main className="min-h-[90vh] px-[120px] py-20">
      <section>
        <ShopInfoDesktop
          editShopStatus={editShopStatus}
          {...shop}
          totalProducts={products.length}
          totalRatings={10}
          averageRatings={20}
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
    </main>
  );
}
