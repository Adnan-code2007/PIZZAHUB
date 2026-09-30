import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePizzaHub } from '../context/PizzaHubContext';
import OrderTracking from './OrderTracking';
import { fallbackPizzaImage } from '../data/pizzas';

const OrderCard = ({ order }) => {
  const [showTracking, setShowTracking] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { reorder, advanceOrderStatus } = usePizzaHub();
  const navigate = useNavigate();

  const handleReorder = () => {
    reorder(order.id);
    navigate('/cart');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-success text-white';
      case 'Out for Delivery':
        return 'bg-warning text-dark';
      case 'Preparing':
      case 'Order Confirmed':
        return 'bg-primary text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  return (
    <div className="card order-card border-0 rounded-4 shadow-sm mb-4 overflow-hidden">
      {/* Header */}
      <div className="card-header bg-white border-bottom p-3 p-md-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            <div className="d-flex align-items-center gap-2">
              <h6 className="fw-bold text-dark mb-0 font-monospace fs-5">
                <i className="bi bi-receipt text-danger me-2"></i>
                {order.id}
              </h6>
              <span className={`badge rounded-pill fw-bold px-3 py-1 ${getStatusBadge(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="text-muted small mt-1">
              <i className="bi bi-clock me-1"></i> Placed on {order.date}
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3 fw-bold ${
                showTracking ? 'btn-danger text-white' : 'btn-outline-danger'
              }`}
              onClick={() => setShowTracking(!showTracking)}
            >
              <i className="bi bi-geo-alt-fill me-1"></i>
              {showTracking ? 'Hide Tracking' : 'Track Order'}
            </button>

            <button
              type="button"
              className="btn btn-danger btn-sm rounded-pill px-3 fw-bold shadow-sm hover-scale"
              onClick={handleReorder}
              title="Add items to cart and reorder"
            >
              <i className="bi bi-arrow-repeat me-1"></i> Reorder
            </button>
          </div>
        </div>
      </div>

      {/* Tracking section toggle */}
      {showTracking && (
        <div className="p-3 bg-light border-bottom">
          <OrderTracking
            status={order.status}
            orderId={order.id}
            onAdvance={advanceOrderStatus}
          />
        </div>
      )}

      {/* Items list */}
      <div className="card-body p-3 p-md-4">
        <div className="row g-3">
          {order.items.map((it, idx) => (
            <div key={idx} className="col-12 col-md-6">
              <div className="d-flex align-items-center gap-3 p-2 rounded-3 bg-light-subtle border">
                <img
                  src={it.image}
                  alt={it.name}
                  className="rounded-3 object-fit-cover shadow-sm"
                  style={{ width: '60px', height: '60px' }}
                  onError={(e) => {
                    e.target.src = fallbackPizzaImage;
                  }}
                />
                <div className="flex-grow-1 overflow-hidden">
                  <div className="fw-bold text-dark text-truncate small">{it.name}</div>
                  <div className="small text-muted" style={{ fontSize: '0.75rem' }}>
                    {it.size} • {it.crust}
                  </div>
                  {it.toppings && it.toppings.length > 0 && (
                    <div className="small text-muted text-truncate" style={{ fontSize: '0.7rem' }}>
                      Toppings: {it.toppings.join(', ')}
                    </div>
                  )}
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <span className="badge bg-secondary-subtle text-dark small">Qty: {it.quantity}</span>
                    <span className="fw-bold text-danger small">₹{it.price * it.quantity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Address and payment info */}
        <div className="row mt-4 pt-3 border-top g-3">
          <div className="col-12 col-md-7">
            <h6 className="fw-bold text-dark small mb-1">
              <i className="bi bi-pin-map-fill text-danger me-1"></i> Delivery Address:
            </h6>
            <p className="text-muted small mb-0">
              {order.address?.fullName}, {order.address?.flatNo}, {order.address?.street}, {order.address?.area}, {order.address?.city} - {order.address?.pincode}
            </p>
            <div className="small text-muted mt-1">
              <i className="bi bi-telephone me-1"></i> {order.address?.mobile}
            </div>
          </div>

          <div className="col-12 col-md-5 text-md-end">
            <div className="small text-muted mb-1">
              Payment via: <strong className="text-dark">{order.payment?.method || 'Online'}</strong>
            </div>
            {order.couponCode && (
              <div className="small text-success mb-1">
                <i className="bi bi-tag-fill me-1"></i> Coupon Applied: {order.couponCode} (-₹{order.discount})
              </div>
            )}
            <div className="fs-5 fw-bold text-danger">
              Total Paid: ₹{order.total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
