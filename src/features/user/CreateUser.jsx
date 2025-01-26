import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [userName, setUsername] = useState('');

  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.username);

  const Navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (username) Navigate('/menu');
    if (!userName) return;

    dispatch(updateName(userName));

    Navigate('/menu');
    setUsername('');
  }

  return (
    <form onSubmit={handleSubmit}>
      {username ? (
        <Button type="primary">{`Continue Ordering,${username}`}</Button>
      ) : (
        <>
          <p>👋 Welcome! Please start by telling us your name:</p>

          <input
            type="text"
            placeholder="Your full name"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            className="input mt-3 w-72"
          />

          {userName !== '' && (
            <div>
              <Button type="primary">START ORDERING</Button>
            </div>
          )}
        </>
      )}
    </form>
  );
}

export default CreateUser;
