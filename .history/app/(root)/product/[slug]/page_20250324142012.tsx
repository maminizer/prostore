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
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Image Column */}
          <div className="col-span-2">{/* Image component */}</div>
          {/* Details Column */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>
              <p>
                {product.rating} of {product.numReviews} reviews
              </p>
              .flex.flex-col.gap-3.sm:flex-ro
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailPage;
