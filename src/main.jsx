import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Bootstrap CSS & Bundle
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Custom CSS
import './index.css';
import './App.css';

import App from './App';
import { PizzaHubProvider } from './context/PizzaHubContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PizzaHubProvider>
        <App />
      </PizzaHubProvider>
    </BrowserRouter>
  </React.StrictMode>
);
