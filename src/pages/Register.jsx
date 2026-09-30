import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePizzaHub } from '../context/PizzaHubContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, currentUser } = usePizzaHub();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (currentUser) {
    navigate('/profile', { replace: true });
  }

  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required.';
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      errors.mobile = 'Enter a valid 10-digit mobile number.';
    }
    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      const res = register({
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password
      });
      setLoading(false);
      if (res.success) {
        navigate('/profile');
      } else {
        setFormErrors({ general: res.message });
      }
    }, 400);
  };

  return (
    <div className="register-page py-5 bg-light-subtle min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <div className="card border-0 rounded-4 shadow-lg p-4 p-md-5 bg-white">
              <div className="text-center mb-4">
                <div className="brand-logo-icon bg-danger text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ width: '56px', height: '56px', fontSize: '1.8rem' }}>
                  🍕
                </div>
                <h3 className="fw-black text-dark mb-1">Create a PizzaHub Account</h3>
                <p className="text-muted small">Join now to save your addresses and get exclusive coupons</p>
              </div>

              {formErrors.general && (
                <div className="alert alert-danger py-2 px-3 rounded-3 small mb-3">
                  <i className="bi bi-exclamation-triangle-fill me-1"></i> {formErrors.general}
                </div>
              )}

              <form onSubmit={handleRegister}>
                {/* Full Name */}
                <div className="mb-3">
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

                {/* Email Address */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">Email Address *</label>
                  <input
                    type="email"
                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                    placeholder="e.g. adnan@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                </div>

                {/* Mobile Number */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">10-Digit Mobile Number *</label>
                  <input
                    type="tel"
                    maxLength={10}
                    className={`form-control ${formErrors.mobile ? 'is-invalid' : ''}`}
                    placeholder="e.g. 9876543210"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  />
                  {formErrors.mobile && <div className="invalid-feedback">{formErrors.mobile}</div>}
                </div>

                {/* Password & Confirm Password */}
                <div className="row g-2 mb-4">
                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-secondary">Password *</label>
                    <input
                      type="password"
                      className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                      placeholder="Min 6 characters"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-secondary">Confirm Password *</label>
                    <input
                      type="password"
                      className={`form-control ${formErrors.confirmPassword ? 'is-invalid' : ''}`}
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                    {formErrors.confirmPassword && <div className="invalid-feedback">{formErrors.confirmPassword}</div>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-danger btn-lg w-100 rounded-pill fw-bold shadow-sm hover-scale mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              <div className="text-center text-muted small mt-3">
                Already have an account?{' '}
                <Link to="/login" className="text-danger fw-bold text-decoration-none">
                  Log in here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
