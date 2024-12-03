import ImagesSection from "@/interfaces/components/productDetailPage/ImagesSection";
import api from "@/services/api/api";
import uriHelpers from "@/utils/uriHelpers";
import React from "react";

export async function generateMetadata({ params }: { params: Promise<{ productName: string; shopName: string }> }) {
  const urlName = (await params).productName;
  const name = uriHelpers.formatUrlToString(urlName);
  return {
    title: `${name} - Arva`,
    description: `Explore our premium collection of ${name} on Arva.`,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ productName: string; shopName: string }> }) {
  const product = await api.getProductById(1);
  if (product) {
    return (
      <main>
        <section className="w-full">
          <ImagesSection imageUrl={product.imageUrl} />
        </section>
      </main>
    );
  }
}
