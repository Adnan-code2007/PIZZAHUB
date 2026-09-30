import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePizzaHub } from '../context/PizzaHubContext';

const Footer = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = usePizzaHub();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      showToast('Thank you for subscribing! Check your inbox for secret discounts 🎁');
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="footer bg-dark-custom text-light pt-5 pb-4 mt-auto border-top border-secondary">
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Brand Col */}
          <div className="col-12 col-md-4">
            <Link to="/" className="d-flex align-items-center gap-2 mb-3 text-decoration-none">
              <div className="brand-logo-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm">
                🍕
              </div>
              <div>
                <span className="fw-black text-white fs-4">PIZZA</span>
                <span className="fw-black text-danger fs-4">HUB</span>
              </div>
            </Link>
            <p className="text-secondary small pe-md-4 mb-4">
              Handcrafting artisanal sourdough crusts, slow-simmered vine-ripened tomato sauces, and 100% genuine mozzarella cheese. Delivered smoking hot in 30 minutes!
            </p>
            <div className="d-flex gap-2">
              <a href="#facebook" className="btn btn-outline-secondary text-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }} aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#instagram" className="btn btn-outline-secondary text-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }} aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#twitter" className="btn btn-outline-secondary text-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }} aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#youtube" className="btn btn-outline-secondary text-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }} aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-white mb-3 text-uppercase letter-spacing-1 small">Explore</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/" className="text-secondary text-decoration-none hover-text-danger">Home</Link></li>
              <li><Link to="/menu" className="text-secondary text-decoration-none hover-text-danger">Full Menu</Link></li>
              <li><Link to="/custom-pizza" className="text-secondary text-decoration-none hover-text-danger">Build Your Pizza</Link></li>
              <li><Link to="/offers" className="text-secondary text-decoration-none hover-text-danger">Deals & Coupons</Link></li>
              <li><Link to="/my-orders" className="text-secondary text-decoration-none hover-text-danger">Track My Orders</Link></li>
              <li><Link to="/wishlist" className="text-secondary text-decoration-none hover-text-danger">My Wishlist</Link></li>
            </ul>
          </div>

          {/* Policies & Help */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-white mb-3 text-uppercase letter-spacing-1 small">Support & Legal</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><a href="#about" className="text-secondary text-decoration-none hover-text-danger">About PizzaHub</a></li>
              <li><a href="#support" className="text-secondary text-decoration-none hover-text-danger">Help & FAQs</a></li>
              <li><a href="#terms" className="text-secondary text-decoration-none hover-text-danger">Terms & Conditions</a></li>
              <li><a href="#privacy" className="text-secondary text-decoration-none hover-text-danger">Privacy Policy</a></li>
              <li><a href="#refund" className="text-secondary text-decoration-none hover-text-danger">Refund & Cancellation</a></li>
              <li><a href="#nutrition" className="text-secondary text-decoration-none hover-text-danger">Nutrition & Allergens</a></li>
            </ul>
          </div>

          {/* Newsletter and Contact */}
          <div className="col-12 col-md-4">
            <h6 className="fw-bold text-white mb-3 text-uppercase letter-spacing-1 small">Stay in the Loop</h6>
            <p className="text-secondary small mb-3">
              Subscribe for exclusive flash sales, free garlic bread coupons, and secret weekend slices!
            </p>
            <form onSubmit={handleSubscribe} className="mb-3">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control bg-dark border-secondary text-white shadow-none"
                  placeholder="Enter your email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-danger fw-bold px-3">
                  Join
                </button>
              </div>
              {subscribed && (
                <div className="text-success small mt-1">
                  <i className="bi bi-check2-circle me-1"></i> Subscribed successfully!
                </div>
              )}
            </form>

            <div className="d-flex align-items-center gap-3 mt-4 pt-3 border-top border-secondary">
              <div className="rounded-circle bg-danger-subtle text-danger p-2 d-flex align-items-center justify-content-center">
                <i className="bi bi-headset fs-5"></i>
              </div>
              <div>
                <span className="d-block text-secondary small">Toll Free 24/7 Hotline:</span>
                <span className="fw-bold text-white fs-6">1800-PIZZA-HUB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="row pt-4 border-top border-secondary-subtle align-items-center text-center text-md-start">
          <div className="col-12 col-md-6 small text-secondary mb-3 mb-md-0">
            © {new Date().getFullYear()} <strong>PizzaHub</strong> Inc. All Rights Reserved. Crafted with passion & fresh dough.
          </div>
          <div className="col-12 col-md-6 text-center text-md-end">
            <span className="small text-secondary me-2">Secure Payments with:</span>
            <span className="badge bg-dark border border-secondary text-secondary me-1">UPI</span>
            <span className="badge bg-dark border border-secondary text-secondary me-1">VISA</span>
            <span className="badge bg-dark border border-secondary text-secondary me-1">Mastercard</span>
            <span className="badge bg-dark border border-secondary text-secondary">Cash On Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
