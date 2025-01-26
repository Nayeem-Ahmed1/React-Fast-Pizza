import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalNumPizza, getTotalPizzaPrice } from './cartSlice';

function CartOverview() {
  const totalPizzaPrice = useSelector(getTotalPizzaPrice);
  const totalPizzaNum = useSelector(getTotalNumPizza);

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 uppercase text-stone-200">
      <p className="space-x-4 font-semibold text-stone-300">
        <span>{totalPizzaNum} pizzas</span>
        <span>${totalPizzaPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
