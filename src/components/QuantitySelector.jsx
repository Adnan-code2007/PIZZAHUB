import React from 'react';

const QuantitySelector = ({ quantity, onIncrease, onDecrease, min = 1, size = 'md' }) => {
  const btnClass = size === 'sm' ? 'btn-sm px-2 py-0' : size === 'lg' ? 'px-3 py-2' : 'px-2 py-1';
  const textClass = size === 'sm' ? 'small fw-bold px-2' : size === 'lg' ? 'fs-5 fw-bold px-3' : 'fw-bold px-2';

  return (
    <div className="quantity-selector d-inline-flex align-items-center bg-light border rounded-pill p-1">
      <button
        type="button"
        className={`btn btn-outline-danger border-0 rounded-circle d-flex align-items-center justify-content-center ${btnClass}`}
        onClick={(e) => {
          e.stopPropagation();
          if (quantity > min) onDecrease();
        }}
        disabled={quantity <= min}
        style={{ width: size === 'sm' ? '24px' : '32px', height: size === 'sm' ? '24px' : '32px' }}
        aria-label="Decrease quantity"
      >
        <i className="bi bi-dash"></i>
      </button>

      <span className={textClass} style={{ minWidth: size === 'sm' ? '24px' : '32px', textAlign: 'center' }}>
        {quantity}
      </span>

      <button
        type="button"
        className={`btn btn-danger text-white border-0 rounded-circle d-flex align-items-center justify-content-center ${btnClass}`}
        onClick={(e) => {
          e.stopPropagation();
          onIncrease();
        }}
        style={{ width: size === 'sm' ? '24px' : '32px', height: size === 'sm' ? '24px' : '32px' }}
        aria-label="Increase quantity"
      >
        <i className="bi bi-plus"></i>
      </button>
    </div>
  );
};

export default QuantitySelector;
