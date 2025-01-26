import { useNavigate, useRouteError } from 'react-router-dom';
import Button from './Button';

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      {error.data || error.message}
      <br />
      <br />
      <Button back={true} type="primary">
        &larr; Go back
      </Button>
    </div>
  );
}

export default NotFound;
