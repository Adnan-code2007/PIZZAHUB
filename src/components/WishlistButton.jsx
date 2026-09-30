import React from 'react';
import { usePizzaHub } from '../context/PizzaHubContext';

const WishlistButton = ({ pizzaId, className = '', showLabel = false }) => {
  const { isInWishlist, toggleWishlist } = usePizzaHub();
  const inWishlist = isInWishlist(pizzaId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(pizzaId);
  };

  return (
    <button
      type="button"
      className={`btn wishlist-btn ${inWishlist ? 'active' : ''} ${className}`}
      onClick={handleClick}
      title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      aria-label="Wishlist"
    >
      <i className={`bi ${inWishlist ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
      {showLabel && (
        <span className="ms-1 small">{inWishlist ? 'Wishlisted' : 'Wishlist'}</span>
      )}
    </button>
  );
};

export default WishlistButton;
