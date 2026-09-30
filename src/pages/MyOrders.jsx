import React from 'react';
import { Link } from 'react-router-dom';
import { usePizzaHub } from '../context/PizzaHubContext';
import OrderCard from '../components/OrderCard';
import EmptyState from '../components/EmptyState';

const MyOrders = () => {
  const { orders } = usePizzaHub();

  return (
    <div className="my-orders-page py-5 bg-light-subtle min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <div>
            <h2 className="fw-black text-dark mb-1">My Orders</h2>
            <p className="text-muted small mb-0">Track active deliveries or reorder your favorite meals with one click</p>
          </div>
          <Link to="/menu" className="btn btn-danger btn-sm rounded-pill px-4 fw-bold mt-2 mt-sm-0 shadow-sm">
            <i className="bi bi-plus-lg me-1"></i> New Order
          </Link>
        </div>

        {/* Orders List / Empty State */}
        {orders.length > 0 ? (
          <div className="orders-list">
            {orders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="card border-0 rounded-4 shadow-sm p-5 bg-white text-center">
            <EmptyState
              icon="bi-box-seam"
              title="No Orders Found"
              message="You haven't placed any orders yet. Discover our oven-hot pizzas and place your first order now!"
              btnText="Explore Menu"
              btnLink="/menu"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
