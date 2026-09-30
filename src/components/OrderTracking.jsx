import React from 'react';

const OrderTracking = ({ status = 'Order Placed', onAdvance, orderId }) => {
  const stages = [
    { key: 'Order Placed', label: 'Order Placed', icon: 'bi-receipt-cutoff', desc: 'Received and sent to the kitchen' },
    { key: 'Order Confirmed', label: 'Order Confirmed', icon: 'bi-check2-circle', desc: 'Verified by the restaurant chef' },
    { key: 'Preparing', label: 'Preparing Fresh', icon: 'bi-fire', desc: 'Baking your hot and crispy pizza' },
    { key: 'Out for Delivery', label: 'Out for Delivery', icon: 'bi-bicycle', desc: 'Delivery partner on the way' },
    { key: 'Delivered', label: 'Delivered', icon: 'bi-house-check-fill', desc: 'Enjoy your hot meal!' }
  ];

  const currentStageIndex = stages.findIndex(s => s.key === status);
  const activeIndex = currentStageIndex === -1 ? 0 : currentStageIndex;

  return (
    <div className="order-tracking-card bg-white rounded-4 p-4 shadow-sm border my-3">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <span className="badge bg-danger-subtle text-danger fw-bold rounded-pill px-3 py-1 mb-1">
            Live Order Status
          </span>
          <h5 className="fw-bold mb-0 text-dark">
            Current Status: <span className="text-danger">{status}</span>
          </h5>
        </div>

        {onAdvance && (
          <button
            type="button"
            className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold mt-2 mt-sm-0"
            onClick={() => onAdvance(orderId)}
            title="Click to simulate delivery stage progression"
          >
            <i className="bi bi-play-circle me-1"></i> Simulate Next Step
          </button>
        )}
      </div>

      {/* Progress Bar Line */}
      <div className="position-relative my-4">
        {/* Background track line */}
        <div
          className="position-absolute top-50 start-0 translate-middle-y bg-light-subtle border w-100"
          style={{ height: '6px', zIndex: 1, backgroundColor: '#e9ecef' }}
        ></div>
        {/* Active progress fill */}
        <div
          className="position-absolute top-50 start-0 translate-middle-y bg-danger transition-all"
          style={{
            height: '6px',
            zIndex: 2,
            width: `${(activeIndex / (stages.length - 1)) * 100}%`
          }}
        ></div>

        {/* Step Nodes */}
        <div className="d-flex justify-content-between position-relative" style={{ zIndex: 3 }}>
          {stages.map((st, idx) => {
            const isCompleted = idx < activeIndex;
            const isCurrent = idx === activeIndex;
            const isUpcoming = idx > activeIndex;

            return (
              <div key={st.key} className="text-center" style={{ width: '80px' }}>
                <div
                  className={`mx-auto rounded-circle d-flex align-items-center justify-content-center border transition-all ${
                    isCompleted
                      ? 'bg-success text-white border-success shadow-sm'
                      : isCurrent
                      ? 'bg-danger text-white border-danger shadow pulse-ring'
                      : 'bg-white text-muted border-secondary-subtle'
                  }`}
                  style={{ width: '42px', height: '42px' }}
                >
                  <i className={`bi ${isCompleted ? 'bi-check-lg' : st.icon} fs-5`}></i>
                </div>

                <div className="mt-2">
                  <div
                    className={`small fw-bold ${
                      isCurrent ? 'text-danger' : isCompleted ? 'text-dark' : 'text-muted'
                    }`}
                    style={{ fontSize: '0.75rem', lineHeight: '1.2' }}
                  >
                    {st.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current stage detail description */}
      <div className="p-3 bg-light rounded-3 mt-4 d-flex align-items-center">
        <i className="bi bi-info-circle text-danger fs-5 me-2"></i>
        <span className="small text-muted">
          <strong>{stages[activeIndex]?.label}:</strong> {stages[activeIndex]?.desc}
        </span>
      </div>
    </div>
  );
};

export default OrderTracking;
