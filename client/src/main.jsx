import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import Toaster from 'react-hot-toast';
import AuthProvider from './Provider/AuthProvider';
import Routes from './Routes/Routes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Routes} />
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
