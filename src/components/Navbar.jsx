import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { usePizzaHub } from '../context/PizzaHubContext';

const Navbar = () => {
  const {
    currentUser,
    logout,
    cartCount,
    wishlistCount,
    selectedLocation,
    setSelectedLocation
  } = usePizzaHub();

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const locationsList = [
    'Indiranagar, Bengaluru',
    'Koramangala, Bengaluru',
    'Connaught Place, New Delhi',
    'Bandra West, Mumbai',
    'Jubilee Hills, Hyderabad',
    'Koregaon Park, Pune',
    'Park Street, Kolkata',
    'Sector 18, Noida'
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/menu?search=${encodeURIComponent(quickSearch.trim())}`);
      setQuickSearch('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark-custom sticky-top py-2 py-lg-3 shadow">
        <div className="container">
          {/* Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 me-lg-4" onClick={() => setMobileMenuOpen(false)}>
            <div className="brand-logo-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm">
              🍕
            </div>
            <div className="brand-text">
              <span className="fw-black text-white fs-4 tracking-tight">PIZZA</span>
              <span className="fw-black text-danger fs-4 tracking-tight">HUB</span>
            </div>
          </Link>

          {/* Location Selector Button */}
          <button
            type="button"
            className="btn btn-outline-secondary text-light btn-sm rounded-pill px-3 py-1 d-none d-md-flex align-items-center gap-2 border-secondary-subtle bg-dark-subtle hover-border-danger me-auto"
            onClick={() => setShowLocationModal(true)}
            title="Choose your delivery location"
          >
            <i className="bi bi-geo-alt-fill text-danger"></i>
            <div className="text-start">
              <span className="d-block text-secondary text-uppercase" style={{ fontSize: '0.65rem', lineHeight: '1' }}>
                Delivering to
              </span>
              <span className="fw-semibold text-truncate d-inline-block small" style={{ maxWidth: '140px' }}>
                {selectedLocation}
              </span>
            </div>
            <i className="bi bi-chevron-down small text-secondary ms-1"></i>
          </button>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler border-0 shadow-none p-2 text-white"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'} fs-3`}></i>
          </button>

          {/* Collapsible Content */}
          <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
            {/* Quick Search */}
            <form onSubmit={handleSearchSubmit} className="d-flex mx-lg-3 my-2 my-lg-0 search-nav-form">
              <div className="input-group input-group-sm rounded-pill overflow-hidden bg-dark border border-secondary">
                <span className="input-group-text bg-transparent border-0 text-danger ps-3">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-transparent border-0 text-white shadow-none"
                  placeholder="Search pizzas & treats..."
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  aria-label="Search"
                />
              </div>
            </form>

            {/* Navigation Links */}
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) => `nav-link px-3 ${isActive ? 'active text-danger fw-bold' : 'text-light'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="bi bi-house-door me-1 d-lg-none"></i> Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/menu"
                  className={({ isActive }) => `nav-link px-3 ${isActive ? 'active text-danger fw-bold' : 'text-light'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="bi bi-menu-app me-1 d-lg-none"></i> Menu
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/custom-pizza"
                  className={({ isActive }) => `nav-link px-3 ${isActive ? 'active text-danger fw-bold' : 'text-light'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="bi bi-magic me-1"></i> Custom Pizza
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/offers"
                  className={({ isActive }) => `nav-link px-3 ${isActive ? 'active text-danger fw-bold' : 'text-light'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="bi bi-tag-fill text-warning me-1"></i> Offers
                </NavLink>
              </li>

              {currentUser && (
                <li className="nav-item">
                  <NavLink
                    to="/my-orders"
                    className={({ isActive }) => `nav-link px-3 ${isActive ? 'active text-danger fw-bold' : 'text-light'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="bi bi-box-seam me-1 d-lg-none"></i> My Orders
                  </NavLink>
                </li>
              )}
            </ul>

            {/* Right Action Icons: Wishlist, Cart, Profile */}
            <div className="d-flex align-items-center gap-2 ms-lg-3 mt-3 mt-lg-0">
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="btn btn-outline-light border-0 rounded-circle position-relative p-2"
                onClick={() => setMobileMenuOpen(false)}
                title="Wishlist"
              >
                <i className="bi bi-heart fs-5"></i>
                {wishlistCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="btn btn-danger rounded-pill px-3 py-2 d-flex align-items-center gap-2 shadow-sm position-relative hover-scale"
                onClick={() => setMobileMenuOpen(false)}
                title="Shopping Cart"
              >
                <i className="bi bi-cart3 fs-5"></i>
                <span className="fw-bold d-none d-sm-inline">Cart</span>
                <span className="badge bg-white text-danger rounded-pill fw-bold" style={{ fontSize: '0.75rem' }}>
                  {cartCount}
                </span>
              </Link>

              {/* User Profile / Login */}
              {currentUser ? (
                <div className="dropdown">
                  <button
                    className="btn btn-dark border border-secondary rounded-pill px-3 py-1 d-flex align-items-center gap-2 dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div
                      className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center fw-bold"
                      style={{ width: '28px', height: '28px', fontSize: '0.8rem' }}
                    >
                      {currentUser.fullName ? currentUser.fullName[0].toUpperCase() : 'U'}
                    </div>
                    <span className="d-none d-md-inline small fw-semibold text-truncate" style={{ maxWidth: '100px' }}>
                      {currentUser.fullName?.split(' ')[0]}
                    </span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-4 mt-2">
                    <li className="px-3 py-2 border-bottom">
                      <div className="fw-bold text-dark">{currentUser.fullName}</div>
                      <div className="small text-muted text-truncate">{currentUser.email}</div>
                    </li>
                    <li>
                      <Link className="dropdown-item py-2" to="/profile" onClick={() => setMobileMenuOpen(false)}>
                        <i className="bi bi-person-circle me-2 text-danger"></i> My Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item py-2" to="/my-orders" onClick={() => setMobileMenuOpen(false)}>
                        <i className="bi bi-bag-check me-2 text-danger"></i> My Orders
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item py-2" to="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                        <i className="bi bi-heart me-2 text-danger"></i> Wishlist ({wishlistCount})
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider my-1" /></li>
                    <li>
                      <button
                        className="dropdown-item py-2 text-danger fw-semibold"
                        type="button"
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-outline-light rounded-pill px-3 py-2 fw-semibold small hover-scale"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="bi bi-person-fill me-1"></i> Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Location Picker Modal */}
      {showLocationModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-dark">
                  <i className="bi bi-geo-alt-fill text-danger me-2"></i> Select Delivery Location
                </h5>
                <button
                  type="button"
                  className="btn-close shadow-none"
                  onClick={() => setShowLocationModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body py-4">
                <p className="text-muted small mb-3">
                  Choose your nearest delivery outlet to check real-time item availability and fastest delivery speed.
                </p>
                <div className="list-group rounded-3">
                  {locationsList.map((loc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3 border-0 rounded-3 mb-1 ${
                        selectedLocation === loc ? 'bg-danger-subtle text-danger fw-bold' : 'hover-bg'
                      }`}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setShowLocationModal(false);
                      }}
                    >
                      <span>
                        <i className="bi bi-building me-2 text-muted"></i>
                        {loc}
                      </span>
                      {selectedLocation === loc && (
                        <i className="bi bi-check-circle-fill text-danger fs-5"></i>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
