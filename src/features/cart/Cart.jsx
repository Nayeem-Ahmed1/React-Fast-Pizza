import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';
import Button from '../../ui/Button';
import EmptyCart from './EmptyCart';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart } from './cartSlice';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  function handleEmptyCart() {
    dispatch(emptyCart());
  }

  if (cart?.length < 1) {
    return <EmptyCart />;
  }

  return (
    <div>
      <LinkButton to="/menu" type="smLink">
        &larr; Back to Menu
      </LinkButton>

      <h2 className="ml-2 text-xl font-bold uppercase">Your cart,{username}</h2>

      <ul className="mb-5 ml-2 mt-8 divide-y-2">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="ml-2">
        <LinkButton to="/order/new" type="primary">
          Order Pizzas
        </LinkButton>
        <Button type="limitedBtn" onClick={handleEmptyCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
