import { Link } from "react-router-dom";
import imageLeft from "../assets/images/product002.jpg"
import imageRight from "../assets/images/product001.jpg"
import imageCenter from "../assets/images/images2.png"
import imageCenterBottom from "../assets/images/images1.png"
const Banner = () => {
  return (
    <section id="hero" className="mt-4">
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    {/* first image */}
                    <div className="bg-light">
                        <img 
                        src={imageLeft} alt="" className="img-fluid"
                        style={{height:'570px'
                        }} />
                    </div>
                </div>
                <div className="col-md-4">
                    {/* second cont */}
                    <div className="col-md-12" style={
                        {height:"22vh"}
                    }>
                        <div className="card h-100 overflow-hidden">
                            <img src={imageCenter} className="img-fluid" alt="" />
                        </div>
                    </div>
                    <div className="col-md-12 text-center">
                        <div className="my-3">
                            <h3 className="display-4 fw-bold">Ultimate</h3>
                        <h1 className="display-1 fw-bold text-dark">SALE</h1>
                        <p className="lead">NEW COLLECTION</p>
                        <Link to="/ShopPage" className="btn btn-dark btn-lg">Shop Now</Link>
                        </div>
                    </div>
                    <div className="col-md-12" style={
                        {height:"21vh"

                        }}>
                        <div className="card h-100 overflow-hidden">
                            <img src={imageCenterBottom} className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-light">
                        <img src={imageRight} alt="" className="img-fluid" 
                        style={{height:'570px'}} />
                    </div>
                    {/* third image */}
                </div>
            </div>
        </div>
    </section>
)
}

export default Banner