import React, { useState, useMemo } from 'react';
import { sizes, crusts } from '../data/crusts';
import { toppings as availableToppings } from '../data/toppings';
import QuantitySelector from './QuantitySelector';

const CustomizationPanel = ({
  basePrice,
  initialSize = 'Regular',
  initialCrust = 'Classic Hand Tossed',
  initialToppings = [],
  onAddToCart,
  buttonLabel = 'Add to Cart',
  showQuantity = true
}) => {
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [selectedCrust, setSelectedCrust] = useState(initialCrust);
  const [selectedToppings, setSelectedToppings] = useState(initialToppings);
  const [quantity, setQuantity] = useState(1);

  // Compute unit price
  const unitPrice = useMemo(() => {
    let price = basePrice;

    // Size delta
    const sizeObj = sizes.find(s => s.name === selectedSize);
    if (sizeObj) price += sizeObj.extraPrice;

    // Crust delta
    const crustObj = crusts.find(c => c.name === selectedCrust);
    if (crustObj) price += crustObj.price;

    // Toppings delta
    selectedToppings.forEach(topName => {
      const topObj = availableToppings.find(t => t.name === topName);
      if (topObj) price += topObj.price;
    });

    return price;
  }, [basePrice, selectedSize, selectedCrust, selectedToppings]);

  const totalPrice = unitPrice * quantity;

  const toggleTopping = (toppingName) => {
    if (selectedToppings.includes(toppingName)) {
      setSelectedToppings(selectedToppings.filter(t => t !== toppingName));
    } else {
      setSelectedToppings([...selectedToppings, toppingName]);
    }
  };

  const handleAction = () => {
    if (onAddToCart) {
      onAddToCart({
        size: selectedSize,
        crust: selectedCrust,
        toppings: selectedToppings,
        quantity,
        unitPrice,
        totalPrice
      });
    }
  };

  return (
    <div className="customization-panel bg-white rounded-4 p-4 shadow-sm border">
      {/* 1. Size Selection */}
      <div className="custom-section mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold text-dark mb-0">
            <span className="badge bg-danger rounded-circle me-2">1</span>
            Select Pizza Size
          </h6>
          <span className="badge bg-light text-muted border">Required</span>
        </div>

        <div className="row g-2">
          {sizes.map(size => {
            const isSelected = selectedSize === size.name;
            return (
              <div key={size.id} className="col-4">
                <div
                  className={`size-card p-3 text-center rounded-3 border cursor-pointer transition-all ${
                    isSelected ? 'border-danger bg-danger-subtle shadow-sm' : 'bg-light hover-bg'
                  }`}
                  onClick={() => setSelectedSize(size.name)}
                >
                  <div className="fw-bold text-dark">{size.name}</div>
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

      {/* 2. Crust Selection */}
      <div className="custom-section mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold text-dark mb-0">
            <span className="badge bg-danger rounded-circle me-2">2</span>
            Select Crust
          </h6>
          <span className="badge bg-light text-muted border">Required</span>
        </div>

        <div className="row g-2">
          {crusts.map(crust => {
            const isSelected = selectedCrust === crust.name;
            return (
              <div key={crust.id} className="col-12 col-sm-6">
                <div
                  className={`crust-card p-3 rounded-3 border cursor-pointer transition-all d-flex justify-content-between align-items-center ${
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

      {/* 3. Extra Toppings Selection */}
      <div className="custom-section mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold text-dark mb-0">
            <span className="badge bg-danger rounded-circle me-2">3</span>
            Add Extra Toppings
          </h6>
          <span className="badge bg-light text-muted border">Optional</span>
        </div>

        <div className="row g-2">
          {availableToppings.map(topping => {
            const isChecked = selectedToppings.includes(topping.name);
            return (
              <div key={topping.id} className="col-6 col-sm-4 col-md-4">
                <div
                  className={`topping-card p-2 p-sm-3 rounded-3 border cursor-pointer transition-all d-flex align-items-center justify-content-between ${
                    isChecked ? 'border-danger bg-danger-subtle' : 'bg-light'
                  }`}
                  onClick={() => toggleTopping(topping.name)}
                >
                  <div className="d-flex align-items-center text-truncate pe-1">
                    <span className="me-2 fs-6">{topping.icon}</span>
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
                    aria-label={topping.name}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Calculation & Actions */}
      <div className="border-top pt-3 mt-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          {showQuantity && (
            <div className="d-flex align-items-center gap-2">
              <span className="fw-semibold small text-muted">Quantity:</span>
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity(q => q + 1)}
                onDecrease={() => setQuantity(q => (q > 1 ? q - 1 : 1))}
              />
            </div>
          )}

          <div className="ms-auto text-end">
            <span className="small text-muted d-block" style={{ fontSize: '0.75rem' }}>Total Amount</span>
            <span className="fs-4 fw-bolder text-danger">₹{totalPrice}</span>
          </div>

          <button
            type="button"
            className="btn btn-danger btn-lg px-4 rounded-pill fw-bold shadow hover-scale ms-2"
            onClick={handleAction}
          >
            <i className="bi bi-cart-plus me-2"></i>
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;
