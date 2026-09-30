import React from 'react';
import QuantitySelector from './QuantitySelector';
import { usePizzaHub } from '../context/PizzaHubContext';
import { fallbackPizzaImage } from '../data/pizzas';

const CartItem = ({ item }) => {
  const { updateCartQuantity, removeFromCart } = usePizzaHub();

  return (
    <div className="cart-item-card p-3 p-md-4 bg-white rounded-4 border shadow-sm mb-3 transition-all">
      <div className="row align-items-center g-3">
        {/* Item Image */}
        <div className="col-3 col-sm-2 col-md-2">
          <div className="position-relative rounded-3 overflow-hidden shadow-sm" style={{ aspectRatio: '1/1' }}>
            <img
              src={item.image}
              alt={item.name}
              className="w-100 h-100 object-fit-cover"
              onError={(e) => {
                e.target.src = fallbackPizzaImage;
              }}
            />
            <span
              className="position-absolute top-0 start-0 m-1 p-1 bg-white rounded-circle shadow-sm border"
              title={item.veg ? 'Pure Veg' : 'Non-Veg'}
            >
              <span
                className={`d-block rounded-circle ${item.veg ? 'bg-success' : 'bg-danger'}`}
                style={{ width: '8px', height: '8px' }}
              ></span>
            </span>
          </div>
        </div>

        {/* Item Details */}
        <div className="col-9 col-sm-5 col-md-5">
          <div className="d-flex align-items-start justify-content-between">
            <h6 className="fw-bold text-dark mb-1">{item.name}</h6>
            <button
              type="button"
              className="btn btn-link text-danger p-0 ms-2 d-sm-none"
              onClick={() => removeFromCart(item.cartItemId)}
              title="Remove item"
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>

          <div className="d-flex flex-wrap gap-1 mb-2">
            <span className="badge bg-light text-dark border small fw-normal">
              Size: <strong>{item.size}</strong>
            </span>
            <span className="badge bg-light text-dark border small fw-normal">
              Crust: <strong>{item.crust}</strong>
            </span>
          </div>

          {item.toppings && item.toppings.length > 0 && (
            <div className="small text-muted line-clamp-1 mb-1">
              <i className="bi bi-layers-fill text-danger me-1"></i>
              Toppings: {item.toppings.join(', ')}
            </div>
          )}

          <div className="small text-muted">
            ₹{item.price} each
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="col-6 col-sm-3 col-md-3 text-sm-center">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => updateCartQuantity(item.cartItemId, 1)}
            onDecrease={() => updateCartQuantity(item.cartItemId, -1)}
            min={1}
            size="sm"
          />
        </div>

        {/* Subtotal & Delete */}
        <div className="col-6 col-sm-2 col-md-2 text-end d-flex align-items-center justify-content-end gap-2">
          <div>
            <span className="d-block small text-muted d-sm-none">Subtotal:</span>
            <span className="fw-bold fs-6 text-danger">₹{item.price * item.quantity}</span>
          </div>

          <button
            type="button"
            className="btn btn-outline-danger btn-sm rounded-circle d-none d-sm-inline-flex align-items-center justify-content-center p-0"
            style={{ width: '32px', height: '32px' }}
            onClick={() => removeFromCart(item.cartItemId)}
            title="Remove item"
          >
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
