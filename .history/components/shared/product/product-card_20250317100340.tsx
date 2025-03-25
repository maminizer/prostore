import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader } from "@/components/ui/card";

const ProductCard = ({ product }: { product: any }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`}>
          <Image src={product.images[0]}></Image>
        </Link>
      </CardHeader>
    </Card>
  );
};

export default ProductCard;
