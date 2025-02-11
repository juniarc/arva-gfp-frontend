import { Product, Variant } from "@/types/types";
// import ProductItem, { productTest } from "../productsPage/ProductItem";
import ProductItem from "../homepage/productListByCategory/ProductItem";

interface ProductListProps {
  products: Product[];
  userId: number;
  token: string | undefined;
}

export default function ProductList({ products, userId, token }: ProductListProps) {
  // function mapProduct(original: Product): productTest {
  //   return {
  //     product_id: original.product_id,
  //     product_name: original.product_name,
  //     description: original.description,
  //     product_type: original.product_type,
  //     images: original.image,
  //     category: original.category,
  //     discounts: original.discount,
  //     ratings: original.ratings,
  //     shipping_cost: original.shipping_cost,
  //     shop: original.shop,
  //     sold: original.sold,
  //     variants: original.variant.map((variant: Variant) => ({
  //       price: variant.variant_price,
  //       product_id: original.product_id,
  //       stock: variant.variant_stock,
  //       unit: variant.variant_unit,
  //       variant_id: variant.variant_id,
  //       variant_name: variant.variant_name,
  //     })),
  //     status: original.status,
  //     created_at: original.created_at,
  //     tag: original.tag,
  //   };
  // }
  return (
    <div className="grid grid-cols-2 gap-5 tablet:grid-cols-3 desktop:grid-cols-5">
      {products.map((item, index) => (
        <ProductItem {...item} key={index} userId={userId} token={token} />
      ))}
    </div>
  );
}
