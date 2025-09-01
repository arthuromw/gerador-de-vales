import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ message, ctaText, ctaLink }) => {
  return (
    <div className="empty-state">
      <p>{message}</p>
      {ctaText && ctaLink && (
        <Link to={ctaLink} className="btn btn-primary">
          {ctaText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;