import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import {
  addCart,
  decreaseQuantity,
  deleteCart,
  getDuplicateOrder,
  increaseQuantity,
} from '../cart/cartSlice';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, quantity, ingredients, soldOut, imageUrl } =
    pizza;
  const cartPizza = useSelector((state) =>
    state.cart.cart.find((item) => item.id === id),
  );
  const inCart = useSelector(getDuplicateOrder(pizza.id));
  const dispatch = useDispatch();

  function handleAddtoCart() {
    dispatch(
      addCart({ ...pizza, quantity: 1, totalPrice: unitPrice, pizzaId: id }),
    );
  }

  function handleRemoveCart() {
    dispatch(deleteCart(pizza.id));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-28 ${soldOut && 'grayscale'} rounded-md`}
      />
      <div className="flex grow flex-col">
        <p className="text-md font-semibold">{name}</p>
        <p className="text-sm capitalize text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-semibold text-stone-400">Sold out</p>
          )}
          {inCart && !soldOut && (
            <div className="flex gap-3">
              <div className="flex gap-2">
                <Button
                  type="quantitiyBtn"
                  onClick={() => dispatch(increaseQuantity(cartPizza.id))}
                >
                  +
                </Button>
                <p className="mt-4">{cartPizza.quantity}</p>
                <Button
                  type="quantitiyBtn"
                  onClick={() => dispatch(decreaseQuantity(cartPizza.id))}
                >
                  -
                </Button>
              </div>
              <Button type="lilPrimary" onClick={handleRemoveCart}>
                Remove
              </Button>
            </div>
          )}
          {!soldOut && !inCart && (
            <Button type="primary" onClick={handleAddtoCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
