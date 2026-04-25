import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imagedeal from "../assets/images/imagedeal.png";
import imagedeal1 from "../assets/images/imagedeal1.png";
import imagedeal2 from "../assets/images/imagedeal2.png";
function NewDeal() {
  // ✅ STATE FOR COUNTDOWN
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });  
    // ✅ USE EFFECT FOR COUNTDOWN
useEffect(() => {
  const targetDate = new Date().getTime() + 10 * 24 * 60 * 60 * 1000;

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(timer);
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  }, 1000);

  return () => clearInterval(timer);
}, []);

  // ✅ RETURN UI
  return (
    <section className="my-5">
      <div className="container">
        <div className="row align-items-center bg-light p-4">
          <div className="col-md-3">
            <h3 className="text-dark fw-bold text-nowrap fs-6 fs-sm-5 fs-md-4">
              Deals Of The Month
            </h3>
            <p className="lead">
              Discover the latest trends in fashion and explore.
            </p>

            <button className="btn btn-dark btn-sm">
              <Link to="/ShopPage" className="btn btn-dark btn-sm">
                Buy Now
              </Link>
            </button>

            <p>Hurry, before it's too late!</p>

            {/* ✅ SHOW COUNTDOWN HERE */}


<div className="container mt-3">
  <div className="row g-3 justify-content-center">

    <div className="col-6 col-sm-3">
      <div className="border rounded p-3 text-center">
        <h5 className="m-0 fw-bold">{timeLeft.days}</h5>
        <small>day</small>
      </div>
    </div>

    <div className="col-6 col-sm-3">
      <div className="border rounded p-3 text-center">
        <h5 className="m-0 fw-bold">{timeLeft.hours}</h5>
        <small>hr</small>
      </div>
    </div>

    <div className="col-6 col-sm-3">
      <div className="border rounded p-3 text-center">
        <h5 className="m-0 fw-bold">{timeLeft.minutes}</h5>
        <small>min</small>
      </div>
    </div>

    <div className="col-6 col-sm-3">
      <div className="border rounded p-3 text-center">
        <h5 className="m-0 fw-bold">{timeLeft.seconds}</h5>
        <small>sec</small>
      </div>
    </div>

  </div>
</div>


            
          </div>

          <div className="col-md-3 vh-25">
            <img src={imagedeal} alt="" className="img-fluid vh-25" />
          </div>

          <div className="col-md-3 vh-25">
            <img src={imagedeal1} alt="" className="img-fluid vh-25" />
          </div>

          <div className="col-md-3 vh-25">
            <img src={imagedeal2} alt="" className="img-fluid vh-25" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewDeal;