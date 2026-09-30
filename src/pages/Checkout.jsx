import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePizzaHub } from '../context/PizzaHubContext';

const Checkout = () => {
  const navigate = useNavigate();
  const {
    cart,
    itemTotal,
    deliveryFee,
    taxes,
    discount,
    grandTotal,
    coupon,
    deliveryType,
    setDeliveryType,
    createOrder,
    currentUser,
    addresses,
    addAddress
  } = usePizzaHub();

  // If cart is empty, redirect to cart
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  // Address Form State
  const defaultSaved = addresses[0] || {};
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || defaultSaved.fullName || '',
    mobile: currentUser?.mobile || defaultSaved.mobile || '',
    flatNo: defaultSaved.flatNo || '',
    street: defaultSaved.street || '',
    area: defaultSaved.area || '',
    city: defaultSaved.city || 'Bengaluru',
    state: defaultSaved.state || 'Karnataka',
    pincode: defaultSaved.pincode || '560038',
    saveForFuture: true
  });

  const [formErrors, setFormErrors] = useState({});

  // Payment Method: 'upi' | 'card' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [cardData, setCardData] = useState({
    cardNumber: '4532 8901 2345 6789',
    cardHolder: currentUser?.fullName || 'John Doe',
    expiry: '12/28',
    cvv: '842'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Address validation
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile Number is required.';
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      errors.mobile = 'Enter a valid 10-digit mobile number.';
    }
    if (!formData.flatNo.trim()) errors.flatNo = 'House / Flat number is required.';
    if (!formData.street.trim()) errors.street = 'Street address is required.';
    if (!formData.area.trim()) errors.area = 'Area / Landmark is required.';
    if (!formData.city.trim()) errors.city = 'City is required.';
    if (!formData.pincode.trim()) {
      errors.pincode = 'Pincode is required.';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      errors.pincode = 'Enter a valid 6-digit pincode.';
    }

    if (paymentMethod === 'upi' && !upiId.trim()) {
      errors.upi = 'Please enter a valid UPI ID.';
    }

    if (paymentMethod === 'card') {
      if (!cardData.cardNumber.trim()) errors.card = 'Card number is required.';
      if (!cardData.cardHolder.trim()) errors.cardHolder = 'Cardholder name is required.';
      if (!cardData.expiry.trim()) errors.expiry = 'Expiry is required.';
      if (!cardData.cvv.trim()) errors.cvv = 'CVV is required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    if (formData.saveForFuture) {
      addAddress({
        fullName: formData.fullName,
        mobile: formData.mobile,
        flatNo: formData.flatNo,
        street: formData.street,
        area: formData.area,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        tag: 'Home'
      });
    }

    setTimeout(() => {
      const orderDetails = {
        address: formData,
        payment: {
          method: paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'card' ? 'Credit / Debit Card' : 'Cash on Delivery',
          details: paymentMethod === 'upi' ? upiId : paymentMethod === 'card' ? `Card ending in ${cardData.cardNumber.slice(-4)}` : 'COD'
        }
      };

      const placedOrder = createOrder(orderDetails);
      setIsSubmitting(false);
      navigate('/order-success', { state: { order: placedOrder } });
    }, 1200);
  };

  return (
    <div className="checkout-page py-5 bg-light-subtle min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-black text-dark mb-1">Checkout & Place Order</h2>
          <p className="text-muted small mb-0">Provide delivery details and choose your payment method.</p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="row g-4 g-lg-5">
            {/* Left Column: Delivery Address & Payment */}
            <div className="col-12 col-lg-8">
              {/* 1. DELIVERY ADDRESS FORM */}
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-dark mb-0">
                    <span className="badge bg-danger rounded-circle me-2">1</span>
                    Delivery Address
                  </h5>
                  {addresses.length > 0 && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm rounded-pill"
                      onClick={() => {
                        const saved = addresses[0];
                        setFormData({
                          ...formData,
                          fullName: saved.fullName,
                          mobile: saved.mobile,
                          flatNo: saved.flatNo,
                          street: saved.street,
                          area: saved.area,
                          city: saved.city,
                          state: saved.state,
                          pincode: saved.pincode
                        });
                      }}
                    >
                      <i className="bi bi-clock-history me-1"></i> Use Saved Address
                    </button>
                  )}
                </div>

                <div className="row g-3">
                  {/* Full Name */}
                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-secondary">Full Name *</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.fullName ? 'is-invalid' : ''}`}
                      placeholder="e.g. Adnan Choudhary"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    {formErrors.fullName && <div className="invalid-feedback">{formErrors.fullName}</div>}
                  </div>

                  {/* Mobile Number */}
                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-secondary">10-Digit Mobile Number *</label>
                    <input
                      type="tel"
                      className={`form-control ${formErrors.mobile ? 'is-invalid' : ''}`}
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    />
                    {formErrors.mobile && <div className="invalid-feedback">{formErrors.mobile}</div>}
                  </div>

                  {/* House / Flat No */}
                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-secondary">House / Flat / Floor No. *</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.flatNo ? 'is-invalid' : ''}`}
                      placeholder="e.g. Flat 402, Sunshine Heights"
                      value={formData.flatNo}
                      onChange={(e) => setFormData({ ...formData, flatNo: e.target.value })}
                    />
                    {formErrors.flatNo && <div className="invalid-feedback">{formErrors.flatNo}</div>}
                  </div>

                  {/* Street */}
                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-secondary">Street / Road *</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.street ? 'is-invalid' : ''}`}
                      placeholder="e.g. 12th Main Road"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    />
                    {formErrors.street && <div className="invalid-feedback">{formErrors.street}</div>}
                  </div>

                  {/* Area */}
                  <div className="col-12 col-sm-4">
                    <label className="form-label small fw-bold text-secondary">Area / Landmark *</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.area ? 'is-invalid' : ''}`}
                      placeholder="e.g. Near Metro Station"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    />
                    {formErrors.area && <div className="invalid-feedback">{formErrors.area}</div>}
                  </div>

                  {/* City */}
                  <div className="col-12 col-sm-4">
                    <label className="form-label small fw-bold text-secondary">City *</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.city ? 'is-invalid' : ''}`}
                      placeholder="e.g. Bengaluru"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                    {formErrors.city && <div className="invalid-feedback">{formErrors.city}</div>}
                  </div>

                  {/* Pincode */}
                  <div className="col-12 col-sm-4">
                    <label className="form-label small fw-bold text-secondary">6-Digit Pincode *</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.pincode ? 'is-invalid' : ''}`}
                      placeholder="e.g. 560038"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    />
                    {formErrors.pincode && <div className="invalid-feedback">{formErrors.pincode}</div>}
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="saveAddressCheck"
                        checked={formData.saveForFuture}
                        onChange={(e) => setFormData({ ...formData, saveForFuture: e.target.checked })}
                      />
                      <label className="form-check-label small text-muted" htmlFor="saveAddressCheck">
                        Save this address to my profile for future orders
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. DELIVERY SPEED */}
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
                <h5 className="fw-bold text-dark mb-3">
                  <span className="badge bg-danger rounded-circle me-2">2</span>
                  Delivery Speed
                </h5>
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <div
                      className={`p-3 rounded-3 border cursor-pointer transition-all d-flex align-items-center gap-3 ${
                        deliveryType === 'standard' ? 'border-danger bg-danger-subtle' : 'bg-light'
                      }`}
                      onClick={() => setDeliveryType('standard')}
                    >
                      <i className="bi bi-bicycle fs-2 text-danger"></i>
                      <div className="flex-grow-1">
                        <div className="fw-bold text-dark">Standard Delivery</div>
                        <div className="small text-muted">Estimated 30-40 mins</div>
                      </div>
                      <span className="fw-bold text-danger">
                        {itemTotal > 800 ? 'FREE' : '₹40'}
                      </span>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div
                      className={`p-3 rounded-3 border cursor-pointer transition-all d-flex align-items-center gap-3 ${
                        deliveryType === 'express' ? 'border-danger bg-danger-subtle' : 'bg-light'
                      }`}
                      onClick={() => setDeliveryType('express')}
                    >
                      <i className="bi bi-rocket-takeoff-fill fs-2 text-danger"></i>
                      <div className="flex-grow-1">
                        <div className="fw-bold text-dark">Express Delivery</div>
                        <div className="small text-muted">Priority Hot in 20-25 mins</div>
                      </div>
                      <span className="fw-bold text-danger">₹70</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. PAYMENT METHOD (Frontend-only UI) */}
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
                <h5 className="fw-bold text-dark mb-3">
                  <span className="badge bg-danger rounded-circle me-2">3</span>
                  Payment Method
                </h5>

                {/* Method Radios */}
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <button
                    type="button"
                    className={`btn rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 ${
                      paymentMethod === 'upi' ? 'btn-danger shadow-sm' : 'btn-outline-secondary'
                    }`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <i className="bi bi-phone"></i> Instant UPI
                  </button>

                  <button
                    type="button"
                    className={`btn rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 ${
                      paymentMethod === 'card' ? 'btn-danger shadow-sm' : 'btn-outline-secondary'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <i className="bi bi-credit-card"></i> Credit / Debit Card
                  </button>

                  <button
                    type="button"
                    className={`btn rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 ${
                      paymentMethod === 'cod' ? 'btn-danger shadow-sm' : 'btn-outline-secondary'
                    }`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <i className="bi bi-cash-stack"></i> Cash on Delivery
                  </button>
                </div>

                {/* UPI Panel */}
                {paymentMethod === 'upi' && (
                  <div className="p-3 bg-light rounded-3 border">
                    <label className="form-label small fw-bold text-secondary">Virtual Payment Address (VPA / UPI ID)</label>
                    <div className="input-group mb-2">
                      <span className="input-group-text bg-white border-end-0">
                        <i className="bi bi-qr-code-scan text-danger"></i>
                      </span>
                      <input
                        type="text"
                        className={`form-control border-start-0 ${formErrors.upi ? 'is-invalid' : ''}`}
                        placeholder="yourname@okhdfcbank"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </div>
                    {formErrors.upi && <div className="text-danger small mb-2">{formErrors.upi}</div>}
                    <div className="d-flex align-items-center gap-2 mt-2">
                      <span className="small text-muted" style={{ fontSize: '0.75rem' }}>Supported apps:</span>
                      <span className="badge bg-white text-dark border">Google Pay</span>
                      <span className="badge bg-white text-dark border">PhonePe</span>
                      <span className="badge bg-white text-dark border">Paytm</span>
                      <span className="badge bg-white text-dark border">CRED UPI</span>
                    </div>
                  </div>
                )}

                {/* Card Panel */}
                {paymentMethod === 'card' && (
                  <div className="p-3 bg-light rounded-3 border">
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label small fw-bold text-secondary">16-Digit Card Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="4532 8901 2345 6789"
                          value={cardData.cardNumber}
                          onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                        />
                      </div>
                      <div className="col-12 col-sm-6">
                        <label className="form-label small fw-bold text-secondary">Cardholder Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name as on card"
                          value={cardData.cardHolder}
                          onChange={(e) => setCardData({ ...cardData, cardHolder: e.target.value })}
                        />
                      </div>
                      <div className="col-6 col-sm-3">
                        <label className="form-label small fw-bold text-secondary">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM/YY"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        />
                      </div>
                      <div className="col-6 col-sm-3">
                        <label className="form-label small fw-bold text-secondary">CVV</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="***"
                          maxLength={4}
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="small text-muted mt-2">
                      <i className="bi bi-shield-check text-success me-1"></i> Simulated 256-bit encrypted checkout. No real money deducted.
                    </div>
                  </div>
                )}

                {/* COD Panel */}
                {paymentMethod === 'cod' && (
                  <div className="p-3 bg-light rounded-3 border">
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-wallet2 text-success fs-3"></i>
                      <div>
                        <div className="fw-bold text-dark">Pay Cash / UPI upon Arrival</div>
                        <p className="text-muted small mb-0">
                          Keep exact cash of <strong>₹{grandTotal}</strong> or ask your delivery partner for the QR code scanner when your order arrives.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary Sidebar */}
            <div className="col-12 col-lg-4">
              <div className="sticky-lg-top" style={{ top: '100px' }}>
                <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
                  <h5 className="fw-bold text-dark mb-3 border-bottom pb-2">Order Items ({cart.length})</h5>

                  {/* Compact Cart List */}
                  <div className="cart-preview-list mb-3 overflow-y-auto" style={{ maxHeight: '220px' }}>
                    {cart.map(item => (
                      <div key={item.cartItemId} className="d-flex justify-content-between align-items-center mb-2 small">
                        <div className="pe-2 text-truncate">
                          <strong className="text-dark d-block text-truncate">{item.name}</strong>
                          <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                            {item.size} • Qty: {item.quantity}
                          </span>
                        </div>
                        <span className="fw-bold text-danger text-nowrap">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-top pt-3">
                    <div className="d-flex justify-content-between mb-2 small">
                      <span className="text-muted">Item Subtotal</span>
                      <span className="fw-bold text-dark">₹{itemTotal}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-2 small">
                      <span className="text-muted">Delivery Charges</span>
                      <span className="fw-bold text-dark">
                        {deliveryFee === 0 ? <span className="text-success">FREE</span> : `₹${deliveryFee}`}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mb-2 small">
                      <span className="text-muted">GST & Food Taxes (5%)</span>
                      <span className="fw-bold text-dark">₹{taxes}</span>
                    </div>

                    {discount > 0 && (
                      <div className="d-flex justify-content-between mb-2 small text-success fw-bold">
                        <span>Coupon ({coupon?.code})</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}

                    <div className="border-top pt-3 mt-2 mb-4 d-flex justify-content-between align-items-center">
                      <span className="fw-bold fs-5 text-dark">Total Payable</span>
                      <span className="fw-black fs-3 text-danger">₹{grandTotal}</span>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-danger btn-lg w-100 rounded-pill fw-bold shadow hover-scale py-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Placing Your Order...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-bag-check-fill me-2"></i> Place Order (₹{grandTotal})
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
