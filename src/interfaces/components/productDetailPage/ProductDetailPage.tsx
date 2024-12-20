import "@/styles/detailProductpage.css";
import ImagesSection from "@/interfaces/components/productDetailPage/ImagesSection";
import ProductInfo from "@/interfaces/components/productDetailPage/ProductInfo";
import ReviewSection from "@/interfaces/components/productDetailPage/ReviewSection";
import ShopInfo from "@/interfaces/components/productDetailPage/ShopInfo";
import ProductListByCategory from "@/interfaces/components/homepage/productListByCategory/ProductListByCategory";
import React from "react";
import FloatingDrawer from "@/interfaces/components/productDetailPage/FloatingDrawer";
import { Product, ProductDetail } from "@/types/types";

interface ProductDetailPageProps {
  productDetail: ProductDetail;
  anotherShopProducts: Product[];
  categoryProducts: Product[];
  dummyReviews: any;
  isWishlist: boolean;
  token: string | undefined;
  wishlistId: number;
}
export default function ProductDetailPage({
  productDetail,
  dummyReviews,
  anotherShopProducts,
  categoryProducts,
  isWishlist,
  token,
  wishlistId,
}: ProductDetailPageProps) {
  if (productDetail) {
    return (
      <main className="w-full">
        <section className="w-full">
          <ImagesSection image={productDetail.image} />
        </section>
        <section>
          <ProductInfo {...productDetail} isWishlist={isWishlist} />
        </section>
        <section>
          <ShopInfo {...productDetail.shop} />
        </section>
        <section>
          <ReviewSection reviews={dummyReviews} />
        </section>
        <section className="w-full">
          <ProductListByCategory products={anotherShopProducts} category={productDetail.shop.shop_name} />
        </section>
        <section className="w-full">
          <ProductListByCategory products={categoryProducts} category="Fruit" />
        </section>
        <FloatingDrawer
          product_id={productDetail.product_id}
          category={productDetail.category}
          image={productDetail.image[0].image_data}
          product_name={productDetail.product_name}
          discount={productDetail.discount}
          variant={productDetail.variant}
          ratings={productDetail.ratings}
          tag={productDetail.tag}
          sold={productDetail.sold}
          shop={productDetail.shop}
          shipping_cost={productDetail.shipping_cost}
          isWishlist={isWishlist}
          token={token}
          wishlistId={wishlistId}
        />
      </main>
    );
  }
}
