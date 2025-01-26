import { useNavigate } from 'react-router-dom';

function Button({ children, disabled, back, type, onClick }) {
  const Navigate = useNavigate();

  const base =
    'mt-3 inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-700 ring-yellow-300 ring-offset-2 transition-all duration-300 hover:bg-yellow-300 focus:outline-yellow-400 focus:ring';

  const styles = {
    primary: base,
    limitedBtn:
      'mt-3 ml-5 text-md inline-block rounded-full bg-stone-200 px-4 py-3 font-semibold uppercase tracking-wide text-stone-700 ring-stone-800 ring-offset-2 transition-all duration-300 hover:bg-stone-300 focus:outline-stone-400 focus:ring focus:outline-none',
    quantitiyBtn:
      'text-sm bg-yellow-400 inline-block w-8 h-7 rounded-full mt-4 hover:bg-yellow-200 focus:outline-none focus:ring ring-yellow-200 ring-offset-1',
    lilPrimary:
      'mt-2 text-sm bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring ring-offset-2 ring-yellow-400 rounded-full h-11 w-24',
  };

  if (back) {
    return (
      <button className={styles[type]} onClick={() => Navigate(-1)}>
        {children}
      </button>
    );
  }

  if (onClick) {
    return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
