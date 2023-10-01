import axios from 'axios';
import { Product, columns } from './columns';
import { DataTable } from './data-table';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Toaster } from '../ui/toaster';

function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/store/products', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt-token')}`,
        },
      })
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      {isLoading && (
        <div className="container mx-auto py-10 space-y-4">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <div className="flex items-center justify-end space-x-2 py-4">
            <Skeleton className="w-10 h-7" />
            <Skeleton className="w-10 h-7" />
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col container">
          <DataTable columns={columns} data={products} />
        </div>
      )}
      <Toaster />
    </>
  );
}

export default ProductPage;
