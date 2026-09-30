import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category, isSelected = false, onSelect }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onSelect) {
      onSelect(category.slug);
    } else {
      navigate(`/menu?category=${encodeURIComponent(category.slug)}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`card category-card text-center border-0 rounded-4 shadow-sm h-100 cursor-pointer transition-all p-3 ${
        isSelected ? 'active-category' : ''
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleClick();
      }}
    >
      <div className="category-img-container mx-auto mb-3 rounded-circle overflow-hidden position-relative shadow-sm">
        <img
          src={category.image}
          alt={category.name}
          className="img-fluid category-img"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80';
          }}
          loading="lazy"
        />
        <div className="category-icon-overlay d-flex align-items-center justify-content-center">
          <i className={`bi ${category.icon} fs-4 text-white`}></i>
        </div>
      </div>

      <h6 className="fw-bold mb-1 text-dark category-title">{category.name}</h6>
      <p className="text-muted small mb-0 line-clamp-2" style={{ fontSize: '0.8rem' }}>
        {category.description}
      </p>
    </div>
  );
};

export default CategoryCard;
