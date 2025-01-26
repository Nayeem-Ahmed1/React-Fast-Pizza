import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div>
      <LinkButton to="/menu" type="smLink">
        &larr; Back to menu
      </LinkButton>

      <p className="contain ml-2 w-fit rounded-full bg-zinc-200 p-2 px-3 text-center text-stone-700">
        Your cart is still empty. Start adding some pizzas :) 🥲
      </p>
    </div>
  );
}

export default EmptyCart;
