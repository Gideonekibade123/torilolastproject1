import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ShopPage from "./Pages/ShopPage";
import ProductPage from "./Pages/ProductPage";
import MiniCart from "./Pages/MiniCart";
import CheckOut from "./Pages/CheckOut";
import CartPage from "./Pages/CartPage";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Payments from "./Pages/Payments";
import Thankyou from "./Pages/Thankyou";
import ResetPassword from "./Pages/ResetPassword";
import ForgotPassword from "./Pages/ForgotPassword";
import OrderSuccessful from "./Pages/OrderSuccessful";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ShopPage" element={<ShopPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/minicart" element={<MiniCart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/order-successful" element={<OrderSuccessful />} />
          <Route path="/thankyou" element={<Thankyou />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;