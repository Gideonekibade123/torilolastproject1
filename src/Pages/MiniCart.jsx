import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const MiniCart = () => {
  const { cart } = useCart();

  return (
    <div className="mini-cart border p-3 shadow" style={{ width: "250px" }}>
      <h5>Mini Cart</h5>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="list-unstyled">
            {cart.map(item => (
              <li key={item.id}>
                {item.name} x {item.quantity} - ₦{item.price}
              </li>
            ))}
          </ul>
          <Link to="/CartPage">
            <button className="btn btn-dark w-100">View Cart</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default MiniCart;