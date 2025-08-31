import React from 'react';

const Input = ({ label, id, value, onChange, type = 'text', ...props }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Input;