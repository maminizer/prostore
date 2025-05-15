'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

// Sort options for the dropdown
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'lowest', label: 'Price: Low to High' },
  { value: 'highest', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' },
];

interface SortSelectorProps {
  currentSort: string;
  getFilterUrl: (params: { s?: string }) => string;
}

const SortSelector = ({ currentSort, getFilterUrl }: SortSelectorProps) => {
  const router = useRouter();

  const handleValueChange = (value: string) => {
    router.push(getFilterUrl({ s: value }));
  };

  return (
    <div className='flex items-center gap-2'>
      <span>Sort by</span>
      <Select defaultValue={currentSort} onValueChange={handleValueChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Sort by' />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortSelector;
