import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { usePizzaHub } from '../context/PizzaHubContext';
import OrderTracking from '../components/OrderTracking';
import { fallbackPizzaImage } from '../data/pizzas';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orders, advanceOrderStatus } = usePizzaHub();

  // Pick order from route state or fall back to the most recent placed order
  const orderFromState = location.state?.order;
  const recentOrder = orderFromState || (orders.length > 0 ? orders[0] : null);

  // If no order exists at all
  if (!recentOrder) {
    return (
      <div className="container py-5 text-center min-vh-100 d-flex align-items-center justify-content-center">
        <div className="card p-5 border-0 rounded-4 shadow-sm bg-white">
          <i className="bi bi-emoji-neutral text-muted display-1 mb-3"></i>
          <h3 className="fw-bold mb-2">No Recent Order</h3>
          <p className="text-muted mb-4">You have not placed an order yet in this session.</p>
          <Link to="/menu" className="btn btn-danger btn-lg rounded-pill px-4">
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  // Get current status from state/context
  const activeOrderInContext = orders.find(o => o.id === recentOrder.id) || recentOrder;

  return (
    <div className="order-success-page py-5 bg-light-subtle min-vh-100">
      <div className="container">
        {/* Success Banner */}
        <div className="card border-0 rounded-4 shadow-sm bg-white p-4 p-md-5 text-center mb-4">
          <div className="success-icon-wrapper mb-3">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success-subtle text-success p-4 shadow-sm pulse-ring">
              <i className="bi bi-check2-circle display-4"></i>
            </div>
          </div>
          <span className="badge bg-success-subtle text-success fw-bold rounded-pill px-3 py-1 mb-2">
            Payment Confirmed
          </span>
          <h2 className="fw-black text-dark mb-2">🎉 Order Placed Successfully!</h2>
          <p className="text-muted mx-auto mb-3" style={{ maxWidth: '520px' }}>
            Thank you for ordering with PizzaHub! The chef is already rolling out the dough. Your oven-fresh pizza will arrive piping hot.
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-3 mt-2">
            <span className="badge bg-light text-dark border px-3 py-2 fs-6">
              Order ID: <strong className="text-danger font-monospace">{activeOrderInContext.id}</strong>
            </span>
            <span className="badge bg-light text-dark border px-3 py-2 fs-6">
              Estimated Delivery: <strong className="text-success">{activeOrderInContext.estimatedDelivery}</strong>
            </span>
          </div>
        </div>

        {/* Live Order Tracking Timeline */}
        <div className="mb-4">
          <OrderTracking
            status={activeOrderInContext.status}
            orderId={activeOrderInContext.id}
            onAdvance={advanceOrderStatus}
          />
        </div>

        {/* Order Details Invoice Card */}
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="card border-0 rounded-4 shadow-sm bg-white p-4 h-100">
              <h5 className="fw-bold text-dark mb-3 border-bottom pb-2">
                <i className="bi bi-bag-check text-danger me-2"></i> Items in this Order
              </h5>

              <div className="order-items-list mb-3">
                {activeOrderInContext.items?.map((item, idx) => (
                  <div key={idx} className="d-flex align-items-center gap-3 p-3 rounded-3 bg-light mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-3 object-fit-cover shadow-sm"
                      style={{ width: '65px', height: '65px' }}
                      onError={(e) => {
                        e.target.src = fallbackPizzaImage;
                      }}
                    />
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <h6 className="fw-bold mb-1 text-dark">{item.name}</h6>
                        <span className="fw-bold text-danger">₹{item.price * item.quantity}</span>
                      </div>
                      <div className="small text-muted">
                        Size: <strong>{item.size}</strong> • Crust: <strong>{item.crust}</strong>
                      </div>
                      {item.toppings && item.toppings.length > 0 && (
                        <div className="small text-muted">
                          Toppings: {item.toppings.join(', ')}
                        </div>
                      )}
                      <span className="badge bg-secondary-subtle text-dark small mt-1">
                        Qty: {item.quantity} × ₹{item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card border-0 rounded-4 shadow-sm bg-white p-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <h5 className="fw-bold text-dark mb-3 border-bottom pb-2">Delivery Summary</h5>

                <div className="mb-3">
                  <span className="text-muted small d-block mb-1">Delivered To:</span>
                  <div className="fw-bold text-dark">{activeOrderInContext.address?.fullName}</div>
                  <div className="small text-muted">
                    {activeOrderInContext.address?.flatNo}, {activeOrderInContext.address?.street}, {activeOrderInContext.address?.area}, {activeOrderInContext.address?.city} - {activeOrderInContext.address?.pincode}
                  </div>
                  <div className="small text-muted mt-1">
                    <i className="bi bi-phone me-1"></i> {activeOrderInContext.address?.mobile}
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-muted small d-block mb-1">Payment Method:</span>
                  <span className="badge bg-light text-dark border fw-bold">
                    {activeOrderInContext.payment?.method} ({activeOrderInContext.payment?.details})
                  </span>
                </div>

                <div className="p-3 bg-light rounded-3 mb-3 small">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Subtotal:</span>
                    <span>₹{activeOrderInContext.subtotal}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Delivery:</span>
                    <span>{activeOrderInContext.deliveryFee === 0 ? 'FREE' : `₹${activeOrderInContext.deliveryFee}`}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Taxes:</span>
                    <span>₹{activeOrderInContext.taxes}</span>
                  </div>
                  {activeOrderInContext.discount > 0 && (
                    <div className="d-flex justify-content-between mb-1 text-success fw-bold">
                      <span>Discount ({activeOrderInContext.couponCode}):</span>
                      <span>-₹{activeOrderInContext.discount}</span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between border-top pt-2 mt-2 fw-bold text-dark fs-6">
                    <span>Total Paid:</span>
                    <span className="text-danger fs-5">₹{activeOrderInContext.total}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-grid gap-2">
                <Link to="/my-orders" className="btn btn-outline-danger rounded-pill fw-bold">
                  <i className="bi bi-bag-check me-2"></i> View All My Orders
                </Link>
                <Link to="/menu" className="btn btn-danger rounded-pill fw-bold shadow-sm">
                  <i className="bi bi-arrow-left me-2"></i> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
