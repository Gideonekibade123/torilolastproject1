import React from "react";
// import product from "../assets/images/product.png";
import product from "../assets/images/product24.jpg";
// import product1 from "../assets/images/product1.png";
import product1 from "../assets/images/product1.png";
import product2 from "../assets/images/product2.png";
import product3 from "../assets/images/product3.png";
import product4 from "../assets/images/product4.png";
import product5 from "../assets/images/product5.png";

function NewArrival() {
  return (
    <div className="my-5 text-center">

      <h2>New Arrivals</h2>
        <p>Check out the latest additions to our collection!</p> 

<ul className="nav text-center justify-content-center mb-4">
  <li className="nav-item">
    <a className="nav-link active" aria-current="page" href="#">
        <button type="button" className="btn btn-dark">Men's fashion</button></a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#"><button type="button" className="btn btn-dark">Women's fashion</button></a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#"><button type="button" className="btn btn-dark">Women's accessories</button></a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#"><button type="button" className="btn btn-dark">Men's accessories</button></a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#"><button type="button" className="btn btn-dark">Discount Deals</button></a>
  </li>
</ul>


        <div className="container">
            <div className="row">
                <div className="col-md-4 my-3">
                    <img src={product} alt="" className="img-fluid" />
                </div>
                <div className="col-md-4 my-3">
                    <img src={product1} alt="" className="img-fluid" />
                </div>
                <div className="col-md-4 my-3">
                    <img src={product2} alt="" className="img-fluid" />
                </div>
                <div className="col-md-4 my-3">
                    <img src={product3} alt="" className="img-fluid" />
                </div>
                <div className="col-md-4 my-3">
                    <img src={product4} alt="" className="img-fluid" />
                </div>
                <div className="col-md-4 my-3">
                    <img src={product5} alt="" className="img-fluid" />
                </div>
            </div>
        </div>  
    </div>
  );
}
export default NewArrival;