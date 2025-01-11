import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);