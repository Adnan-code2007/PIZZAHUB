import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePizzaHub } from '../context/PizzaHubContext';
import CartItem from '../components/CartItem';
import EmptyState from '../components/EmptyState';
import { offers } from '../data/offers';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    clearCart,
    itemTotal,
    deliveryFee,
    taxes,
    discount,
    grandTotal,
    coupon,
    applyCoupon,
    removeCoupon,
    deliveryType,
    setDeliveryType,
    currentUser
  } = usePizzaHub();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (codeToApply) => {
    setCouponError('');
    const code = codeToApply || couponInput;
    if (!code.trim()) {
      setCouponError('Please enter a coupon code.');
      return;
    }
    const res = applyCoupon(code);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    if (!currentUser) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page py-5 min-vh-100 bg-light-subtle d-flex align-items-center">
        <div className="container">
          <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white text-center mx-auto" style={{ maxWidth: '600px' }}>
            <EmptyState
              icon="bi-cart-x"
              title="Your Cart is Empty"
              message="Looks like you haven't added any cheesy pizzas or mouth-watering treats to your cart yet!"
              btnText="Explore PizzaHub Menu"
              btnLink="/menu"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page py-5 bg-light-subtle min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <div>
            <h2 className="fw-black text-dark mb-0">Shopping Cart</h2>
            <p className="text-muted small mb-0">Review your chosen pizzas and toppings before checkout</p>
          </div>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm rounded-pill px-3 mt-2 mt-sm-0"
            onClick={clearCart}
          >
            <i className="bi bi-trash3 me-1"></i> Clear Cart
          </button>
        </div>

        <div className="row g-4 g-lg-5">
          {/* Left Column: Cart Items List */}
          <div className="col-12 col-lg-7">
            <div className="cart-items-wrapper">
              {cart.map(item => (
                <CartItem key={item.cartItemId} item={item} />
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <Link to="/menu" className="btn btn-outline-secondary rounded-pill px-4 btn-sm fw-semibold">
                <i className="bi bi-arrow-left me-1"></i> Add More Pizzas
              </Link>
              <Link to="/custom-pizza" className="btn btn-outline-danger rounded-pill px-4 btn-sm fw-semibold">
                <i className="bi bi-plus-circle me-1"></i> Build Custom Pizza
              </Link>
            </div>
          </div>

          {/* Right Column: Coupon & Order Summary */}
          <div className="col-12 col-lg-5">
            <div className="sticky-lg-top" style={{ top: '100px' }}>
              {/* Delivery Speed Selector */}
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
                <h6 className="fw-bold text-dark mb-3">
                  <i className="bi bi-lightning-charge-fill text-danger me-2"></i> Delivery Speed
                </h6>
                <div className="row g-2">
                  <div className="col-6">
                    <div
                      className={`p-3 rounded-3 border cursor-pointer transition-all text-center ${
                        deliveryType === 'standard' ? 'border-danger bg-danger-subtle' : 'bg-light'
                      }`}
                      onClick={() => setDeliveryType('standard')}
                    >
                      <i className="bi bi-bicycle fs-4 text-danger d-block mb-1"></i>
                      <div className="fw-bold small text-dark">Standard Delivery</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>30-40 mins</div>
                      <div className="fw-bold text-danger small mt-1">
                        {itemTotal > 800 ? 'FREE' : '₹40'}
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div
                      className={`p-3 rounded-3 border cursor-pointer transition-all text-center ${
                        deliveryType === 'express' ? 'border-danger bg-danger-subtle' : 'bg-light'
                      }`}
                      onClick={() => setDeliveryType('express')}
                    >
                      <i className="bi bi-rocket-takeoff-fill fs-4 text-danger d-block mb-1"></i>
                      <div className="fw-bold small text-dark">Express Priority</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>20-25 mins</div>
                      <div className="fw-bold text-danger small mt-1">₹70</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coupon Box */}
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
                <h6 className="fw-bold text-dark mb-2">
                  <i className="bi bi-ticket-perforated-fill text-danger me-2"></i> Apply Coupon
                </h6>

                {coupon ? (
                  <div className="alert alert-success d-flex justify-content-between align-items-center mb-0 rounded-3 py-2 px-3">
                    <div>
                      <strong className="text-success">{coupon.code}</strong> applied!
                      <div className="small text-muted" style={{ fontSize: '0.75rem' }}>
                        Saved ₹{discount} on this order.
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm rounded-pill px-2 py-0"
                      onClick={removeCoupon}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control text-uppercase shadow-none border-secondary-subtle"
                        placeholder="e.g. PIZZA100"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-danger fw-bold px-3"
                        onClick={() => handleApplyCoupon()}
                      >
                        Apply
                      </button>
                    </div>

                    {couponError && (
                      <div className="text-danger small mb-2">
                        <i className="bi bi-exclamation-circle me-1"></i> {couponError}
                      </div>
                    )}

                    {/* Quick Available Coupons */}
                    <div className="mt-2">
                      <span className="small text-muted d-block mb-1" style={{ fontSize: '0.75rem' }}>
                        Available Deals:
                      </span>
                      <div className="d-flex flex-wrap gap-1">
                        {offers.slice(0, 3).map(of => (
                          <button
                            key={of.id}
                            type="button"
                            className="btn btn-sm btn-outline-secondary rounded-pill py-0 px-2 small font-monospace"
                            style={{ fontSize: '0.75rem' }}
                            onClick={() => handleApplyCoupon(of.code)}
                          >
                            {of.code} (-₹{of.discount})
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Order Summary */}
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
                <h5 className="fw-bold text-dark mb-3 border-bottom pb-2">Order Summary</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Item Total</span>
                  <span className="fw-bold text-dark">₹{itemTotal}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Delivery Fee</span>
                  <span className="fw-bold text-dark">
                    {deliveryFee === 0 ? <span className="text-success">FREE</span> : `₹${deliveryFee}`}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Taxes (5% GST)</span>
                  <span className="fw-bold text-dark">₹{taxes}</span>
                </div>

                {discount > 0 && (
                  <div className="d-flex justify-content-between mb-2 text-success fw-bold">
                    <span>Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="border-top pt-3 mt-2 mb-4 d-flex justify-content-between align-items-center">
                  <span className="fw-bold fs-5 text-dark">Grand Total</span>
                  <span className="fw-black fs-3 text-danger">₹{grandTotal}</span>
                </div>

                <button
                  type="button"
                  className="btn btn-danger btn-lg w-100 rounded-pill fw-bold shadow hover-scale py-3"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout <i className="bi bi-arrow-right ms-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
