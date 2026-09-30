import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { pizzas, fallbackPizzaImage } from '../data/pizzas';
import { usePizzaHub } from '../context/PizzaHubContext';
import CustomizationPanel from '../components/CustomizationPanel';
import WishlistButton from '../components/WishlistButton';
import EmptyState from '../components/EmptyState';

const PizzaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = usePizzaHub();

  const pizza = pizzas.find(p => p.id === parseInt(id));
  const [imgSrc, setImgSrc] = useState(pizza?.image || fallbackPizzaImage);

  if (!pizza) {
    return (
      <div className="container py-5 text-center">
        <EmptyState
          icon="bi-exclamation-triangle"
          title="Pizza Not Found"
          message="The pizza you requested does not exist or has been removed from our menu."
          btnText="Back to Menu"
          btnLink="/menu"
        />
      </div>
    );
  }

  const handleCustomAddToCart = (customization) => {
    addToCart(
      pizza,
      customization.size,
      customization.crust,
      customization.toppings,
      customization.quantity,
      customization.unitPrice
    );
  };

  return (
    <div className="pizza-details-page py-5 bg-light-subtle min-vh-100">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/menu" className="text-decoration-none text-muted">Menu</Link></li>
            <li className="breadcrumb-item active text-danger fw-bold" aria-current="page">{pizza.name}</li>
          </ol>
        </nav>

        <div className="row g-4 g-lg-5">
          {/* Left Column: Image and Overview */}
          <div className="col-12 col-lg-5">
            <div className="sticky-lg-top" style={{ top: '100px' }}>
              <div className="card border-0 rounded-4 shadow-sm overflow-hidden bg-white p-3 position-relative">
                {/* Veg Badge & Wishlist */}
                <div className="position-absolute top-0 start-0 m-4 z-2 d-flex gap-2 align-items-center">
                  <span
                    className={`veg-badge d-inline-flex align-items-center justify-content-center p-1 rounded bg-white shadow-sm border ${
                      pizza.veg ? 'border-success' : 'border-danger'
                    }`}
                  >
                    <span
                      className={`rounded-circle ${pizza.veg ? 'bg-success' : 'bg-danger'}`}
                      style={{ width: '12px', height: '12px' }}
                    ></span>
                  </span>
                  <span className="badge bg-dark rounded-pill px-3 py-1 small">
                    {pizza.category}
                  </span>
                </div>

                <div className="position-absolute top-0 end-0 m-4 z-2">
                  <WishlistButton
                    pizzaId={pizza.id}
                    className="rounded-circle bg-white shadow p-2 border-0 hover-scale"
                  />
                </div>

                <div className="pizza-details-img-container overflow-hidden rounded-4 text-center bg-light">
                  <img
                    src={imgSrc}
                    alt={pizza.name}
                    className="img-fluid rounded-4 object-fit-cover w-100"
                    style={{ maxHeight: '420px', aspectRatio: '4/3' }}
                    onError={() => setImgSrc(fallbackPizzaImage)}
                  />
                </div>

                {/* Quick Trust Highlights */}
                <div className="row text-center mt-3 pt-3 border-top g-2">
                  <div className="col-4">
                    <i className="bi bi-clock-history text-danger fs-5 d-block mb-1"></i>
                    <span className="small text-muted" style={{ fontSize: '0.75rem' }}>30 Min Delivery</span>
                  </div>
                  <div className="col-4">
                    <i className="bi bi-fire text-danger fs-5 d-block mb-1"></i>
                    <span className="small text-muted" style={{ fontSize: '0.75rem' }}>Oven Fresh</span>
                  </div>
                  <div className="col-4">
                    <i className="bi bi-award text-danger fs-5 d-block mb-1"></i>
                    <span className="small text-muted" style={{ fontSize: '0.75rem' }}>100% Genuine</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customization and Details */}
          <div className="col-12 col-lg-7">
            <div className="bg-white rounded-4 p-4 shadow-sm border mb-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                <span className="badge bg-danger text-white rounded-pill px-3 py-1 fw-bold">
                  {pizza.veg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                </span>
                <div className="rating-pill d-flex align-items-center bg-success text-white px-3 py-1 rounded-pill small fw-bold">
                  <i className="bi bi-star-fill me-1"></i>
                  <span>{pizza.rating}</span>
                  <span className="text-white-50 ms-1">({pizza.reviews} customer reviews)</span>
                </div>
              </div>

              <h2 className="fw-black text-dark mb-2">{pizza.name}</h2>
              <p className="text-muted mb-3">{pizza.description}</p>

              {/* Ingredients list */}
              {pizza.ingredients && (
                <div className="mb-4">
                  <h6 className="fw-bold text-dark small text-uppercase mb-2">
                    <i className="bi bi-card-checklist text-danger me-1"></i> Fresh Ingredients:
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {pizza.ingredients.map((ing, idx) => (
                      <span key={idx} className="badge bg-light text-dark border rounded-pill px-3 py-1">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Customization Panel */}
            <CustomizationPanel
              basePrice={pizza.price}
              onAddToCart={handleCustomAddToCart}
              buttonLabel="Add Customized Pizza to Cart"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetails;
