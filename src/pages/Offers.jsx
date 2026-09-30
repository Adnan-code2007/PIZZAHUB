import React from 'react';
import { offers } from '../data/offers';
import OfferCard from '../components/OfferCard';

const Offers = () => {
  return (
    <div className="offers-page py-5 bg-light-subtle min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge bg-danger-subtle text-danger fw-bold rounded-pill px-3 py-1 mb-2">
            🏷️ Deals & Discounts
          </span>
          <h1 className="fw-black display-6 text-dark mb-2">PizzaHub Special Offers</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Enjoy unbelievable savings on your favorite pizzas, combo meals, and sides. Click to copy any coupon code and apply during checkout!
          </p>
        </div>

        {/* Offers Grid */}
        <div className="row g-4">
          {offers.map(offer => (
            <div key={offer.id} className="col-12 col-md-6 col-lg-4">
              <OfferCard offer={offer} />
            </div>
          ))}
        </div>

        {/* Terms note */}
        <div className="card border-0 rounded-4 shadow-sm bg-white p-4 mt-5">
          <h6 className="fw-bold text-dark mb-2">
            <i className="bi bi-info-circle-fill text-danger me-2"></i> Terms & Conditions for Coupon Codes:
          </h6>
          <ul className="text-muted small mb-0 ps-3">
            <li>Coupons are valid on all handcrafted pizzas, combos, and sides, unless specified.</li>
            <li>Only one promotional code can be applied per checkout order.</li>
            <li>Minimum order amounts exclude delivery fee and applicable taxes.</li>
            <li>PizzaHub reserves the right to modify or cancel offers at any time without prior notice.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Offers;
