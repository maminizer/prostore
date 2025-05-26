/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import ProductList from '@/components/shared/product/product-list';
import ProductCarousel from '@/components/shared/product/product-carousel';
import ViewAllProductsButton from '@/components/view-all-products-button';
import IconBoxes from '@/components/icon-boxes';
import DealCountdown from '@/components/deal-countdown';
import { useLanguage } from '@/lib/language-context';
import { useTranslation } from '@/lib/translations';
import { LATEST_PRODUCTS_LIMIT } from '@/lib/constants';

interface HomepageClientProps {
  latestProducts: any[];
  featuredProducts: any[];
}

const HomepageClient = ({ latestProducts, featuredProducts }: HomepageClientProps) => {
  const { currentLanguage } = useLanguage();
  const t = useTranslation(currentLanguage);

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList
        data={latestProducts}
        title={t('newestArrivals')}
        limit={LATEST_PRODUCTS_LIMIT}
      />
      <ViewAllProductsButton title={t('viewAllProducts')}/>
      <DealCountdown />
      <IconBoxes />
    </>
  );
};

export default HomepageClient;