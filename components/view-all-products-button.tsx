/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from './ui/button';
import Link from 'next/link';

const ViewAllProductsButton = ({title}:any) => {
  return (
    <div className='flex justify-center items-center my-8'>
      <Button asChild className='px-8 py-4 text-lg font-semibold'>
        <Link href='/search'>{title}</Link>
      </Button>
    </div>
  );
};

export default ViewAllProductsButton;
