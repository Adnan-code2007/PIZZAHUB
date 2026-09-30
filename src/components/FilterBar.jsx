import React from 'react';

const FilterBar = ({
  vegFilter,
  setVegFilter,
  priceFilter,
  setPriceFilter,
  ratingFilter,
  setRatingFilter,
  sortBy,
  setSortBy,
  selectedCategory,
  setSelectedCategory,
  onReset,
  totalResults
}) => {
  const isAnyFilterActive =
    vegFilter !== 'all' ||
    priceFilter !== 'all' ||
    ratingFilter !== 'all' ||
    selectedCategory !== 'all' ||
    sortBy !== 'popular';

  return (
    <div className="filter-bar bg-white rounded-4 p-3 p-md-4 shadow-sm border mb-4">
      {/* Top row: Results count & Quick Veg/Non-Veg toggle */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 pb-3 border-bottom mb-3">
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-danger rounded-pill px-3 py-2 fw-bold">
            {totalResults} {totalResults === 1 ? 'Item' : 'Items'} Available
          </span>
          {isAnyFilterActive && (
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm rounded-pill px-3 fw-semibold"
              onClick={onReset}
            >
              <i className="bi bi-arrow-counterclockwise me-1"></i> Reset Filters
            </button>
          )}
        </div>

        {/* Dietary Toggle */}
        <div className="btn-group rounded-pill p-1 bg-light border" role="group" aria-label="Dietary filter">
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 fw-bold transition-all ${
              vegFilter === 'all' ? 'btn-white bg-white shadow-sm text-dark' : 'text-muted'
            }`}
            onClick={() => setVegFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 fw-bold transition-all ${
              vegFilter === 'veg' ? 'btn-success text-white shadow-sm' : 'text-success'
            }`}
            onClick={() => setVegFilter('veg')}
          >
            <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.6rem' }}></i> Veg
          </button>
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 fw-bold transition-all ${
              vegFilter === 'non-veg' ? 'btn-danger text-white shadow-sm' : 'text-danger'
            }`}
            onClick={() => setVegFilter('non-veg')}
          >
            <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.6rem' }}></i> Non-Veg
          </button>
        </div>
      </div>

      {/* Row 2: Select Dropdowns & Sort */}
      <div className="row g-3 align-items-center">
        {/* Category Filter */}
        <div className="col-6 col-md-3">
          <label className="form-label small text-muted fw-bold mb-1">Category</label>
          <select
            className="form-select form-select-sm rounded-3 shadow-none border"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Veg Pizza">Veg Pizza</option>
            <option value="Non-Veg Pizza">Non-Veg Pizza</option>
            <option value="Classic Pizzas">Classic Pizzas</option>
            <option value="Premium Pizzas">Premium Pizzas</option>
            <option value="Cheese Lovers">Cheese Lovers</option>
            <option value="Chicken Pizzas">Chicken Pizzas</option>
            <option value="Sides">Sides</option>
            <option value="Desserts">Desserts</option>
            <option value="Beverages">Beverages</option>
            <option value="Combos">Combos</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="col-6 col-md-3">
          <label className="form-label small text-muted fw-bold mb-1">Price Range</label>
          <select
            className="form-select form-select-sm rounded-3 shadow-none border"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="all">Any Price</option>
            <option value="under200">Under ₹200</option>
            <option value="200-400">₹200 – ₹400</option>
            <option value="400-600">₹400 – ₹600</option>
            <option value="above600">₹600+</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div className="col-6 col-md-3">
          <label className="form-label small text-muted fw-bold mb-1">Customer Rating</label>
          <select
            className="form-select form-select-sm rounded-3 shadow-none border"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option value="all">Any Rating</option>
            <option value="4.5">⭐ 4.5 & Above</option>
            <option value="4.0">⭐ 4.0 & Above</option>
            <option value="3.5">⭐ 3.5 & Above</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div className="col-6 col-md-3">
          <label className="form-label small text-muted fw-bold mb-1">Sort By</label>
          <select
            className="form-select form-select-sm rounded-3 shadow-none border fw-semibold"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popular">Popularity</option>
            <option value="ratingHighLow">Rating: High to Low</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
