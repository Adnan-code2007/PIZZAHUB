import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePizzaHub } from '../context/PizzaHubContext';
import WishlistButton from './WishlistButton';
import { fallbackPizzaImage } from '../data/pizzas';

const PizzaCard = ({ pizza }) => {
  const { addToCart } = usePizzaHub();
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(pizza.image);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    // Add default Regular, Classic Hand Tossed, no extra toppings
    addToCart(pizza, 'Regular', 'Classic Hand Tossed', [], 1);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="card h-100 pizza-card shadow-sm border-0 rounded-4 overflow-hidden position-relative">
      {/* Top badges */}
      <div className="card-badge-container position-absolute top-0 start-0 p-3 z-2 d-flex gap-2 align-items-center">
        {/* Veg / Non-Veg Indicator */}
        <span
          className={`veg-badge d-inline-flex align-items-center justify-content-center p-1 rounded bg-white shadow-sm border ${
            pizza.veg ? 'border-success' : 'border-danger'
          }`}
          title={pizza.veg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
        >
          <span
            className={`rounded-circle ${pizza.veg ? 'bg-success' : 'bg-danger'}`}
            style={{ width: '10px', height: '10px', display: 'block' }}
          ></span>
        </span>

        {pizza.popular && (
          <span className="badge bg-warning text-dark fw-bold rounded-pill shadow-sm px-2 py-1 small">
            <i className="bi bi-fire me-1"></i> Bestseller
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <div className="position-absolute top-0 end-0 p-3 z-2">
        <WishlistButton
          pizzaId={pizza.id}
          className="rounded-circle bg-white shadow-sm p-2 d-flex align-items-center justify-content-center border-0 hover-scale"
        />
      </div>

      {/* Image with zoom hover */}
      <Link to={`/pizza/${pizza.id}`} className="pizza-img-wrapper overflow-hidden d-block position-relative bg-light">
        <img
          src={imgSrc}
          alt={pizza.name}
          className="card-img-top pizza-img img-fluid"
          onError={() => setImgSrc(fallbackPizzaImage)}
          loading="lazy"
        />
        <div className="image-overlay d-flex align-items-center justify-content-center">
          <span className="btn btn-sm btn-light fw-bold rounded-pill px-3 shadow">
            <i className="bi bi-eye me-1"></i> View Details
          </span>
        </div>
      </Link>

      {/* Card Body */}
      <div className="card-body p-3 p-md-4 d-flex flex-column">
        {/* Category & Rating */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-danger-subtle text-danger fw-semibold px-2 py-1 rounded-pill small">
            {pizza.category}
          </span>
          <div className="rating-badge d-flex align-items-center bg-success text-white px-2 py-0 rounded-pill small fw-bold">
            <span>{pizza.rating}</span>
            <i className="bi bi-star-fill ms-1" style={{ fontSize: '0.75rem' }}></i>
            <span className="ms-1 text-white-50 small">({pizza.reviews})</span>
          </div>
        </div>

        {/* Title */}
        <h5 className="card-title fw-bold text-dark mb-1">
          <Link to={`/pizza/${pizza.id}`} className="text-dark text-decoration-none title-hover">
            {pizza.name}
          </Link>
        </h5>

        {/* Description */}
        <p className="card-text text-muted small mb-3 flex-grow-1 line-clamp-2">
          {pizza.description}
        </p>

        {/* Ingredients preview */}
        {pizza.ingredients && pizza.ingredients.length > 0 && (
          <div className="ingredients-preview mb-3 small text-secondary">
            <i className="bi bi-layers text-danger me-1"></i>
            <span className="text-truncate d-inline-block mw-100 align-bottom">
              {pizza.ingredients.slice(0, 3).join(', ')}
              {pizza.ingredients.length > 3 ? '...' : ''}
            </span>
          </div>
        )}

        {/* Price & Action Buttons */}
        <div className="card-footer-action pt-2 border-top d-flex justify-content-between align-items-center mt-auto">
          <div>
            <span className="text-muted d-block small" style={{ fontSize: '0.75rem' }}>Starting from</span>
            <span className="fs-5 fw-bolder text-danger">₹{pizza.price}</span>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm rounded-pill px-2 px-md-3 fw-semibold hover-scale"
              onClick={() => navigate(`/pizza/${pizza.id}`)}
              title="Customize size, crust & toppings"
            >
              <i className="bi bi-sliders me-1"></i>
              <span className="d-none d-sm-inline">Customize</span>
            </button>

            <button
              type="button"
              className={`btn btn-danger btn-sm rounded-pill px-3 fw-bold shadow-sm hover-scale ${
                isAdding ? 'disabled' : ''
              }`}
              onClick={handleQuickAdd}
              title="Quick Add to Cart"
            >
              {isAdding ? (
                <span className="spinner-border spinner-border-sm" role="status"></span>
              ) : (
                <>
                  <i className="bi bi-plus-lg me-1"></i> Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
