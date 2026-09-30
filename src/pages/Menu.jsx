import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { pizzas } from '../data/pizzas';
import { categories } from '../data/categories';
import PizzaCard from '../components/PizzaCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [vegFilter, setVegFilter] = useState('all'); // 'all' | 'veg' | 'non-veg'
  const [priceFilter, setPriceFilter] = useState('all'); // 'all' | 'under200' | '200-400' | '400-600' | 'above600'
  const [ratingFilter, setRatingFilter] = useState('all'); // 'all' | '4.5' | '4.0' | '3.5'
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'ratingHighLow' | 'priceLowHigh' | 'priceHighLow'

  // Sync with searchParams if navigated from external link
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
    const urlSearch = searchParams.get('search');
    if (urlSearch !== null) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  // Handle resetting all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setVegFilter('all');
    setPriceFilter('all');
    setRatingFilter('all');
    setSortBy('popular');
    setSearchParams({});
  };

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    return pizzas.filter(item => {
      // 1. Search term (matches name, category, subCategory, description, ingredients)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesSubCat = item.subCategory?.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients?.some(ing => ing.toLowerCase().includes(query));

        if (!matchesName && !matchesCat && !matchesSubCat && !matchesDesc && !matchesIngredients) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'Veg Pizza') {
          if (!item.veg || (item.category === 'Sides' || item.category === 'Desserts' || item.category === 'Beverages')) return false;
        } else if (selectedCategory === 'Non-Veg Pizza') {
          if (item.veg || (item.category === 'Sides' || item.category === 'Desserts' || item.category === 'Beverages')) return false;
        } else if (selectedCategory === 'Chicken Pizzas') {
          if (item.category !== 'Chicken Pizzas' && item.subCategory !== 'Chicken Pizzas') return false;
        } else if (selectedCategory === 'Cheese Lovers') {
          if (item.category !== 'Cheese Lovers' && item.subCategory !== 'Cheese Lovers') return false;
        } else if (selectedCategory === 'Classic Pizzas') {
          if (item.category !== 'Classic Pizzas' && item.subCategory !== 'Classic Pizzas') return false;
        } else if (selectedCategory === 'Premium Pizzas') {
          if (item.category !== 'Premium Pizzas' && item.subCategory !== 'Premium Pizzas') return false;
        } else {
          if (item.category !== selectedCategory && item.subCategory !== selectedCategory) {
            return false;
          }
        }
      }

      // 3. Dietary Filter (veg / non-veg)
      if (vegFilter === 'veg' && !item.veg) return false;
      if (vegFilter === 'non-veg' && item.veg) return false;

      // 4. Price Filter
      if (priceFilter === 'under200' && item.price >= 200) return false;
      if (priceFilter === '200-400' && (item.price < 200 || item.price > 400)) return false;
      if (priceFilter === '400-600' && (item.price < 400 || item.price > 600)) return false;
      if (priceFilter === 'above600' && item.price <= 600) return false;

      // 5. Rating Filter
      if (ratingFilter !== 'all') {
        const minRating = parseFloat(ratingFilter);
        if (item.rating < minRating) return false;
      }

      return true;
    }).sort((a, b) => {
      // 6. Sorting
      if (sortBy === 'ratingHighLow') {
        return b.rating - a.rating;
      }
      if (sortBy === 'priceLowHigh') {
        return a.price - b.price;
      }
      if (sortBy === 'priceHighLow') {
        return b.price - a.price;
      }
      // default: popularity
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return b.reviews - a.reviews;
    });
  }, [searchTerm, selectedCategory, vegFilter, priceFilter, ratingFilter, sortBy]);

  return (
    <div className="menu-page py-4 pb-5 bg-light-subtle min-vh-100">
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-4">
          <span className="badge bg-danger-subtle text-danger fw-bold rounded-pill px-3 py-1 mb-2">
            🍕 Handcrafted Flavors
          </span>
          <h1 className="fw-black display-6 text-dark mb-2">Explore PizzaHub Menu</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Choose from freshly prepared artisan crusts, premium cheeses, and authentic toppings.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-4 mx-auto" style={{ maxWidth: '640px' }}>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search pizza by name, category, or ingredients (e.g., Paneer, Pepperoni)..."
          />
        </div>

        {/* Category Filter Pills */}
        <div className="category-pills-scroll mb-4 d-flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold text-nowrap d-flex align-items-center gap-2 transition-all shadow-sm ${
                  isActive ? 'btn-danger text-white' : 'btn-white bg-white text-dark border'
                }`}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setSearchParams(cat.slug === 'all' ? {} : { category: cat.slug });
                }}
              >
                <i className={`bi ${cat.icon}`}></i>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Filter & Sorting Controls */}
        <FilterBar
          vegFilter={vegFilter}
          setVegFilter={setVegFilter}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onReset={handleResetFilters}
          totalResults={filteredProducts.length}
        />

        {/* Product Grid / Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {filteredProducts.map(pizza => (
              <div key={pizza.id} className="col">
                <PizzaCard pizza={pizza} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-4 p-5 shadow-sm border text-center my-4">
            <EmptyState
              icon="bi-search"
              title="No Pizzas Found"
              message={`We couldn't find any items matching your selected criteria. Try adjusting your search term or clearing filters.`}
              btnText="Reset All Filters"
              onBtnClick={handleResetFilters}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
