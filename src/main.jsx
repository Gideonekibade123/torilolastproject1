import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './Pages/Home.jsx';
import ShopPage from './Pages/ShopPage.jsx';
import ProductPage from './Pages/ProductPage.jsx';
import MiniCart from './Pages/MiniCart.jsx';
import CardPage from './Pages/CardPage.jsx';
import CheckOut from './Pages/CheckOut.jsx';
import CartPage from './Pages/CartPage.jsx';
import Signup from './Pages/Signup.jsx';
import Signin from './Pages/Signin.jsx';
import Thankyou from './Pages/Thankyou.jsx';
import ForgotPassword from './Pages/ForgotPassword.jsx';
import Payments from './Pages/Payments.jsx';
import ResetPassword from './Pages/ResetPassword.jsx';
import OrderSuccessful from './Pages/OrderSuccessful.jsx';
import { CartProvider } from './context/CartContext.jsx';
import Activate from './Pages/Activate.jsx';
import SignupSuccess from './Pages/SignupSuccess.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ShopPage" element={<ShopPage />} />
          <Route path="/ProductPage" element={<ProductPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/MiniCart" element={<MiniCart />} />
          <Route path="/CardPage" element={<CardPage />} />
          <Route path="/CheckOut" element={<CheckOut />} />
          <Route path="/CartPage" element={<CartPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/thankyou" element={<Thankyou />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/OrderSuccessful" element={<OrderSuccessful />} />
          <Route path="/Payments" element={<Payments />} />
          <Route path="/activate/:uid/:token" element={<Activate />} />
          <Route path="/signup-success" element={<SignupSuccess />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>
);