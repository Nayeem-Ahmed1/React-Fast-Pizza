import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from './../features/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';
import { useSelector } from 'react-redux';

function AppLayout() {
  const loadingState = useNavigation();
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {loadingState.state === 'loading' && <Loader />}

      <Header />

      <div className="overflow-auto">
        <main className="mx-auto mt-4 max-w-3xl">
          <Outlet />
        </main>
      </div>

      {cart?.length > 0 && <CartOverview />}
    </div>
  );
}

export default AppLayout;
