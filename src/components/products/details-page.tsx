import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { z } from 'zod';
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
import { useToast } from '../ui/use-toast';
import { validateFileSize } from './validators';

export const productSchema = z.object({
  title: z.string().min(2),
  inventory: z.coerce
    .string()
    .refine((v) => parseInt(v) > 0, 'Must be greater than 0'),
  price_consumer: z.coerce
    .string()
    .refine((v) => parseInt(v) > 0, 'Must be greater than 0'),
  price_supplier: z.coerce
    .string()
    .refine((v) => parseInt(v) > 0, 'Must be greater than 0'),
  image: z.any().refine((files) => validateFileSize(files, 50)),
});

export type Product = z.infer<typeof productSchema>;

const ProductDetailPage = () => {
  const [image, setImage] = useState<File>();
  const [imgUrl, setImgUrl] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: async () => {
      const response = await axios.get(
        'http://127.0.0.1:8000/store/products/' + params.id
      );

      return response.data;
    },
    mode: 'onChange',
  });

  const params = useParams();

  const onSubmit = async (data: Product) => {
    data = { ...data, image: image };
    const res = await axios.put(
      'http://127.0.0.1:8000/store/products/' + params.id + '/',
      data,
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt-token')}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    navigate('/products');
    toast({
      variant: 'default',
      description: `The product ${res.data.title} updated successfuly.`,
    });
  };

  return (
    <div className="container space-y-6">
      <div>
        <h3 className="text-lg font-medium">Change product</h3>
        <p className="text-sm text-muted-foreground">
          This is how your product will be.
        </p>
      </div>
      <div className="flex space-x-12">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-0 md:w-2/3 space-y-6 w-full"
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
                    <Input type="number" {...field}></Input>
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    The inventory of the product
                  </FormDescription>
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
                    <Input type="number" {...field}></Input>
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
                    <Input type="number" {...field}></Input>
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
                      /*FIXME: Two ways binding does not working well*/
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
              Save
            </Button>
          </form>
        </Form>

        <Card className="h-full hidden md:block overflow-hidden w-1/5">
          <CardHeader className="p-0">
            <img
              className="h-full w-full object-cover"
              src={form.getValues().image}
              alt={form.getValues().title}
            ></img>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailPage;
