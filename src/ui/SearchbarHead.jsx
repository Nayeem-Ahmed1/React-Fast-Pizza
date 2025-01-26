import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchbarHead() {
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  function handleIDsubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }

  return (
    <form onSubmit={handleIDsubmit}>
      <input
        type="text"
        placeholder="Search Order ID #"
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-full bg-yellow-100 px-2 py-1 ring-yellow-200 ring-offset-2 transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring sm:px-16 sm:py-2 md:focus:px-24"
      />
    </form>
  );
}

export default SearchbarHead;
