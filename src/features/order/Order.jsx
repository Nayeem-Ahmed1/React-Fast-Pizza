// Test ID: IIDSAT

import { useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import OrderItem from './OrderItem';
import PriorityBtn from '../../ui/PriorityBtn';

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const order = useLoaderData();

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div className="ml-2 mt-4 items-center justify-between space-y-4 text-center sm:flex sm:space-y-0">
        <h2 className="text-2xl font-bold">{`Order #${id} Status`}</h2>

        <div className="space-x-5">
          {priority && (
            <span className="rounded-full bg-red-600 px-3 py-1 font-semibold uppercase text-stone-200">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-700 px-3 py-1 uppercase text-stone-200">
            {status} order
          </span>
        </div>
      </div>

      <div className="p mb-10 ml-2 mr-2 mt-12 items-center justify-between bg-red-950/10 p-7 sm:flex">
        <p className="text-md text-lg font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-sm text-stone-600">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="mb-10 ml-2 mr-2">
        {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="ml-2 mr-2 space-y-1 bg-red-950/10 p-7">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="text-lg font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <PriorityBtn />}
    </div>
  );
}

export async function orderLoader({ params }) {
  const order = await getOrder(params.orderId);

  return order;
}

export default Order;
