import { Link } from 'react-router-dom';

function LinkButton({ to, children, type }) {
  const base =
    'mt-3 inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-700 ring-yellow-300 ring-offset-2 transition-all duration-300 hover:bg-yellow-300 focus:outline-yellow-300 focus:ring';

  const styles = {
    smLink:
      'mt-3 font-semibold text-blue-800 p-2 mb-4 inline-block hover:text-blue-400',
    primary: base,
  };

  return (
    <Link to={to} className={styles[type]}>
      {children}
    </Link>
  );
}

export default LinkButton;
