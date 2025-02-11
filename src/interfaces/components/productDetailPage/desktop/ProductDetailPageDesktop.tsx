import "@/styles/detailProductpage.css";
import ImagesSectionDesktop from "./ImageSectionDesktop";
import ReviewSection from "@/interfaces/components/productDetailPage/ReviewSection";
import ShopInfo from "@/interfaces/components/productDetailPage/ShopInfo";
import React from "react";
import { Product, ProductDetail } from "@/types/types";
import ProductInfoDesktop from "./ProductInfoDesktop";
import ProductListByCategoryDesktop from "../../homepage/homeForDesktop/ProductListByCategoryDesktop";

interface ProductDetailPageProps {
  productDetail: ProductDetail;
  anotherShopProducts: Product[];
  categoryProducts: Product[];
  dummyReviews: any;
  wishlistId: number;
  isWishlist: boolean;
  token: string | undefined;
  userId: number;
}
export default function ProductDetailPageDesktop({
  productDetail,
  dummyReviews,
  anotherShopProducts,
  categoryProducts,
  isWishlist,
  wishlistId,
  token,
  userId,
}: ProductDetailPageProps) {
  if (productDetail) {
    return (
      <main className="w-full px-[120px] py-20">
        <div className="w-full flex items-start gap-20">
          <div className="w-full max-w-[31%] sticky top-10">
            <section>
              <ImagesSectionDesktop image={productDetail.image} />
            </section>
          </div>
          <div>
            <section>
              <ProductInfoDesktop userId={userId} {...productDetail} isWishlist={isWishlist} token={token} wishlistId={wishlistId} />
            </section>
            <section className="mt-10">
              <ShopInfo {...productDetail.shop} />
            </section>
            <section className="mt-10">
              <ReviewSection reviews={dummyReviews} />
            </section>
          </div>
        </div>
        <div className="mt-10">
          <section className="w-full">
            <ProductListByCategoryDesktop
              userId={userId}
              classname="grid-cols-5"
              products={anotherShopProducts}
              category={productDetail.shop.shop_name}
              token={token}
            />
          </section>
          <section className="w-full mt-10">
            <ProductListByCategoryDesktop userId={userId} classname="grid-cols-5" products={categoryProducts} category="Fruit" token={token} />
          </section>
        </div>
      </main>
    );
  }
}
