import {
  getLatestProducts,
  getFeaturedProducts,
} from '@/lib/actions/product.actions';
import HomepageClient from '@/components/homepage-client';

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();
  
  return (
    <HomepageClient 
      latestProducts={latestProducts}
      featuredProducts={featuredProducts}
    />
  );
};

export default Homepage;