import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const user = localStorage.getItem("user"); // auth check

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!user) {
      navigate("/CheckOut");
    } else {
      navigate("/CheckOut");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">🛒 Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center">
          Your cart is empty.
        </div>
      ) : (
        <>
          <ul className="list-group mb-4">
            {cart.map((item) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={item.id}
              >
                <div>
                  <h6 className="mb-1">{item.name}</h6>

                  <small className="text-muted">
                    Price: ₦{item.price.toLocaleString()} <br />
                    Quantity: <strong>{item.quantity}</strong> <br />

                    {/* ✅ SHOW SELECTED SIZE */}
                    {item.selectedSize && (
                      <>
                        Size: <strong>{item.selectedSize}</strong> <br />
                      </>
                    )}

                    {/* ✅ SHOW SELECTED COLOR */}
                    {item.selectedColor && (
                      <>
                        Color:{" "}
                        <span
                          style={{
                            display: "inline-block",
                            width: "15px",
                            height: "15px",
                            backgroundColor: item.selectedColor,
                            borderRadius: "50%",
                            marginLeft: "5px",
                            border: "1px solid #000",
                          }}
                        ></span>{" "}
                        ({item.selectedColor})
                      </>
                    )}
                  </small>
                </div>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>
              Total: <strong>₦{total.toLocaleString()}</strong>
            </h4>

            <button className="btn btn-dark" onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          <div className="text-end">
            <button
              className="btn btn-success btn-lg"
              onClick={handleCheckout}
            >
              Proceed to Checkout →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;


