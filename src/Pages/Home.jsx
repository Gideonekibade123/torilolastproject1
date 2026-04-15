{/*import { Link } from "react-router-dom";*/}
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Sponsors from "../components/Sponsors";
import NewDeal from "../components/NewDeal";
import NewArrival from "../components/NewArrival";
import ViewMore from "../components/ViewMore";
import PinkyBlinder from "../components/PinkyBlinder";
function Home() {
  return (
    <>
    <Navbar />
    <Banner />
    <Sponsors />
    <NewDeal />
    <NewArrival />
    <ViewMore />  
    <PinkyBlinder />
    
    </>
    
  )
}

export default Home;