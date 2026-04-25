
import React from 'react'
import { Link } from 'react-router-dom'

const ViewMore = () => {
  return (
    <div className='text-center my-4'>
      <Link to="/ShopPage" className="btn btn-dark btn-lg text-white text-decoration-none">
        View More
      </Link>
    </div>
  )
}

export default ViewMore






{/*import React from 'react'
import { Link } from 'react-router-dom'

const ViewMore = () => {
  return (
    <div className='text-center my-4'>
      <button type="button" className="btn btn-dark btn-lg"> 
        <Link to="/ShopPage" className="text-white text-decoration-none">View More</Link>
      </button>
    </div>
  )
}

export default ViewMore*/}