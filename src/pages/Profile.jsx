import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePizzaHub } from '../context/PizzaHubContext';

const Profile = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    logout,
    updateProfile,
    orders,
    wishlistCount,
    addresses,
    addAddress,
    deleteAddress
  } = usePizzaHub();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'addresses' | 'settings'

  // Edit profile state
  const [editing, setEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: currentUser?.fullName || '',
    mobile: currentUser?.mobile || ''
  });

  // New address state
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: currentUser?.fullName || '',
    mobile: currentUser?.mobile || '',
    flatNo: '',
    street: '',
    area: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '',
    tag: 'Home'
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setEditing(false);
  };

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    if (!newAddr.flatNo || !newAddr.street || !newAddr.pincode) {
      alert('Please fill all mandatory address fields.');
      return;
    }
    addAddress(newAddr);
    setShowAddAddress(false);
    setNewAddr({
      fullName: currentUser?.fullName || '',
      mobile: currentUser?.mobile || '',
      flatNo: '',
      street: '',
      area: '',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '',
      tag: 'Home'
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-page py-5 bg-light-subtle min-vh-100">
      <div className="container">
        {/* Profile Header Card */}
        <div className="card border-0 rounded-4 shadow-sm bg-white p-4 mb-4 overflow-hidden position-relative">
          <div className="row align-items-center g-3">
            <div className="col-auto">
              <div
                className="rounded-circle bg-gradient-danger text-white d-flex align-items-center justify-content-center shadow"
                style={{ width: '80px', height: '80px', fontSize: '2.2rem', fontWeight: '800' }}
              >
                {currentUser?.fullName ? currentUser.fullName[0].toUpperCase() : 'U'}
              </div>
            </div>

            <div className="col">
              <h3 className="fw-black text-dark mb-1">{currentUser?.fullName}</h3>
              <div className="d-flex flex-wrap gap-3 text-muted small">
                <span>
                  <i className="bi bi-envelope text-danger me-1"></i> {currentUser?.email}
                </span>
                <span>
                  <i className="bi bi-telephone text-danger me-1"></i> {currentUser?.mobile}
                </span>
                <span>
                  <i className="bi bi-calendar-check text-danger me-1"></i> Member since {currentUser?.joinedDate || '2026'}
                </span>
              </div>
            </div>

            <div className="col-12 col-md-auto text-md-end mt-3 mt-md-0">
              <button
                type="button"
                className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="row g-3 mt-3 pt-3 border-top text-center">
            <div className="col-4">
              <div className="fw-black fs-4 text-danger">{orders.length}</div>
              <div className="small text-muted">Total Orders</div>
            </div>
            <div className="col-4">
              <div className="fw-black fs-4 text-dark">{wishlistCount}</div>
              <div className="small text-muted">Wishlist Items</div>
            </div>
            <div className="col-4">
              <div className="fw-black fs-4 text-success">{addresses.length}</div>
              <div className="small text-muted">Saved Addresses</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="d-flex gap-2 mb-4 overflow-x-auto pb-2">
          <button
            type="button"
            className={`btn rounded-pill px-4 py-2 fw-bold text-nowrap transition-all ${
              activeTab === 'overview' ? 'btn-danger shadow-sm' : 'btn-white bg-white text-dark border'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="bi bi-grid-1x2-fill me-2"></i> Account Overview
          </button>

          <button
            type="button"
            className={`btn rounded-pill px-4 py-2 fw-bold text-nowrap transition-all ${
              activeTab === 'addresses' ? 'btn-danger shadow-sm' : 'btn-white bg-white text-dark border'
            }`}
            onClick={() => setActiveTab('addresses')}
          >
            <i className="bi bi-pin-map-fill me-2"></i> Saved Addresses ({addresses.length})
          </button>

          <button
            type="button"
            className={`btn rounded-pill px-4 py-2 fw-bold text-nowrap transition-all ${
              activeTab === 'settings' ? 'btn-danger shadow-sm' : 'btn-white bg-white text-dark border'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            <i className="bi bi-gear-fill me-2"></i> Edit Profile
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div className="card border-0 rounded-4 shadow-sm bg-white p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-dark mb-0">Recent Order Activity</h5>
                  <Link to="/my-orders" className="btn btn-outline-danger btn-sm rounded-pill px-3">
                    View All ({orders.length})
                  </Link>
                </div>

                {orders.length > 0 ? (
                  <div>
                    <div className="p-3 bg-light rounded-3 mb-3">
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold font-monospace text-danger">{orders[0].id}</span>
                        <span className="badge bg-success">{orders[0].status}</span>
                      </div>
                      <div className="small text-muted my-1">{orders[0].items?.length} items • ₹{orders[0].total}</div>
                      <div className="small text-muted">Date: {orders[0].date}</div>
                    </div>
                    <Link to="/my-orders" className="btn btn-danger btn-sm w-100 rounded-pill">
                      Track Most Recent Order
                    </Link>
                  </div>
                ) : (
                  <p className="text-muted small">No orders placed yet.</p>
                )}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="card border-0 rounded-4 shadow-sm bg-white p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-dark mb-0">My Wishlist</h5>
                  <Link to="/wishlist" className="btn btn-outline-danger btn-sm rounded-pill px-3">
                    View All ({wishlistCount})
                  </Link>
                </div>
                <p className="text-muted small mb-4">
                  Keep your top choice pizzas and sides bookmarked for instant reordering.
                </p>
                <Link to="/wishlist" className="btn btn-danger btn-sm w-100 rounded-pill">
                  Open Wishlist
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold text-dark mb-0">Saved Delivery Addresses</h5>
              <button
                type="button"
                className="btn btn-danger btn-sm rounded-pill px-3 fw-bold"
                onClick={() => setShowAddAddress(!showAddAddress)}
              >
                <i className="bi bi-plus-lg me-1"></i> Add New Address
              </button>
            </div>

            {/* Add Address Form Toggle */}
            {showAddAddress && (
              <form onSubmit={handleAddNewAddress} className="p-3 bg-light rounded-3 mb-4 border">
                <h6 className="fw-bold text-dark mb-3">New Delivery Address</h6>
                <div className="row g-2">
                  <div className="col-12 col-sm-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Full Name"
                      value={newAddr.fullName}
                      onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input
                      type="tel"
                      className="form-control form-control-sm"
                      placeholder="10-digit Mobile"
                      value={newAddr.mobile}
                      onChange={(e) => setNewAddr({ ...newAddr, mobile: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Flat / House No."
                      value={newAddr.flatNo}
                      onChange={(e) => setNewAddr({ ...newAddr, flatNo: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Street / Road"
                      value={newAddr.street}
                      onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-4">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Area"
                      value={newAddr.area}
                      onChange={(e) => setNewAddr({ ...newAddr, area: e.target.value })}
                    />
                  </div>
                  <div className="col-4">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="City"
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    />
                  </div>
                  <div className="col-4">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Pincode"
                      value={newAddr.pincode}
                      onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <button type="submit" className="btn btn-danger btn-sm rounded-pill px-3">
                    Save Address
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                    onClick={() => setShowAddAddress(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* List */}
            <div className="row g-3">
              {addresses.map(addr => (
                <div key={addr.id} className="col-12 col-md-6">
                  <div className="p-3 border rounded-3 bg-light-subtle h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="badge bg-danger text-white">{addr.tag || 'Home'}</span>
                        <button
                          type="button"
                          className="btn btn-link text-danger p-0 small"
                          onClick={() => deleteAddress(addr.id)}
                          title="Delete address"
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                      <div className="fw-bold text-dark">{addr.fullName}</div>
                      <div className="small text-muted">
                        {addr.flatNo}, {addr.street}, {addr.area}, {addr.city} - {addr.pincode}
                      </div>
                      <div className="small text-muted mt-1">
                        <i className="bi bi-phone me-1"></i> {addr.mobile}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS / EDIT PROFILE */}
        {activeTab === 'settings' && (
          <div className="card border-0 rounded-4 shadow-sm bg-white p-4" style={{ maxWidth: '600px' }}>
            <h5 className="fw-bold text-dark mb-4">Edit Personal Information</h5>
            <form onSubmit={handleUpdateProfile}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileForm.fullName}
                  onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Email Address (Read Only)</label>
                <input
                  type="email"
                  className="form-control bg-light"
                  value={currentUser?.email || ''}
                  disabled
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary">Mobile Number</label>
                <input
                  type="tel"
                  className="form-control"
                  value={profileForm.mobile}
                  onChange={(e) => setProfileForm({ ...profileForm, mobile: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-danger rounded-pill px-4 fw-bold">
                Save Profile Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
