import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { Provider } from 'react-redux';
import store from './store/store';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import AppRoutes from './routes';
import reportWebVitals from './reportWebVitals';

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes /> 
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
