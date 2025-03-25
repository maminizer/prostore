import { cn } from "@/lib/utils";

const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  // ensure two deciaml places
  const stringValue = value.toFixed(2);
  const [intValue, floatValue] = stringValue.split(".");
  return (
    <p className={cn("text-2xl", className)}>
      <span className="text-ws align-super">$</span>
      {intValue}
      <span className="text-ws align-super">.{floatValue}</span>
    </p>
  );
};

export default ProductPrice;
