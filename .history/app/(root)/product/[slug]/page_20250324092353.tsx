const ProductDetailPage = (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  return <>details</>;
};

export default ProductDetailPage;
