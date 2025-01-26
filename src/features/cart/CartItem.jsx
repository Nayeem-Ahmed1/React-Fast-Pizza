import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from './../../utils/helpers';
import { decreaseQuantity, deleteCart, increaseQuantity } from './cartSlice';
import { useFetcher } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

function CartItem({ item }) {
  const { name, quantity, totalPrice } = item;

  const dispatch = useDispatch();

  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') {
        fetcher.load('/menu');
      }
    },
    [fetcher],
  );

  function handleRemoveCart() {
    dispatch(deleteCart(item.id));
  }

  return (
    <li className="flex justify-between p-2 font-semibold sm:p-1">
      <div className="justify-between sm:mr-3 sm:flex sm:w-full sm:p-4">
        <p>
          {quantity}&times; {name}
          <span className="mb-3 ml-1 block text-sm font-normal text-stone-600 sm:mb-0">
            {fetcher.state === 'loading'
              ? 'loading...'
              : fetcher.data
                  ?.find((el) => el.id === item.id)
                  ?.ingredients.join(', ')}
          </span>
        </p>
        <p className="justify-end">{formatCurrency(totalPrice)}</p>
      </div>
      <div className="flex gap-3">
        <div className="flex gap-2">
          <Button
            type="quantitiyBtn"
            onClick={() => dispatch(increaseQuantity(item.id))}
          >
            +
          </Button>
          <p className="mt-4">{quantity}</p>
          <Button
            type="quantitiyBtn"
            onClick={() => dispatch(decreaseQuantity(item.id))}
          >
            -
          </Button>
        </div>
        <Button type="lilPrimary" onClick={handleRemoveCart}>
          Remove
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
