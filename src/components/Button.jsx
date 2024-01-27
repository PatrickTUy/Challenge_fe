import { useState } from 'react';

function Button({
  loading = false,
  onClick,
  btnColor = 'primary',
  style = '',
  content = '',
  type = 'button',
}) {
  const [isPopped, setIsPopped] = useState(false);
  const handleClick = () => {
    setIsPopped(true);
    setTimeout(() => {
      setIsPopped(false);
      if (onClick) {
        onClick();
      }
    }, 50);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`bg-${btnColor} ${style} font-bold py-2 px-4 rounded transition-transform duration-50 ${
        isPopped ? 'transform scale-[0.95]' : ''
      } ${loading ? 'opacity-50' : ''}`}
      disabled={loading}
    >
      {loading ? <div className="loader mr-1" /> : <div>{content}</div>}
    </button>
  );
}

export default Button;
