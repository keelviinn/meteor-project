import React from "react";

const Button = ({
  variant = "primary",
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
