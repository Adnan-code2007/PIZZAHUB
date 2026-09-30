import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import PizzaDetails from './pages/PizzaDetails';
import CustomPizza from './pages/CustomPizza';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Offers from './pages/Offers';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyOrders from './pages/MyOrders';
import Wishlist from './pages/Wishlist';
import EmptyState from './components/EmptyState';

import { usePizzaHub } from './context/PizzaHubContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Toast notification component
const ToastNotification = () => {
  const { toast } = usePizzaHub();
  if (!toast) return null;

  return (
    <div
      className="position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1090 }}
    >
      <div
        className={`toast show align-items-center text-white border-0 rounded-4 shadow-lg ${
          toast.type === 'info' ? 'bg-dark' : 'bg-danger'
        }`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex p-2 align-items-center">
          <div className="toast-body fs-6 fw-semibold">
            <i className={`bi ${toast.type === 'info' ? 'bi-info-circle-fill' : 'bi-check-circle-fill'} me-2`}></i>
            {toast.message}
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="app-layout d-flex flex-column min-vh-100">
      <ScrollToTop />
      <Navbar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/pizza/:id" element={<PizzaDetails />} />
          <Route path="/custom-pizza" element={<CustomPizza />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <div className="container py-5 text-center my-5">
                <EmptyState
                  icon="bi-signpost-split"
                  title="404 - Page Not Found"
                  message="Oops! The slice you were looking for doesn't exist or was eaten by our chef."
                  btnText="Return to PizzaHub Home"
                  btnLink="/"
                />
              </div>
            }
          />
        </Routes>
      </main>

      <ToastNotification />
      <Footer />
    </div>
  );
}

export default App;
