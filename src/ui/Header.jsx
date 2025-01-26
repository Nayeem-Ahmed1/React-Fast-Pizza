import { Link } from 'react-router-dom';
import SearchbarHead from './SearchbarHead';
import Username from '../features/user/Username';

function Header() {
  return (
    <div className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase">
      <Link to="/" className="tracking-widest">
        React Fast pizza Co.
      </Link>

      <SearchbarHead />
      <Username />
    </div>
  );
}

export default Header;
