import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import store from './../../../store';
import { useSelector } from 'react-redux';
import { emptyCart } from '../cart/cartSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(str);

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

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const cart = useSelector((state) => state.cart.cart);
  const submitState = useNavigation();

  const isSubmitting = submitState.state === 'submitting';

  const formError = useActionData();

  const username = useSelector((state) => state.user.username);

  return (
    <div className="ml-3">
      <h2 className="mb-14 mt-10 text-xl font-bold">
        Ready to order? Let's go!
      </h2>

      <Form method="POST">
        <div className="items-center gap-5 sm:flex">
          <label className="basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input"
          />
        </div>

        <div className="mt-4 items-center gap-8 sm:flex">
          <label className="">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input" />
            <p className="m-auto w-fit rounded-full bg-red-500 px-4 text-sm text-stone-300">
              {formError?.phone && formError.phone}
            </p>
          </div>
        </div>

        <div className="mt-5 items-center gap-9 sm:flex">
          <label className="basis-28">Address</label>
          <div className="grow">
            <input type="text" name="address" className="input" required />
          </div>
        </div>

        <input type="hidden" value={JSON.stringify(cart)} name="cart" />

        <div className="mb-4 mt-6">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="mr-1 h-4 w-4 accent-yellow-500 ring-yellow-500 ring-offset-1 focus:outline-none focus:ring"
          />
          <label htmlFor="priority">
            Want to give your order priority?{' '}
            <span className="font-bold">(Extra 0.2% cost)</span>
          </label>
        </div>

        <div>
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? 'Placing Order...' : 'Order Now'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function formAction({ request }) {
  const res = await request.formData();
  const data = Object.fromEntries(res);

  const errors = {};

  if (!isValidPhone(data.phone)) {
    errors.phone = '--Please Enter a valid BD phone Number';
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = {
    ...data,
    cart: JSON.parse(data.cart),
  };

  const order = await createOrder(newOrder);

  store.dispatch(emptyCart());

  return redirect(`/order/${order.id}`);
}

export default CreateOrder;
