import { useSelector } from 'react-redux';
import CreateUser from './../features/user/CreateUser';

function Home() {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className="my-10 text-center">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      <CreateUser />
      {cart.length < 1 && (
        <p className="text-md absolute bottom-0 left-0 right-0 m-auto font-bold">
          Made with coffee©Nayeem
        </p>
      )}
    </div>
  );
}

export default Home;
