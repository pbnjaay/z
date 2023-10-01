import CustomerDetailsPage from '@/components/customers/details-page';
import CustomerPage from '@/components/customers/page';
import DashBoardPage from '@/components/dashboard-page';
import ErrorPage from '@/components/error-page';
import HomePage from '@/components/home-page';
import LoginForm from '@/components/login-page';
import OrderDetailsPage from '@/components/orders/details-page';
import OrderPage from '@/components/orders/page';
import CreateProductPage from '@/components/products/create-page';
import ProductDetailPage from '@/components/products/details-page';
import ProductPage from '@/components/products/page';
import SubscriptionsDetailsPage from '@/components/subscriptions/details-page';
import SubscriptionsPage from '@/components/subscriptions/page';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      { path: 'products', element: <ProductPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'products/create', element: <CreateProductPage /> },
      { path: 'customers', element: <CustomerPage /> },
      { path: 'customers/:id', element: <CustomerDetailsPage /> },
      { path: 'subscriptions', element: <SubscriptionsPage /> },
      { path: 'subscriptions/:id', element: <SubscriptionsDetailsPage /> },
      { path: 'orders', element: <OrderPage /> },
      { path: 'orders/:id', element: <OrderDetailsPage /> },
      { path: 'dashboard', element: <DashBoardPage /> },
    ],
    errorElement: <ErrorPage />,
  },
  { path: '/login', element: <LoginForm /> },
]);

export default router;
