// // Payments.jsx
// import React, { useState, useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// function Payments() {
//   const { cart, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [scriptLoaded, setScriptLoaded] = useState(false);
//   const [error, setError] = useState("");

//   // Load Paystack script dynamically
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://js.paystack.co/v1/inline.js";
//     script.async = true;


//   script.onload = () => {
//     setScriptLoaded(true); // ✅ THIS IS WHAT YOU WERE MISSING
//    };

//   script.onerror = () => {
//     setError("Failed to load Paystack script.");
//   };


//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   // Calculate total in Naira
//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const token = localStorage.getItem("access");

//       // Initiate payment on backend (amount in Naira; backend converts to kobo)
//       const response = await fetch("https://mascofashion.onrender.com/api/payments/initiate/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ amount: total }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Payment initiation failed");
//       }

//       const reference = data.payment.reference;

//       if (!window.PaystackPop) {
//         setError("Paystack script not loaded.");
//         return;
//       }





//       // Open Paystack payment popup
//       const paystack = window.PaystackPop.setup({
//         key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
//         // email: "uzoglory840@gmail.com", // replace with actual customer email
//         email: JSON.parse(localStorage.getItem("user"))?.email || "", // dynamic email from logged-in user
//         amount: data.amount_kobo, // amount from backend in kobo
//         currency: "NGN",
//         ref: reference,
//         onClose: () => alert("Payment popup closed"),
//         callback: (res) => {
//           alert(`Payment successful. Reference: ${res.reference}`);
//           clearCart();
//           navigate("/Thankyou", {
//             state: { reference: res.reference, amount: total },
//           });
//         },
//       });



//       paystack.openIframe();
//     } catch (err) {
//       console.error(err);
//       setError("Payment failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-info text-center">No items to pay for.</div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Payment</h2>

//       <div className="row">
//         <div className="col-md-6 mx-auto">
//           <div className="card p-4 shadow-sm">
//             <h4 className="mb-3">Order Summary</h4>

//             <ul className="list-group mb-3">
//               {cart.map((item) => (
//                 <li key={item.id} className="list-group-item d-flex justify-content-between">
//                   <span>{item.name} (x{item.quantity})</span>
//                   <strong>₦{(item.price * item.quantity).toLocaleString()}</strong>
//                 </li>
//               ))}
//             </ul>

//             <h4 className="text-end">
//               Total: <strong>₦{total.toLocaleString()}</strong>
//             </h4>

//             {error && <div className="alert alert-danger mt-3">{error}</div>}

//             <button
//               className="btn btn-dark w-100 mt-3"
//               onClick={handlePayment}
//               disabled={loading}
//             >
//               {loading ? "Processing..." : "Pay Now"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Payments;










// Payments.jsx
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Payments() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState("");

  // Load Paystack script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;

    script.onload = () => {
      setScriptLoaded(true);
    };

    script.onerror = () => {
      setError("Failed to load Paystack script.");
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Calculate total in Naira
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError("");

      // console.log("PAYMENTS PAGE LOADED");
      // console.log("PAYSTACK KEY:", import.meta.env.VITE_PAYSTACK_PUBLIC_KEY);

      const token = localStorage.getItem("access");

      // Initiate payment on backend (amount in Naira; backend converts to kobo)
      const response = await fetch(
        "https://mascofashion.onrender.com/api/payments/initiate/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: total }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment initiation failed");
      }

      const reference = data.payment.reference;

      // Prevent Paystack error if script is not ready
      if (!scriptLoaded || !window.PaystackPop) {
        setError("Paystack script not loaded.");
        setLoading(false);
        return;
      }

      // Open Paystack payment popup
    
      const paystack = window.PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,

        email:
          JSON.parse(localStorage.getItem("user"))?.email || "",

        amount: data.amount_kobo,
        currency: "NGN",
        ref: reference,

        onClose: () => {
          alert("Payment popup closed");
        },

        callback: (res) => {
          alert(`Payment successful. Reference: ${res.reference}`);
          clearCart();
          navigate("/Thankyou", {
            state: {
              reference: res.reference,
              amount: total,
            },
          });
        },
      });

      paystack.openIframe();
    } catch (err) {
      console.error(err);
      setError(err.message || "Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

if (!cart || cart.length === 0) {
  return (
    <div className="container mt-5">
      <div className="alert alert-info text-center">
        No items to pay for.
      </div>
    </div>
  );
}

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Payment</h2>

      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">Order Summary</h4>

            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <strong>
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </strong>
                </li>
              ))}
            </ul>

            <h4 className="text-end">
              Total: <strong>₦{total.toLocaleString()}</strong>
            </h4>
            {error && (
  <div className="alert alert-danger mt-3">{error}</div>
)}

<button
  type="button"
  className="btn btn-dark w-100 mt-3"
  onClick={handlePayment}
  disabled={loading || !scriptLoaded}
>
  {loading
    ? "Processing..."
    : !scriptLoaded
    ? "Loading payment..."
    : "Pay Now"}
</button>


           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payments;