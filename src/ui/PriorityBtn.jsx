import { useFetcher } from 'react-router-dom';
import Button from './Button';
import { updateOrder } from '../services/apiRestaurant';

function PriorityBtn() {
  const fetcher = useFetcher();

  return (
    <div className="mb-4 mt-2 text-right">
      <fetcher.Form method="PATCH">
        <Button type="primary">
          {fetcher.state === 'submitting' ? 'Updating...' : 'Set Priority'}
        </Button>
      </fetcher.Form>
    </div>
  );
}

export default PriorityBtn;

export async function priorityAction({ request, params }) {
  const update = { priority: true };

  await updateOrder(params.orderId, update);
}
