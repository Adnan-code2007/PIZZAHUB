import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({
  icon = 'bi-inbox',
  title = 'Nothing here yet',
  message = 'We could not find any items matching your request.',
  btnText = 'Explore Menu',
  btnLink = '/menu',
  onBtnClick
}) => {
  return (
    <div className="empty-state text-center py-5 px-3">
      <div className="empty-state-icon mb-3">
        <div className="icon-wrapper d-inline-flex align-items-center justify-content-center rounded-circle bg-danger-subtle text-danger p-4 mb-2 shadow-sm">
          <i className={`bi ${icon} fs-1`}></i>
        </div>
      </div>
      <h3 className="fw-bold mb-2 text-dark">{title}</h3>
      <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '420px' }}>
        {message}
      </p>
      {btnText && (
        btnLink ? (
          <Link to={btnLink} className="btn btn-danger btn-lg px-4 rounded-pill shadow-sm hover-scale">
            <i className="bi bi-compass me-2"></i>
            {btnText}
          </Link>
        ) : (
          <button onClick={onBtnClick} className="btn btn-danger btn-lg px-4 rounded-pill shadow-sm hover-scale">
            {btnText}
          </button>
        )
      )}
    </div>
  );
};

export default EmptyState;
