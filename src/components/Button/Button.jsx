const Button = ({ onClick, children, ...props }) => {
  const handleClick = (e) => {
    e.stopPropagation();

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button {...props} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
