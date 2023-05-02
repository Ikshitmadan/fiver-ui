
import './App.scss'
import { Navbar } from "./Components/Navbar/Navbar"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";


import { Featured } from "./Components/Featured/Featured";
import { Home } from "./Components/Home/Home";
import './App.scss'
import { Gigs } from "./Components/Gigs/Gigs";
import { Footer } from "./Footer/Footer";
import { Gig } from "./Components/Gig/Gig";
import MyGigs from "./Components/MyGig/MyGig";
import { Order } from "./Components/Order/Order";
import Messages from "./Components/Messages/Messages";
import { Message } from "./Message/Message";
import { Add } from "./Components/Add/Add";
import Login from "./Components/Login/login";
import Register from "./Components/Register/Register";
import { CheckoutForm } from "./Components/Checkout/checkoutForm";
import { Success } from "./Components/Pay/Success";
import { Pay } from "./Components/Pay/Pay";
function App() {


  return (
      <BrowserRouter>
     <Navbar/>
     
     <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/gigs" element={<Gigs/>}/>
      <Route path="/gig/:id" element={<Gig/>}/>
     <Route path="/Mygigs" element={<MyGigs/>}/>
     <Route path="/orders" element={<Order/>}/>
     <Route path="/messages" element={<Messages/>}/>
     <Route path="/message/:id" element={<Message/>}/>
     <Route path="/add" element={<Add/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/checkout" element={<CheckoutForm/>}/>
     <Route path="/success" element={<Success/>}/>
     <Route path="/pay/:id" element={<Pay/>}/>
     </Routes>
     <Footer/>
     
     </BrowserRouter>

  )
}

export default App
