import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePizzaHub } from '../context/PizzaHubContext';
import { pizzas, fallbackPizzaImage } from '../data/pizzas';
import EmptyState from '../components/EmptyState';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = usePizzaHub();
  const navigate = useNavigate();

  const wishlistedItems = pizzas.filter(p => wishlist.includes(p.id));

  return (
    <div className="wishlist-page py-5 bg-light-subtle min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <div>
            <h2 className="fw-black text-dark mb-1">My Saved Pizzas</h2>
            <p className="text-muted small mb-0">Your favorite handcrafted pizzas and snacks ready to order</p>
          </div>
          <span className="badge bg-danger rounded-pill px-3 py-2 fw-bold">
            {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} Saved
          </span>
        </div>

        {wishlistedItems.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {wishlistedItems.map(item => (
              <div key={item.id} className="col">
                <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden bg-white position-relative">
                  {/* Remove Wishlist Button */}
                  <button
                    type="button"
                    className="btn btn-sm btn-light rounded-circle position-absolute top-0 end-0 m-3 z-2 shadow-sm text-danger hover-scale"
                    onClick={() => removeFromWishlist(item.id)}
                    title="Remove from wishlist"
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </button>

                  {/* Veg indicator */}
                  <div className="position-absolute top-0 start-0 m-3 z-2">
                    <span
                      className={`veg-badge d-inline-flex align-items-center justify-content-center p-1 rounded bg-white shadow-sm border ${
                        item.veg ? 'border-success' : 'border-danger'
                      }`}
                    >
                      <span
                        className={`rounded-circle ${item.veg ? 'bg-success' : 'bg-danger'}`}
                        style={{ width: '10px', height: '10px' }}
                      ></span>
                    </span>
                  </div>

                  {/* Image */}
                  <Link to={`/pizza/${item.id}`} className="overflow-hidden d-block">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="card-img-top object-fit-cover w-100"
                      style={{ height: '200px' }}
                      onError={(e) => {
                        e.target.src = fallbackPizzaImage;
                      }}
                    />
                  </Link>

                  <div className="card-body p-3 p-md-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="badge bg-danger-subtle text-danger small fw-semibold">
                        {item.category}
                      </span>
                      <div className="small fw-bold text-success d-flex align-items-center">
                        <i className="bi bi-star-fill me-1" style={{ fontSize: '0.75rem' }}></i>
                        {item.rating}
                      </div>
                    </div>

                    <h5 className="card-title fw-bold text-dark mb-1">
                      <Link to={`/pizza/${item.id}`} className="text-dark text-decoration-none">
                        {item.name}
                      </Link>
                    </h5>

                    <p className="card-text text-muted small flex-grow-1 line-clamp-2 mb-3">
                      {item.description}
                    </p>

                    <div className="border-top pt-2 mt-auto d-flex justify-content-between align-items-center">
                      <div>
                        <span className="small text-muted d-block" style={{ fontSize: '0.75rem' }}>Price</span>
                        <span className="fs-5 fw-bold text-danger">₹{item.price}</span>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm rounded-pill px-2"
                          onClick={() => navigate(`/pizza/${item.id}`)}
                          title="Customize"
                        >
                          <i className="bi bi-sliders"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm rounded-pill px-3 fw-bold shadow-sm"
                          onClick={() => addToCart(item, 'Regular', 'Classic Hand Tossed', [], 1)}
                        >
                          <i className="bi bi-plus-lg me-1"></i> Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card border-0 rounded-4 shadow-sm p-5 bg-white text-center">
            <EmptyState
              icon="bi-heartbreak"
              title="Your Wishlist is Empty"
              message="Save your favorite pizzas and sides to your wishlist so you can easily order them anytime."
              btnText="Explore Menu"
              btnLink="/menu"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
