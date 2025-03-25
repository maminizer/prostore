import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";

const HomePage = async () => {
  return <>{sampleData.map()}</>;
};

export default HomePage;
