'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const sortOrders = [
  { value: 'newest', label: 'Newest' },
  { value: 'lowest', label: 'Lowest Price' },
  { value: 'highest', label: 'Highest Price' },
  { value: 'rating', label: 'Customer Rating' },
];

const SortFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || 'newest';

  // Handle selection change
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className='flex items-center space-x-2'>
      <span>Sort by</span>
      <Select value={sort} onValueChange={handleSortChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Sort by' />
        </SelectTrigger>
        <SelectContent>
          {sortOrders.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortFilter;
