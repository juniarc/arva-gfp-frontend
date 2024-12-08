import "@/styles/detailProductpage.css";
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

interface ProductDetailPageProps {
  productDetail: Product;
  popularProducts: Product[];
  fruitProducts: Product[];
  dummyReviews: any;
}
export default function ProductDetailPage({ productDetail, popularProducts, fruitProducts, dummyReviews }: ProductDetailPageProps) {
  if (productDetail) {
    return (
      <main className="w-full">
        <section className="w-full">
          <ImagesSection imageUrl={productDetail.imageUrl} />
        </section>
        <section>
          <ProductInfo {...productDetail} shopLocation={productDetail.shop.location} />
        </section>
        <section>
          <ShopInfo {...productDetail.shop} />
        </section>
        <section>
          <ReviewSection reviews={dummyReviews} />
        </section>
        <section className="w-full">
          <ProductListByCategory products={fruitProducts} category={productDetail.shop.name} />
        </section>
        <section className="w-full">
          <ProductListByCategory products={popularProducts} category="Recommended" />
        </section>
        <FloatingDrawer
          id={productDetail.id}
          category={productDetail.category}
          imageUrl={productDetail.imageUrl}
          name={productDetail.name}
          price={productDetail.price}
          discount={productDetail.discount}
          unit={productDetail.unit}
          stocks={productDetail.stocks}
          variants={productDetail.variants}
        />
      </main>
    );
  }
}
