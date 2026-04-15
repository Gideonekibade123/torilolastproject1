import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CheckOut() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [sameAsBilling, setSameAsBilling] = useState(true);

  // Controlled inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ✅ Handle order and send API request
  const handleOrder = async () => {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
      // Redirect to login and remember where the user came from
      navigate("/Signin", { state: { from: "/checkout" } });
      return;
    }

    const payload = {
      full_name: fullName,
      email: email,
      phone: phone,
      billing_address: billingAddress,
      shipping_address: sameAsBilling ? billingAddress : shippingAddress,
      total_amount: total,
      cart_items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch("https://mascofashion.onrender.com/api/shop/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate("/Signin", { state: { from: "/checkout" } });
        } else {
          throw new Error("Failed to create order");
        }
      } else {
        const data = await response.json();
        console.log("Order created:", data);
        navigate("/payments");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create order");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Checkout</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center">Your cart is empty.</div>
      ) : (
        <div className="row">
          {/* LEFT SIDE: CUSTOMER DETAILS */}
          <div className="col-md-7 mb-4">
            <div className="card p-4 shadow-sm">
              <h4 className="mb-3">Billing Details</h4>
              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Billing Address</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    required
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                  ></textarea>
                </div>

                {/* Shipping Section */}
                <hr className="my-4" />
                <h4 className="mb-3">Shipping Address</h4>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={sameAsBilling}
                    onChange={() => setSameAsBilling(!sameAsBilling)}
                    id="sameAsBilling"
                  />
                  <label className="form-check-label" htmlFor="sameAsBilling">
                    Same as billing address
                  </label>
                </div>

                {!sameAsBilling && (
                  <div className="mb-3">
                    <label className="form-label">Shipping Address</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                    ></textarea>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* RIGHT SIDE: ORDER SUMMARY */}
          <div className="col-md-5">
            <div className="card p-4 shadow-sm">
              <h4 className="mb-3">Order Summary</h4>

              <ul className="list-group mb-3">
                {cart.map((item) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={item.id}
                  >
                    <div>
                      <strong>{item.name}</strong>
                      <br />
                      <small>Qty: {item.quantity}</small>
                    </div>
                    <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-end">
                Total: <strong>₦{total.toLocaleString()}</strong>
              </h4>

              <button className="btn btn-dark w-100 mt-3" onClick={handleOrder}>
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckOut;

