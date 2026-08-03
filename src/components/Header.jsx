import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Leaf, Cart, Search } from "./icons";

export default function Header() {
  const { count, setDrawerOpen } = useCart();
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    navigate("/shop" + (q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""));
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <NavLink to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <Leaf />
          <span className="logo-text">Shuddha<small>Millets</small></span>
        </NavLink>

        <nav className="nav">
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/our-farm">Our Farm</NavLink>
          <NavLink to="/benefits">Benefits</NavLink>
          <NavLink to="/recipes">Recipes</NavLink>
        </nav>

        <form className="header-search" onSubmit={submitSearch}>
          <Search />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            aria-label="Search products"
          />
        </form>

        <div className="header-actions">
          <button className="cart-btn" onClick={() => setDrawerOpen(true)}>
            <Cart /> My Cart ({count})
          </button>
          <NavLink to="/checkout" className="link-btn">Log In</NavLink>
          <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">☰</button>
        </div>
      </div>

      <div className={"mobile-nav" + (menuOpen ? " open" : "")}>
        <form className="header-search" style={{ maxWidth: "none", display: "block", margin: "8px 0" }} onSubmit={submitSearch}>
          <Search />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" />
        </form>
        <NavLink to="/shop" onClick={() => setMenuOpen(false)}>Shop</NavLink>
        <NavLink to="/our-farm" onClick={() => setMenuOpen(false)}>Our Farm</NavLink>
        <NavLink to="/benefits" onClick={() => setMenuOpen(false)}>Benefits</NavLink>
        <NavLink to="/recipes" onClick={() => setMenuOpen(false)}>Recipes</NavLink>
      </div>
    </header>
  );
}
