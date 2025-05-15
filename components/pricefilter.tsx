'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

// Price range boundaries
const MIN_PRICE = 1;
const MAX_PRICE = 100000;

// Original price ranges (maintain for compatibility)
const priceRanges = [
  { name: '$1 to $50', value: '1-50' },
  { name: '$51 to $100', value: '51-100' },
  { name: '$101 to $200', value: '101-200' },
  { name: '$201 to $500', value: '201-500' },
  { name: '$501 to $1000', value: '501-1000' },
];

export default function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get all current search params
  const currentParams = new URLSearchParams(searchParams.toString());
  const currentPrice = searchParams.get('price') || 'all';

  // Parse price range for slider
  const [priceRange, setPriceRange] = useState<number[]>(() => {
    if (currentPrice === 'all') return [MIN_PRICE, MAX_PRICE];

    const [min, max] = currentPrice.split('-').map(Number);
    return [min, max];
  });

  // Create filter URL helper function (client-side version)
  const getFilterUrl = (newParams: { p?: string }) => {
    const updatedParams = new URLSearchParams(currentParams.toString());

    if (newParams.p) {
      updatedParams.set('price', newParams.p);
    }

    return `/search?${updatedParams.toString()}`;
  };

  // Update URL when price range changes
  const handlePriceChange = (newRange: number[]) => {
    setPriceRange(newRange);
  };

  // Apply price filter after slider interaction is complete
  const applyPriceFilter = () => {
    const newPriceParam = `${priceRange[0]}-${priceRange[1]}`;

    // Find if this exactly matches one of our predefined ranges
    const matchedRange = priceRanges.find((p) => p.value === newPriceParam);

    // Use the matched range or custom range
    const rangeToUse = matchedRange ? matchedRange.value : newPriceParam;

    // Navigate to filtered URL
    router.push(getFilterUrl({ p: rangeToUse }));
  };

  // Reset price filter
  const resetPrice = () => {
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    router.push(getFilterUrl({ p: 'all' }));
  };

  // Update local state when URL changes externally
  useEffect(() => {
    if (currentPrice === 'all') {
      setPriceRange([MIN_PRICE, MAX_PRICE]);
    } else {
      const [min, max] = currentPrice.split('-').map(Number);
      setPriceRange([min, max]);
    }
  }, [currentPrice]);

  return (
    <>
      <div className='text-xl mb-2 mt-8'>Price</div>
      <div className='py-3 px-1'>
        <div className='mb-6'>
          <Slider
            value={priceRange}
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={10}
            onValueChange={handlePriceChange}
            onValueCommit={applyPriceFilter}
            className='w-full'
          />
          <div className='flex justify-between mt-2 text-sm text-gray-600'>
            <span>€{priceRange[0]}</span>
            <span>€{priceRange[1]}</span>
          </div>
        </div>

        <div className='flex flex-col space-y-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={resetPrice}
            className={`text-sm w-full justify-start ${currentPrice === 'all' ? 'font-bold' : ''}`}
          >
            Any price
          </Button>
        </div>
      </div>
    </>
  );
}
