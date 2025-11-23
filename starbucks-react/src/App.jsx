import { Routes, Route, NavLink } from "react-router-dom";
import { CartProvider, useCart } from "./cart/CartContext.jsx";
import CartDrawer from "./cart/CartDrawer.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
const base = import.meta.env.BASE_URL;

function Navbar(){
  const { open, totalQty } = useCart();

  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top">
      <div className="container py-2 border-bottom">
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={`${base}logo.png`} alt="logo" width="36" height="36" />
          <span className="fw-bold">Starbucks</span>
        </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navLinks">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navLinks">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/menu">Menu</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
          </ul>

          <button className="btn btn-green ms-2" onClick={open}>
            🛒 <span className="badge bg-light text-success ms-1">{totalQty()}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default function App(){
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
      <CartDrawer />
      <footer className="border-top bg-white mt-4">
        <div className="container py-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div className="d-flex gap-2">
            <a href="https://www.facebook.com/Starbucks" target="_blank">Facebook</a> ·
            <a href="https://www.instagram.com/starbucks/" target="_blank">Instagram</a> ·
            <a href="https://twitter.com/Starbucks" target="_blank">X</a>
          </div>
          <div>Mon–Fri 7am–8pm · Sat–Sun 8am–7pm</div>
          <div>Erica Li Homework 3</div>
        </div>
      </footer>
    </CartProvider>
  );
}
