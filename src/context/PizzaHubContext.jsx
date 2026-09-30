import React, { createContext, useContext, useState, useEffect } from 'react';
import { offers } from '../data/offers';
import { pizzas } from '../data/pizzas';

const PizzaHubContext = createContext();

export const usePizzaHub = () => useContext(PizzaHubContext);

export const PizzaHubProvider = ({ children }) => {
  // Pre-seed demo user if none exists
  const initialUsers = () => {
    const saved = localStorage.getItem('pizzahub_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    const defaultUser = [
      {
        fullName: 'Adnan Choudhary',
        email: 'demo@pizzahub.com',
        mobile: '9876543210',
        password: 'password123',
        joinedDate: 'Jan 2026'
      }
    ];
    localStorage.setItem('pizzahub_user', JSON.stringify(defaultUser));
    return defaultUser;
  };

  const [users, setUsers] = useState(initialUsers);

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('pizzahub_logged_in');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('pizzahub_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('pizzahub_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [1, 5, 9]; // Pre-seed 3 favorites for delightful first load
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('pizzahub_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    // Pre-seed 1 past sample order so user immediately sees past orders in My Orders
    const sampleOrder = [
      {
        id: 'PH-784291',
        date: '27 Sep 2026, 08:30 PM',
        timestamp: Date.now() - 86400000,
        status: 'Delivered',
        deliveryType: 'standard',
        items: [
          {
            cartItemId: 'sample-1',
            pizzaId: 1,
            name: 'Margherita Classic',
            image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&auto=format&fit=crop&q=80',
            size: 'Medium',
            crust: 'Cheese Burst',
            toppings: ['Extra Cheese'],
            price: 359,
            quantity: 1,
            veg: true
          },
          {
            cartItemId: 'sample-2',
            pizzaId: 18,
            name: 'Choco Lava Cake',
            image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
            size: 'Regular',
            crust: 'Classic Hand Tossed',
            toppings: [],
            price: 119,
            quantity: 2,
            veg: true
          }
        ],
        subtotal: 597,
        deliveryFee: 40,
        taxes: 30,
        discount: 100,
        couponCode: 'PIZZA100',
        total: 567,
        address: {
          fullName: 'Adnan Choudhary',
          mobile: '9876543210',
          flatNo: 'Flat 402, Sunshine Heights',
          street: '12th Main Road',
          area: 'Indiranagar',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560038'
        },
        payment: {
          method: 'UPI',
          details: 'adnan@oksbi'
        }
      }
    ];
    localStorage.setItem('pizzahub_orders', JSON.stringify(sampleOrder));
    return sampleOrder;
  });

  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('pizzahub_addresses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    const defaultAddr = [
      {
        id: 'addr-1',
        fullName: 'Adnan Choudhary',
        mobile: '9876543210',
        flatNo: 'Flat 402, Sunshine Heights',
        street: '12th Main Road',
        area: 'Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        isDefault: true,
        tag: 'Home'
      }
    ];
    localStorage.setItem('pizzahub_addresses', JSON.stringify(defaultAddr));
    return defaultAddr;
  });

  const [coupon, setCoupon] = useState(() => {
    const saved = localStorage.getItem('pizzahub_coupon');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [deliveryType, setDeliveryType] = useState('standard'); // 'standard' | 'express'
  const [selectedLocation, setSelectedLocation] = useState('Indiranagar, Bengaluru');
  const [toast, setToast] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('pizzahub_user', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('pizzahub_logged_in', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('pizzahub_logged_in');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('pizzahub_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('pizzahub_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('pizzahub_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('pizzahub_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem('pizzahub_coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('pizzahub_coupon');
    }
  }, [coupon]);

  // Toast helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Auth functions
  const login = (email, password) => {
    const found = users.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );
    if (found) {
      const userSession = {
        fullName: found.fullName,
        email: found.email,
        mobile: found.mobile,
        joinedDate: found.joinedDate || 'Sep 2026'
      };
      setCurrentUser(userSession);
      showToast(`Welcome back, ${found.fullName}! 👋`);
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password. Please try again or use demo credentials.' };
  };

  const register = (userData) => {
    const exists = users.find(
      u => u.email.toLowerCase() === userData.email.trim().toLowerCase()
    );
    if (exists) {
      return { success: false, message: 'An account with this email already exists. Please log in.' };
    }
    const newUser = {
      fullName: userData.fullName.trim(),
      email: userData.email.trim(),
      mobile: userData.mobile.trim(),
      password: userData.password,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };
    const updated = [...users, newUser];
    setUsers(updated);
    const userSession = {
      fullName: newUser.fullName,
      email: newUser.email,
      mobile: newUser.mobile,
      joinedDate: newUser.joinedDate
    };
    setCurrentUser(userSession);
    showToast(`Account created successfully! Welcome to PizzaHub, ${newUser.fullName} 🍕`);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been logged out safely.', 'info');
  };

  const updateProfile = (updatedData) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setUsers(users.map(u => (u.email === currentUser.email ? { ...u, ...updatedData } : u)));
    showToast('Profile updated successfully!');
  };

  // Cart Functions
  const addToCart = (pizza, sizeName = 'Regular', crustName = 'Classic Hand Tossed', selectedToppings = [], qty = 1, customUnitPrice = null) => {
    // calculate unit price if not given
    let unitPrice = customUnitPrice;
    if (unitPrice === null) {
      let base = pizza.price;
      if (sizeName === 'Medium') base += 80;
      if (sizeName === 'Large') base += 150;
      if (crustName === 'Thin Crust') base += 30;
      if (crustName === 'Cheese Burst') base += 80;
      if (crustName === 'Wheat Crust') base += 50;

      // Toppings cost
      selectedToppings.forEach(top => {
        if (typeof top === 'object' && top.price) {
          base += top.price;
        }
      });
      unitPrice = base;
    }

    const toppingNames = selectedToppings.map(t => (typeof t === 'string' ? t : t.name));
    const toppingsKey = [...toppingNames].sort().join('|');
    const cartItemId = `${pizza.id}-${sizeName}-${crustName}-${toppingsKey}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const copy = [...prevCart];
        copy[existingIndex].quantity += qty;
        return copy;
      } else {
        const newItem = {
          cartItemId,
          pizzaId: pizza.id,
          name: pizza.name,
          image: pizza.image,
          category: pizza.category,
          size: sizeName,
          crust: crustName,
          toppings: toppingNames,
          price: unitPrice,
          quantity: qty,
          veg: pizza.veg
        };
        return [...prevCart, newItem];
      }
    });

    showToast(`Added ${pizza.name} (${sizeName}) to cart! 🍕`);
  };

  const updateCartQuantity = (cartItemId, delta) => {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  // Cart Calculations
  const itemTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const deliveryFee = itemTotal === 0 ? 0 : (itemTotal > 800 ? 0 : (deliveryType === 'express' ? 70 : 40));

  const taxes = itemTotal > 0 ? Math.round(itemTotal * 0.05) : 0; // 5% GST

  // Validate coupon whenever itemTotal changes
  let discount = 0;
  if (coupon && itemTotal > 0) {
    if (itemTotal >= coupon.minOrder) {
      discount = coupon.discount;
    } else {
      // Auto-remove or warn if order value dropped below coupon threshold
      discount = 0;
    }
  }

  const grandTotal = Math.max(0, itemTotal + deliveryFee + taxes - discount);

  // Apply Coupon
  const applyCoupon = (couponCode) => {
    const trimmed = couponCode.trim().toUpperCase();
    const found = offers.find(o => o.code.toUpperCase() === trimmed);
    if (!found) {
      return { success: false, message: `Coupon "${couponCode}" is invalid.` };
    }
    if (itemTotal < found.minOrder) {
      return {
        success: false,
        message: `Add ₹${found.minOrder - itemTotal} more to apply coupon ${found.code} (Min order ₹${found.minOrder}).`
      };
    }
    setCoupon(found);
    showToast(`Coupon ${found.code} applied! Saved ₹${found.discount} 🎉`);
    return { success: true, discount: found.discount };
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  // Wishlist Functions
  const toggleWishlist = (pizzaId) => {
    const id = Number(pizzaId);
    if (wishlist.includes(id)) {
      setWishlist(prev => prev.filter(item => item !== id));
      showToast('Removed from Wishlist', 'info');
    } else {
      setWishlist(prev => [...prev, id]);
      showToast('Saved to Wishlist! ❤️');
    }
  };

  const isInWishlist = (pizzaId) => wishlist.includes(Number(pizzaId));

  const removeFromWishlist = (pizzaId) => {
    setWishlist(prev => prev.filter(item => item !== Number(pizzaId)));
    showToast('Removed from Wishlist', 'info');
  };

  // Order Placement
  const createOrder = (orderData) => {
    const newOrderId = 'PH-' + Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) + ', ' + now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const newOrder = {
      id: newOrderId,
      date: formattedDate,
      timestamp: Date.now(),
      status: 'Order Placed',
      deliveryType: deliveryType,
      items: [...cart],
      subtotal: itemTotal,
      deliveryFee: deliveryFee,
      taxes: taxes,
      discount: discount,
      couponCode: coupon ? coupon.code : null,
      total: grandTotal,
      address: orderData.address,
      payment: orderData.payment,
      estimatedDelivery: deliveryType === 'express' ? '20-25 mins' : '30-40 mins'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Reorder
  const reorder = (orderId) => {
    const orderToRepeat = orders.find(o => o.id === orderId);
    if (!orderToRepeat) return false;

    // Add all items back into cart
    setCart(prevCart => {
      const merged = [...prevCart];
      orderToRepeat.items.forEach(pastItem => {
        const existingIndex = merged.findIndex(i => i.cartItemId === pastItem.cartItemId);
        if (existingIndex > -1) {
          merged[existingIndex].quantity += pastItem.quantity;
        } else {
          merged.push({ ...pastItem });
        }
      });
      return merged;
    });

    showToast(`Items from Order ${orderId} added to your cart! 🛒`);
    return true;
  };

  // Order tracking status progression simulator
  const advanceOrderStatus = (orderId) => {
    const stages = ['Order Placed', 'Order Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const currentIndex = stages.indexOf(ord.status);
          const nextIndex = (currentIndex + 1) % stages.length;
          return { ...ord, status: stages[nextIndex] };
        }
        return ord;
      })
    );
  };

  // Saved Addresses
  const addAddress = (newAddr) => {
    const id = 'addr-' + Date.now();
    const addrWithId = { ...newAddr, id };
    setAddresses(prev => [...prev, addrWithId]);
    showToast('Delivery address saved!');
    return addrWithId;
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    showToast('Address removed', 'info');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <PizzaHubContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        updateProfile,
        cart,
        cartCount,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        itemTotal,
        deliveryFee,
        taxes,
        discount,
        grandTotal,
        coupon,
        applyCoupon,
        removeCoupon,
        deliveryType,
        setDeliveryType,
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        orders,
        createOrder,
        reorder,
        advanceOrderStatus,
        addresses,
        addAddress,
        deleteAddress,
        selectedLocation,
        setSelectedLocation,
        toast,
        showToast
      }}
    >
      {children}
    </PizzaHubContext.Provider>
  );
};
