import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import Navbar from './Components/Navbar';
import { AuthProvider } from './Context/auth';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
