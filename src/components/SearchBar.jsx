import React from 'react';

const SearchBar = ({
  searchTerm,
  onSearchChange,
  placeholder = 'Search pizzas, ingredients, pasta, garlic bread...',
  onSubmit
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar-form w-100 position-relative">
      <div className="input-group bg-white rounded-pill shadow-sm border p-1 p-sm-2 align-items-center">
        <span className="input-group-text bg-transparent border-0 text-danger ps-3">
          <i className="bi bi-search fs-5"></i>
        </span>
        <input
          type="text"
          className="form-control border-0 shadow-none bg-transparent ps-2 pe-3"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search items"
        />
        {searchTerm && (
          <button
            type="button"
            className="btn btn-link text-muted p-1 me-2"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <i className="bi bi-x-circle-fill"></i>
          </button>
        )}
        <button type="submit" className="btn btn-danger rounded-pill px-3 px-sm-4 fw-bold">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
