import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
// import 'react-toastify/dist/ReacToastify.css';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer position="top-center" autoClose={2000} />
    <App />
  </StrictMode>
);
