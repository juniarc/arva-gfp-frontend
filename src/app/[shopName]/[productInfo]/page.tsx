import "@/styles/detailProductpage.css";
import { cookies } from "next/headers";
import api from "@/services/api/api";
import uriHelpers from "@/utils/uriHelpers";
import ProductDetailPage from "@/interfaces/components/productDetailPage/ProductDetailPage";
import ProductDetailPageDesktop from "@/interfaces/components/productDetailPage/desktop/ProductDetailPageDesktop";
import { convertCategoryNameToId } from "@/utils/elementHelpers";

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

export default async function Page({ params }: { params: Promise<{ productInfo: string; shopName: string }> }) {
  const cookiesList = await cookies();
  const viewport = cookiesList.get("viewport")?.value || undefined;
  const userId = cookiesList.get("userId")?.value || undefined;
  const token = cookiesList.get("token")?.value || undefined;

  const allWishList = await api.allWishlist();

  const urlName = (await params).productInfo;
  const idMatch = urlName.match(/-(\d+)$/);
  const productId = idMatch ? idMatch[1] : null;
  const categoryId = convertCategoryNameToId("fruits");

  const detailProduct = await api.getDetailProductById(Number(productId));

  const [anotherShopProducts, categoryProducts] = await Promise.all([
    api.getProductByShopId(detailProduct.shop.shop_id),
    api.getAllProductsByCategory(categoryId),
  ]);

  let wisthlist = false;
  let wishlistId = 0;

  if (detailProduct) {
    allWishList.map((item: any) => {
      if (item.product_id === detailProduct.product_id && item.user_id === Number(userId)) {
        wisthlist = true;
        wishlistId = item.wishlist_id;
      }
    });
  }

  if (detailProduct) {
    if (viewport === "mobile") {
      return (
        <ProductDetailPage
          productDetail={detailProduct}
          dummyReviews={dummyReviews}
          anotherShopProducts={[]}
          categoryProducts={[]}
          isWishlist={wisthlist}
          token={token}
          wishlistId={wishlistId}
          userId={Number(userId)}
        />
      );
    }
    return (
      <ProductDetailPageDesktop
        productDetail={detailProduct}
        dummyReviews={dummyReviews}
        anotherShopProducts={[]}
        categoryProducts={[]}
        isWishlist={wisthlist}
        token={token}
        wishlistId={wishlistId}
        userId={Number(userId)}
      />
    );
  }
}
