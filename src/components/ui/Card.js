import React from 'react';

const Card = ({ children, className = '', title }) => {
  return (
    <div className={`card ${className}`}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
};

export default Card;