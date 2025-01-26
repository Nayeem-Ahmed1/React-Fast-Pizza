import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { menuLoader } from './features/menu/Menu';
import Home from './ui/Home';
import Menu from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order, { orderLoader } from './features/order/Order';
import CreateOrder, { formAction } from './features/order/CreateOrder';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import { priorityAction } from './ui/PriorityBtn';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/menu', element: <Menu />, loader: menuLoader },
      { path: 'cart', element: <Cart /> },
      { path: '/order/new', element: <CreateOrder />, action: formAction },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        action: priorityAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
