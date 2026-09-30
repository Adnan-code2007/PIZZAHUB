import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { usePizzaHub } from '../context/PizzaHubContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, currentUser } = usePizzaHub();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to profile
  const redirectPath = location.state?.from?.pathname || '/profile';

  if (currentUser) {
    navigate(redirectPath, { replace: true });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success) {
        navigate(redirectPath, { replace: true });
      } else {
        setErrorMsg(res.message);
      }
    }, 400);
  };

  const handleDemoFill = () => {
    setEmail('demo@pizzahub.com');
    setPassword('password123');
    setErrorMsg('');
  };

  const handleGoogleLogin = () => {
    login('demo@pizzahub.com', 'password123');
    navigate(redirectPath, { replace: true });
  };

  return (
    <div className="login-page py-5 bg-light-subtle min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <div className="card border-0 rounded-4 shadow-lg p-4 p-md-5 bg-white">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="brand-logo-icon bg-danger text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ width: '56px', height: '56px', fontSize: '1.8rem' }}>
                  🍕
                </div>
                <h3 className="fw-black text-dark mb-1">Welcome to PizzaHub</h3>
                <p className="text-muted small">Log in to view saved orders, coupons, and addresses</p>
              </div>

              {/* Error message */}
              {errorMsg && (
                <div className="alert alert-danger py-2 px-3 rounded-3 small mb-3">
                  <i className="bi bi-exclamation-triangle-fill me-1"></i> {errorMsg}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control border-start-0 shadow-none"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between">
                    <label className="form-label small fw-bold text-secondary">Password</label>
                    <span className="small text-danger cursor-pointer" onClick={() => alert('For testing, please use demo credentials: demo@pizzahub.com / password123')}>
                      Forgot?
                    </span>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control border-start-0 shadow-none"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
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
                    'Log In'
                  )}
                </button>
              </form>

              {/* Demo Credentials Helper Button */}
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm w-100 rounded-pill fw-semibold"
                  onClick={handleDemoFill}
                >
                  <i className="bi bi-key me-1 text-danger"></i> Fill Demo Credentials (demo@pizzahub.com)
                </button>
              </div>

              {/* Divider */}
              <div className="d-flex align-items-center my-3">
                <hr className="flex-grow-1" />
                <span className="px-3 small text-muted">OR</span>
                <hr className="flex-grow-1" />
              </div>

              {/* Google Button */}
              <button
                type="button"
                className="btn btn-light border w-100 rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 mb-4 hover-bg"
                onClick={handleGoogleLogin}
              >
                <i className="bi bi-google text-danger"></i> Continue with Google
              </button>

              {/* Register Link */}
              <div className="text-center text-muted small">
                Don't have an account?{' '}
                <Link to="/register" className="text-danger fw-bold text-decoration-none">
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
