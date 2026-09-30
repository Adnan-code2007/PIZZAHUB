import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { sizes, crusts } from '../data/crusts';
import { toppings as availableToppings } from '../data/toppings';
import { usePizzaHub } from '../context/PizzaHubContext';
import QuantitySelector from '../components/QuantitySelector';

const baseOptions = [
  {
    id: 'base-margherita',
    name: 'Margherita Classic Base',
    desc: 'Tangy San Marzano tomato sauce, fresh basil, and virgin olive oil',
    price: 249,
    veg: true,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'base-paneer',
    name: 'Paneer Makhani Base',
    desc: 'Rich makhani gravy sauce, roasted spices, and cilantro butter',
    price: 289,
    veg: true,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'base-chicken',
    name: 'Spicy Chicken BBQ Base',
    desc: 'Smoked Texas barbecue glaze base with sweet hickory sauce',
    price: 329,
    veg: false,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'base-fourcheese',
    name: 'Four Cheese Alfredo Base',
    desc: 'Creamy white parmesan and cheddar garlic sauce foundation',
    price: 299,
    veg: true,
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=500&auto=format&fit=crop&q=80'
  }
];

const CustomPizza = () => {
  const navigate = useNavigate();
  const { addToCart } = usePizzaHub();

  const [selectedBase, setSelectedBase] = useState(baseOptions[0]);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedCrust, setSelectedCrust] = useState('Classic Hand Tossed');
  const [selectedToppings, setSelectedToppings] = useState(['Extra Cheese', 'Black Olives', 'Golden Sweet Corn']);
  const [quantity, setQuantity] = useState(1);

  // Dynamic price calculation
  const unitPrice = useMemo(() => {
    let price = selectedBase.price;

    const sizeObj = sizes.find(s => s.name === selectedSize);
    if (sizeObj) price += sizeObj.extraPrice;

    const crustObj = crusts.find(c => c.name === selectedCrust);
    if (crustObj) price += crustObj.price;

    selectedToppings.forEach(topName => {
      const topObj = availableToppings.find(t => t.name === topName);
      if (topObj) price += topObj.price;
    });

    return price;
  }, [selectedBase, selectedSize, selectedCrust, selectedToppings]);

  const totalPrice = unitPrice * quantity;

  const toggleTopping = (toppingName) => {
    if (selectedToppings.includes(toppingName)) {
      setSelectedToppings(selectedToppings.filter(t => t !== toppingName));
    } else {
      setSelectedToppings([...selectedToppings, toppingName]);
    }
  };

  const handleAddCustomToCart = () => {
    const customPizzaObject = {
      id: `custom-${Date.now()}`,
      name: `Custom Pizza (${selectedBase.name})`,
      image: selectedBase.image,
      category: 'Custom Pizza',
      veg: selectedBase.veg && !selectedToppings.some(t => {
        const top = availableToppings.find(x => x.name === t);
        return top && !top.veg;
      }),
      price: unitPrice
    };

    addToCart(
      customPizzaObject,
      selectedSize,
      selectedCrust,
      selectedToppings,
      quantity,
      unitPrice
    );

    navigate('/cart');
  };

  return (
    <div className="custom-pizza-page py-5 bg-light-subtle min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge bg-warning text-dark fw-bold rounded-pill px-3 py-1 mb-2">
            🍕 PizzaHub Studio
          </span>
          <h1 className="fw-black display-6 text-dark mb-2">Build Your Own Custom Pizza</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: '640px' }}>
            Unleash your culinary creativity! Follow the 5 simple steps below to craft a one-of-a-kind handcrafted pizza tailored to your tastebuds.
          </p>
        </div>

        <div className="row g-4 g-lg-5">
          {/* Left Column: 5 Steps Wizard */}
          <div className="col-12 col-lg-8">
            {/* STEP 1: CHOOSE BASE */}
            <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 bg-white">
              <h5 className="fw-bold text-dark mb-3 d-flex align-items-center">
                <span className="badge bg-danger rounded-circle me-2 p-2" style={{ width: '28px', height: '28px' }}>1</span>
                Step 1: Choose Your Pizza Base
              </h5>
              <div className="row g-3">
                {baseOptions.map(base => {
                  const isSelected = selectedBase.id === base.id;
                  return (
                    <div key={base.id} className="col-12 col-sm-6">
                      <div
                        className={`card h-100 p-3 rounded-3 border cursor-pointer transition-all ${
                          isSelected ? 'border-danger bg-danger-subtle shadow-sm' : 'bg-light hover-bg'
                        }`}
                        onClick={() => setSelectedBase(base)}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={base.image}
                            alt={base.name}
                            className="rounded-3 object-fit-cover shadow-sm"
                            style={{ width: '60px', height: '60px' }}
                          />
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center">
                              <h6 className="fw-bold mb-0 text-dark small">{base.name}</h6>
                              <span className={`badge rounded-circle p-1 ${base.veg ? 'bg-success' : 'bg-danger'}`} style={{ width: '8px', height: '8px' }}></span>
                            </div>
                            <p className="text-muted small mb-1" style={{ fontSize: '0.75rem' }}>{base.desc}</p>
                            <span className="fw-bold text-danger small">₹{base.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: CHOOSE SIZE */}
            <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 bg-white">
              <h5 className="fw-bold text-dark mb-3 d-flex align-items-center">
                <span className="badge bg-danger rounded-circle me-2 p-2" style={{ width: '28px', height: '28px' }}>2</span>
                Step 2: Choose Size
              </h5>
              <div className="row g-3">
                {sizes.map(size => {
                  const isSelected = selectedSize === size.name;
                  return (
                    <div key={size.id} className="col-4">
                      <div
                        className={`p-3 text-center rounded-3 border cursor-pointer transition-all ${
                          isSelected ? 'border-danger bg-danger-subtle shadow-sm' : 'bg-light hover-bg'
                        }`}
                        onClick={() => setSelectedSize(size.name)}
                      >
                        <div className="fw-bold text-dark">{size.name}</div>
                        <div className="small text-muted" style={{ fontSize: '0.75rem' }}>{size.diameter}</div>
                        <div className="small text-muted" style={{ fontSize: '0.75rem' }}>{size.serves}</div>
                        <div className="mt-1 small fw-bold text-danger">
                          {size.extraPrice === 0 ? 'Standard' : `+₹${size.extraPrice}`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: CHOOSE CRUST */}
            <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 bg-white">
              <h5 className="fw-bold text-dark mb-3 d-flex align-items-center">
                <span className="badge bg-danger rounded-circle me-2 p-2" style={{ width: '28px', height: '28px' }}>3</span>
                Step 3: Choose Crust
              </h5>
              <div className="row g-3">
                {crusts.map(crust => {
                  const isSelected = selectedCrust === crust.name;
                  return (
                    <div key={crust.id} className="col-12 col-sm-6">
                      <div
                        className={`p-3 rounded-3 border cursor-pointer transition-all d-flex justify-content-between align-items-center ${
                          isSelected ? 'border-danger bg-danger-subtle shadow-sm' : 'bg-light hover-bg'
                        }`}
                        onClick={() => setSelectedCrust(crust.name)}
                      >
                        <div>
                          <div className="fw-bold text-dark small">{crust.name}</div>
                          <div className="text-muted" style={{ fontSize: '0.75rem' }}>{crust.description}</div>
                        </div>
                        <span className="fw-bold small text-danger ms-2 text-nowrap">
                          {crust.price === 0 ? 'Free' : `+₹${crust.price}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: CHOOSE TOPPINGS */}
            <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold text-dark mb-0 d-flex align-items-center">
                  <span className="badge bg-danger rounded-circle me-2 p-2" style={{ width: '28px', height: '28px' }}>4</span>
                  Step 4: Pile On The Toppings
                </h5>
                <span className="badge bg-secondary rounded-pill">{selectedToppings.length} Selected</span>
              </div>
              <p className="text-muted small mb-3">Mix and match unlimited cheese, crunchy farm veggies, and juicy proteins.</p>

              <div className="row g-2">
                {availableToppings.map(topping => {
                  const isChecked = selectedToppings.includes(topping.name);
                  return (
                    <div key={topping.id} className="col-6 col-sm-4">
                      <div
                        className={`p-2 p-sm-3 rounded-3 border cursor-pointer transition-all d-flex align-items-center justify-content-between ${
                          isChecked ? 'border-danger bg-danger-subtle' : 'bg-light'
                        }`}
                        onClick={() => toggleTopping(topping.name)}
                      >
                        <div className="d-flex align-items-center text-truncate pe-1">
                          <span className="me-2 fs-5">{topping.icon}</span>
                          <div className="text-truncate">
                            <div className="small fw-semibold text-dark text-truncate">{topping.name}</div>
                            <span className="text-muted" style={{ fontSize: '0.75rem' }}>+₹{topping.price}</span>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          className="form-check-input mt-0 text-danger border-secondary"
                          checked={isChecked}
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 5: QUANTITY */}
            <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 bg-white">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                <div>
                  <h5 className="fw-bold text-dark mb-1 d-flex align-items-center">
                    <span className="badge bg-danger rounded-circle me-2 p-2" style={{ width: '28px', height: '28px' }}>5</span>
                    Step 5: Choose Quantity
                  </h5>
                  <p className="text-muted small mb-0">How many custom handcrafted pies would you like?</p>
                </div>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity(q => q + 1)}
                  onDecrease={() => setQuantity(q => (q > 1 ? q - 1 : 1))}
                  size="lg"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Live Order Summary Card */}
          <div className="col-12 col-lg-4">
            <div className="sticky-lg-top" style={{ top: '100px' }}>
              <div className="card border-0 rounded-4 shadow-lg p-4 bg-white">
                <div className="text-center mb-3">
                  <div className="position-relative d-inline-block">
                    <img
                      src={selectedBase.image}
                      alt="Custom Pizza Preview"
                      className="img-fluid rounded-circle shadow-sm object-fit-cover"
                      style={{ width: '140px', height: '140px', border: '4px solid #d62828' }}
                    />
                    <span className="position-absolute bottom-0 end-0 bg-danger text-white rounded-pill px-2 py-1 small fw-bold shadow">
                      {selectedSize}
                    </span>
                  </div>
                  <h5 className="fw-bold text-dark mt-3 mb-1">Your Custom Pizza Creation</h5>
                  <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-1 small">
                    {selectedBase.name}
                  </span>
                </div>

                <div className="p-3 bg-light rounded-3 mb-3 small">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Crust:</span>
                    <strong className="text-dark">{selectedCrust}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Size:</span>
                    <strong className="text-dark">{selectedSize}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Quantity:</span>
                    <strong className="text-dark">{quantity}</strong>
                  </div>
                  <div className="mt-2 pt-2 border-top">
                    <span className="text-muted d-block mb-1">Selected Toppings ({selectedToppings.length}):</span>
                    {selectedToppings.length > 0 ? (
                      <div className="d-flex flex-wrap gap-1">
                        {selectedToppings.map((t, idx) => (
                          <span key={idx} className="badge bg-white border text-dark">
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted fst-italic">No extra toppings added</span>
                    )}
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="border-top pt-3 mb-4">
                  <div className="d-flex justify-content-between mb-1 small">
                    <span className="text-muted">Unit Price:</span>
                    <span className="fw-bold text-dark">₹{unitPrice}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="fw-bold fs-6 text-dark">Your Pizza Total:</span>
                    <span className="fs-3 fw-black text-danger">₹{totalPrice}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-danger btn-lg w-100 rounded-pill fw-bold shadow hover-scale py-3"
                  onClick={handleAddCustomToCart}
                >
                  <i className="bi bi-cart-plus me-2"></i> Add Custom Pizza to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPizza;
