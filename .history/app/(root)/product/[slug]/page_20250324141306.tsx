import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardComponent } from "@/components/ui/card";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import { ProductPrice } from "@/components/shared/product/product-price";

const ProductDetailPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5"></div>
      </section>
    </>
  );
};

export default ProductDetailPage;
