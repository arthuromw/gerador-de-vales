import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false }) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    warning: 'btn-warning',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;