import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { pizzas } from '../data/pizzas';
import { categories } from '../data/categories';
import { offers } from '../data/offers';
import PizzaCard from '../components/PizzaCard';
import CategoryCard from '../components/CategoryCard';
import OfferCard from '../components/OfferCard';
import { usePizzaHub } from '../context/PizzaHubContext';

const Home = () => {
  const navigate = useNavigate();
  const { selectedLocation } = usePizzaHub();
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/menu?search=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/menu');
    }
  };

  const popularPizzas = pizzas.filter(p => p.popular).slice(0, 8);
  const bestsellerPizzas = pizzas.filter(p => p.isBestseller).slice(0, 8);
  const featuredOffer = offers[0]; // PIZZA150

  const whyChooseUsFeatures = [
    {
      icon: 'bi-patch-check-fill',
      title: 'Fresh Ingredients',
      description: '100% real mozzarella cheese, farm-fresh vegetables, and slow-fermented artisan dough made daily.'
    },
    {
      icon: 'bi-lightning-charge-fill',
      title: '30-Minute Delivery UI',
      description: 'Lightning-fast delivery guarantee. If your oven-hot pizza takes longer than 30 minutes, it is on us!'
    },
    {
      icon: 'bi-droplet-fill',
      title: 'Quality Cheese Burst',
      description: 'Our proprietary cheddar-gouda molten cheese core makes every crust bite deliciously unforgettable.'
    },
    {
      icon: 'bi-sliders2',
      title: 'Infinite Customization',
      description: 'Choose your crust, size, sauces, and stack up to 10+ gourmet toppings exactly how your palate desires.'
    },
    {
      icon: 'bi-shield-lock-fill',
      title: 'Secure Checkout',
      description: 'Hassle-free UPI, cards, and Cash on Delivery options with instant automated order tracking.'
    },
    {
      icon: 'bi-gift-fill',
      title: 'Exciting Offers & BOGO',
      description: 'Save big with daily promotional coupons, combo meal discounts, and free dessert rewards.'
    }
  ];

  return (
    <div className="home-page pb-5">
      {/* 1. HERO SECTION */}
      <section className="hero-section position-relative py-5 text-white overflow-hidden">
        <div className="hero-backdrop position-absolute top-0 start-0 w-100 h-100">
          <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100"></div>
        </div>

        <div className="container position-relative z-1 py-4 py-lg-5">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-7">
              {/* Badge */}
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-danger bg-opacity-75 border border-danger-subtle mb-3 text-white small fw-bold shadow-sm">
                <span className="pulse-dot"></span>
                <span>🔥 Oven Hot & Fresh Handcrafted Pizzas</span>
              </div>

              {/* Headings */}
              <h1 className="hero-heading fw-black display-3 mb-3 text-uppercase">
                Fresh Pizza.<br />
                <span className="text-danger glow-text">Hot & Delicious.</span>
              </h1>

              <p className="lead text-light opacity-90 mb-4 pe-lg-5">
                Your favorite pizzas delivered fresh to your doorstep in 30 minutes. Hand-stretched dough, real Italian mozzarella, and authentic sauces.
              </p>

              {/* Location & Search Bar */}
              <div className="hero-search-box bg-dark bg-opacity-75 p-3 rounded-4 border border-secondary shadow-lg mb-4">
                <div className="d-flex align-items-center gap-2 mb-2 text-white-50 small">
                  <i className="bi bi-geo-alt-fill text-danger"></i>
                  <span>Delivering right now to: <strong className="text-white">{selectedLocation}</strong></span>
                </div>

                <form onSubmit={handleHeroSearch} className="d-flex flex-column flex-sm-row gap-2">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-0 text-danger ps-3">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-0 shadow-none ps-1 py-2"
                      placeholder="Search Margherita, Pepperoni, Paneer, Combos..."
                      value={heroSearch}
                      onChange={(e) => setHeroSearch(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-danger fw-bold px-4 py-2 rounded-3 shadow hover-scale text-nowrap">
                    Find Pizza
                  </button>
                </form>
              </div>

              {/* CTA Buttons */}
              <div className="d-flex flex-wrap gap-3">
                <Link to="/menu" className="btn btn-danger btn-lg px-4 rounded-pill fw-bold shadow-lg hover-scale">
                  <i className="bi bi-fire me-2"></i> Order Now
                </Link>
                <Link to="/menu" className="btn btn-outline-light btn-lg px-4 rounded-pill fw-semibold hover-scale">
                  <i className="bi bi-book-half me-2"></i> View Menu
                </Link>
                <Link to="/custom-pizza" className="btn btn-warning btn-lg px-4 rounded-pill fw-bold text-dark hover-scale">
                  <i className="bi bi-magic me-2"></i> Build Your Own
                </Link>
              </div>
            </div>

            {/* Hero Visual Image / Pizza Showcase */}
            <div className="col-12 col-lg-5 text-center">
              <div className="hero-pizza-floating position-relative d-inline-block">
                <div className="hero-glow-circle position-absolute top-50 start-50 translate-middle"></div>
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80"
                  alt="PizzaHub Special Pizza"
                  className="img-fluid rounded-circle shadow-lg hero-img rotate-on-scroll"
                  style={{ maxHeight: '420px', aspectRatio: '1/1', objectFit: 'cover', border: '8px solid rgba(255,255,255,0.1)' }}
                />
                {/* Floating pill badge */}
                <div className="position-absolute bottom-0 start-0 bg-dark p-3 rounded-4 shadow-lg border border-secondary text-start text-white d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-danger text-white p-2">
                    <i className="bi bi-stopwatch-fill fs-4"></i>
                  </div>
                  <div>
                    <div className="fw-bold small">30 MIN GUARANTEE</div>
                    <div className="text-secondary small" style={{ fontSize: '0.7rem' }}>Hot & Crispy or Free</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIAL PROMOTIONAL BANNER */}
      <section className="py-4">
        <div className="container">
          <div className="promo-banner bg-gradient-danger rounded-4 p-4 p-md-5 text-white shadow-lg position-relative overflow-hidden">
            <div className="row align-items-center position-relative z-1">
              <div className="col-12 col-md-8">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge bg-warning text-dark fw-bold rounded-pill px-3 py-1">
                    NEW USER SPECIAL
                  </span>
                  <span className="small text-white-50">Limited Period Offer</span>
                </div>
                <h2 className="fw-black display-6 mb-2">
                  GET ₹150 OFF ON YOUR FIRST ORDER
                </h2>
                <p className="lead mb-3 text-white-50">
                  Use coupon code <span className="text-warning fw-black font-monospace bg-black bg-opacity-25 px-2 py-1 rounded">PIZZA150</span> at checkout on orders above ₹699.
                </p>
                <div className="d-flex flex-wrap gap-2 align-items-center">
                  <button
                    type="button"
                    className="btn btn-light text-danger fw-bold rounded-pill px-4 shadow-sm"
                    onClick={() => {
                      navigator.clipboard.writeText('PIZZA150');
                      alert('Coupon code PIZZA150 copied to clipboard!');
                    }}
                  >
                    <i className="bi bi-clipboard-check me-1"></i> Copy Code
                  </button>
                  <Link to="/menu" className="btn btn-outline-light rounded-pill px-4 fw-semibold">
                    Order Now
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-4 text-center d-none d-md-block">
                <div className="display-1 text-warning fw-black opacity-90">
                  ₹150<span className="fs-3 d-block text-white">OFF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUICK ORDER CATEGORIES */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-end mb-4">
            <div>
              <span className="badge bg-danger-subtle text-danger fw-bold rounded-pill px-3 py-1 mb-2">
                Browse by Category
              </span>
              <h2 className="fw-bold text-dark mb-0">What Are You Craving Today?</h2>
            </div>
            <Link to="/menu" className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-semibold mt-2 mt-sm-0">
              View All Categories <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
            {categories.filter(c => c.slug !== 'all').map(cat => (
              <div key={cat.id} className="col">
                <CategoryCard category={cat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. POPULAR PIZZAS */}
      <section className="py-5 bg-light-subtle">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-end mb-4">
            <div>
              <span className="badge bg-warning text-dark fw-bold rounded-pill px-3 py-1 mb-2">
                <i className="bi bi-fire me-1"></i> Hot & Trending
              </span>
              <h2 className="fw-bold text-dark mb-0">Popular PizzaHub Slices</h2>
            </div>
            <Link to="/menu" className="btn btn-danger btn-sm rounded-pill px-4 fw-bold shadow-sm">
              Explore Full Menu
            </Link>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {popularPizzas.map(pizza => (
              <div key={pizza.id} className="col">
                <PizzaCard pizza={pizza} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BESTSELLERS HIGHLIGHT */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-danger text-white fw-bold rounded-pill px-3 py-1 mb-2">
              Customer Favorites
            </span>
            <h2 className="fw-bold text-dark mb-2">All-Time Bestsellers</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Handcrafted classics loved by hundreds of thousands of foodies. Baked fresh upon your order.
            </p>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {bestsellerPizzas.map(pizza => (
              <div key={pizza.id} className="col">
                <PizzaCard pizza={pizza} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SPECIAL OFFERS & DEALS */}
      <section className="py-5 bg-light-subtle">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-end mb-4">
            <div>
              <span className="badge bg-success-subtle text-success fw-bold rounded-pill px-3 py-1 mb-2">
                Big Value Deals
              </span>
              <h2 className="fw-bold text-dark mb-0">Today's Hottest Offers</h2>
            </div>
            <Link to="/offers" className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-semibold">
              View All 6 Offers <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {offers.slice(0, 3).map(offer => (
              <div key={offer.id} className="col-12 col-md-4">
                <OfferCard offer={offer} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE PIZZAHUB? */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-danger-subtle text-danger fw-bold rounded-pill px-3 py-1 mb-2">
              The PizzaHub Difference
            </span>
            <h2 className="fw-bold text-dark mb-2">Why Choose PizzaHub?</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
              We obsess over every detail: from our natural sourdough fermentation to our 450°C stone deck ovens.
            </p>
          </div>

          <div className="row g-4">
            {whyChooseUsFeatures.map((feat, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-lg-4">
                <div className="feature-card p-4 rounded-4 border bg-light h-100 shadow-sm transition-all text-start">
                  <div className="icon-wrapper d-inline-flex align-items-center justify-content-center rounded-3 bg-danger text-white p-3 mb-3 shadow-sm">
                    <i className={`bi ${feat.icon} fs-4`}></i>
                  </div>
                  <h5 className="fw-bold text-dark mb-2">{feat.title}</h5>
                  <p className="text-muted small mb-0">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BUILD YOUR CUSTOM PIZZA CALLOUT */}
      <section className="py-5">
        <div className="container">
          <div className="custom-banner bg-dark text-white rounded-5 p-4 p-md-5 position-relative overflow-hidden shadow-lg border border-secondary">
            <div className="row align-items-center g-4 position-relative z-1">
              <div className="col-12 col-md-8">
                <span className="badge bg-warning text-dark fw-bold rounded-pill px-3 py-1 mb-3">
                  <i className="bi bi-stars me-1"></i> PizzaHub Studio
                </span>
                <h2 className="fw-black display-6 mb-3">
                  Be Your Own Pizza Masterpiece Chef!
                </h2>
                <p className="lead text-light opacity-75 mb-4 pe-md-4">
                  Not a fan of standard toppings? Choose your base, pick size & crust, and pile on your favorite toppings with live dynamic pricing.
                </p>
                <Link to="/custom-pizza" className="btn btn-danger btn-lg rounded-pill px-4 fw-bold shadow hover-scale">
                  <i className="bi bi-magic me-2"></i> Launch Pizza Builder
                </Link>
              </div>

              <div className="col-12 col-md-4 text-center">
                <div className="display-1 text-warning">
                  🍕✨
                </div>
                <div className="fw-bold text-white mt-2">100% Handcrafted by You</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
