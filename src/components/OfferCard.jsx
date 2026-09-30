import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePizzaHub } from '../context/PizzaHubContext';

const OfferCard = ({ offer, inCartView = false }) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { applyCoupon, coupon } = usePizzaHub();

  const isApplied = coupon && coupon.code === offer.code;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApply = (e) => {
    e.stopPropagation();
    applyCoupon(offer.code);
  };

  return (
    <div className="card h-100 offer-card border-0 rounded-4 shadow-sm overflow-hidden text-white position-relative" style={{ background: offer.gradient || 'linear-gradient(135deg, #d62828 0%, #b7094c 100%)' }}>
      <div className="card-body p-4 d-flex flex-column justify-content-between position-relative z-1">
        {/* Header */}
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge bg-white text-dark rounded-pill fw-bold px-3 py-1 small shadow-sm">
              <i className={`bi ${offer.icon || 'bi-tag-fill'} me-1 text-danger`}></i>
              {offer.badge}
            </span>
            <span className="small text-white-50">{offer.validity}</span>
          </div>

          <h4 className="fw-bold mb-1">{offer.title}</h4>
          <p className="text-white-50 small mb-3">{offer.subtitle}</p>
          <p className="small mb-4 text-white opacity-90">{offer.description}</p>
        </div>

        {/* Coupon Code Section */}
        <div className="bg-black bg-opacity-25 rounded-3 p-3 border border-white border-opacity-25 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mt-auto">
          <div>
            <div className="text-white-50 small" style={{ fontSize: '0.75rem' }}>COUPON CODE</div>
            <div className="fw-black fs-5 letter-spacing-1 text-warning font-monospace">{offer.code}</div>
            <div className="text-white-50 small" style={{ fontSize: '0.75rem' }}>Min order: ₹{offer.minOrder}</div>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3 fw-bold shadow-sm transition-all ${
                copied ? 'btn-success text-white' : 'btn-light text-dark'
              }`}
              onClick={handleCopy}
            >
              <i className={`bi ${copied ? 'bi-check2' : 'bi-clipboard'} me-1`}></i>
              {copied ? 'Copied!' : 'Copy Code'}
            </button>

            {inCartView ? (
              <button
                type="button"
                className={`btn btn-sm rounded-pill px-3 fw-bold ${
                  isApplied ? 'btn-warning text-dark' : 'btn-outline-light'
                }`}
                onClick={handleApply}
                disabled={isApplied}
              >
                {isApplied ? 'Applied' : 'Apply'}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline-light btn-sm rounded-pill px-3 fw-semibold"
                onClick={() => navigate('/menu')}
              >
                Order Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Decorative background shape */}
      <div className="position-absolute end-0 bottom-0 opacity-10 pe-none me-n4 mb-n4">
        <i className="bi bi-tag-fill" style={{ fontSize: '10rem' }}></i>
      </div>
    </div>
  );
};

export default OfferCard;
