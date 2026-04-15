
import React from 'react'
import { Link } from 'react-router-dom'

const PinkyBlinder = () => {
  return (
    <div className='text-center my-4'>
      <div className="mb-3">
        <h2 className="fw-bold">Explore The Pinky Blinder Collection</h2>
        <p className="lead">Step into the world of Pinky Blinder - where fashion meets elegance.</p>
      </div>

      <Link to="/ShopPage" className="btn btn-dark btn-lg text-white text-decoration-none">
        Shop Pinky Blinder
      </Link>
    </div>
  )
}

export default PinkyBlinder
