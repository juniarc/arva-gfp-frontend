import "@/styles/detailProductpage.css";
import ImagesSectionDesktop from "./ImageSectionDesktop";
import ImagesSection from "@/interfaces/components/productDetailPage/ImagesSection";
import ProductInfo from "@/interfaces/components/productDetailPage/ProductInfo";
import ReviewSection from "@/interfaces/components/productDetailPage/ReviewSection";
import ShopInfo from "@/interfaces/components/productDetailPage/ShopInfo";
import ProductListByCategory from "@/interfaces/components/homepage/productListByCategory/ProductListByCategory";
import api from "@/services/api/api";
import uriHelpers from "@/utils/uriHelpers";
import React from "react";
import FloatingDrawer from "@/interfaces/components/productDetailPage/FloatingDrawer";
import { Product } from "@/types/types";
import ProductInfoDesktop from "./ProductInfoDesktop";
import ProductListByCategoryDesktop from "../../homepage/homeForDesktop/ProductListByCategoryDesktop";

interface ProductDetailPageProps {
  productDetail: Product;
  popularProducts: Product[];
  fruitProducts: Product[];
  dummyReviews: any;
}
export default function ProductDetailPageDesktop({ productDetail, popularProducts, fruitProducts, dummyReviews }: ProductDetailPageProps) {
  if (productDetail) {
    return (
      <main className="w-full px-[120px] py-20">
        <div className="w-full flex items-start gap-20">
          <div className="w-full max-w-[31%] sticky top-10">
            <section>
              <ImagesSectionDesktop imageUrl={productDetail.imageUrl} />
            </section>
          </div>
          <div>
            <section>
              <ProductInfoDesktop {...productDetail} shopLocation={productDetail.shop.location} />
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
            <ProductListByCategoryDesktop classname="grid-cols-5" products={fruitProducts} category={productDetail.shop.name} />
          </section>
          <section className="w-full mt-10">
            <ProductListByCategoryDesktop classname="grid-cols-5" products={popularProducts} category="Recommended" />
          </section>
        </div>
      </main>
    );
  }
}
