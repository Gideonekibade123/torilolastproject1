import React from 'react'
import sponsor from "../assets/images/sponsor.png"
const Sponsors = () => {
  return (
    <section className="my-3">
        <div className="container py-5">
            <div className="row">
                <div className="col-md-12">
                    <img src={sponsor} alt="Our sponsors" className='img-fluid' />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Sponsors