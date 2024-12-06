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

const dummyReviews = [
  {
    name: "John Doe",
    rating: 4,
    review:
      "The product exceeded my expectations! It's not only functional but also aesthetically pleasing. Every detail is well-crafted, and I especially appreciate the fast customer service that addressed my queries promptly. Highly recommended to anyone in the market for this kind of product.",
    date: "2023-07-31",
    imageUrl: "https://fastly.picsum.photos/id/576/200/200.jpg?hmac=pkNsIvSErgVpup1XYfj_NAE5ySK9YL7DmYlGGTTjScw",
  },
  {
    name: "Jane Doe",
    rating: 5,
    review:
      "Everything from the ordering process to the delivery was seamless. The product arrived quickly and was packaged securely, ensuring it was in perfect condition upon arrival. The quality is top-notch, and it has become an indispensable part of my daily routine. Thank you for such a great product!",
    date: "2023-08-01",
    imageUrl: "https://fastly.picsum.photos/id/576/200/200.jpg?hmac=pkNsIvSErgVpup1XYfj_NAE5ySK9YL7DmYlGGTTjScw",
  },
  {
    name: "Bob Smith",
    rating: 3,
    review:
      "While the product itself is satisfactory and functions as described, the shipping duration was longer than anticipated. I would have appreciated better communication regarding the delivery timeline. Nonetheless, the product meets my needs, and I hope future orders will arrive more promptly.",
    date: "2023-08-02",
    imageUrl: "https://fastly.picsum.photos/id/576/200/200.jpg?hmac=pkNsIvSErgVpup1XYfj_NAE5ySK9YL7DmYlGGTTjScw",
  },
  {
    name: "Alice Brown",
    rating: 5,
    review:
      "I absolutely adore this product! It's not only beautiful but also of high quality. It seamlessly integrates into my lifestyle, and I've received numerous compliments on it. The craftsmanship is evident, and it's clear that the creators put a lot of thought into its design. I couldn't be happier with my purchase.",
    date: "2023-08-03",
    imageUrl: "https://fastly.picsum.photos/id/576/200/200.jpg?hmac=pkNsIvSErgVpup1XYfj_NAE5ySK9YL7DmYlGGTTjScw",
  },
];
export async function generateMetadata({ params }: { params: Promise<{ productInfo: string }> }) {
  const urlName = (await params).productInfo;
  const rawProductName = urlName.replace(/-\d+$/, ""); // Menghapus `-id` dari akhir string
  const name = uriHelpers.formatUrlToString(rawProductName);
  return {
    title: `${name} - Arva`,
    description: `Explore our premium collection of ${name} on Arva.`,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ productInfo: string; shopName: string }> }) {
  const urlName = (await params).productInfo;
  const idMatch = urlName.match(/-(\d+)$/);
  const id = idMatch ? idMatch[1] : null;
  const product = await api.getProductById(1);
  const popularProducts = (await api.getAllProducts(6)) || [];
  const fruitProducts = (await api.getAllProductsByCategory("fruit", 6)) || [];
  if (product) {
    return (
      <main className="w-full">
        <section className="w-full">
          <ImagesSection imageUrl={product.imageUrl} />
        </section>
        <section>
          <ProductInfo {...product} shopLocation={product.shop.location} />
        </section>
        <section>
          <ShopInfo {...product.shop} />
        </section>
        <section>
          <ReviewSection reviews={dummyReviews} />
        </section>
        <section className="w-full">
          <ProductListByCategory products={fruitProducts} category={product.shop.name} />
        </section>
        <section className="w-full">
          <ProductListByCategory products={popularProducts} category="Recommended" />
        </section>
        <FloatingDrawer
          id={product.id}
          category={product.category}
          imageUrl={product.imageUrl}
          name={product.name}
          price={product.price}
          discount={product.discount}
          unit={product.unit}
          stocks={product.stocks}
          variants={product.variants}
        />
      </main>
    );
  }
}
