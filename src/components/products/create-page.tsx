import axios from 'axios';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardHeader } from '../ui/card';
import { Product, productSchema } from './details-page';
import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';

const CreateProductPage = () => {
  const [image, setImage] = useState<File>();
  const [imgUrl, setImgUrl] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      inventory: '',
      price_consumer: '',
      price_supplier: '',
    },
    mode: 'onChange',
  });

  return (
    <div className="flex space-x-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data: Product) => {
            data = { ...data, image: image };
            axios
              .post('http://127.0.0.1:8000/store/products/', data, {
                headers: {
                  Authorization: `JWT ${localStorage.getItem('jwt-token')}`,
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then((res) => {
                navigate('/products');
                toast({
                  variant: 'destructive',
                  description: `The product ${res.data.title} saved successfuly.`,
                });
              })
              .catch((err) => console.log(err.message));
          })}
          className="container m-0 md:w-2/3 space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tilte</FormLabel>
                <FormControl>
                  <Input type="text" required {...field}></Input>
                </FormControl>
                <FormMessage />
                <FormDescription>
                  The display name of the product
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inventory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inventory</FormLabel>
                <FormControl>
                  <Input type="number" required {...field}></Input>
                </FormControl>
                <FormMessage />
                <FormDescription>The inventory of the product</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price_consumer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price consumer</FormLabel>
                <FormControl>
                  <Input type="number" required {...field}></Input>
                </FormControl>
                <FormMessage />
                <FormDescription>
                  The product price for consumers
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price_supplier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price supplier</FormLabel>
                <FormControl>
                  <Input type="number" required {...field}></Input>
                </FormControl>
                <FormMessage />
                <FormDescription>
                  The product price for retailers
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...field}
                    onChange={(e) => {
                      if (e.target.files) {
                        setImage(e.target.files[0]);
                        if (image instanceof File) {
                          const url = URL.createObjectURL(e.target.files[0]);
                          setImgUrl(url);
                        }
                      }
                    }}
                  ></Input>
                </FormControl>
                <FormMessage />
                <FormDescription>The product image displayed</FormDescription>
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting ? true : false}
            type="submit"
          >
            Update
          </Button>
        </form>
      </Form>

      {imgUrl && (
        <Card className="h-full hidden md:block overflow-hidden w-1/5">
          <CardHeader className="p-0">
            <img className="h-full w-full object-cover" src={imgUrl}></img>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default CreateProductPage;
