import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf } from "./icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 3000);
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="logo" style={{ marginBottom: 14 }}>
            <Leaf />
            <span className="logo-text">Shuddha<small>Millets</small></span>
          </div>
          <p style={{ maxWidth: 320, color: "#cfc9b8" }}>
            100% organic, stone-ground millet powders and flours — sourced from certified Indian
            farms and milled fresh on every order.
          </p>
        </div>

        <div>
          <h4>Shop</h4>
          <Link to="/shop">All Products</Link>
          <Link to="/shop?cat=Ragi Powders">Ragi Powders</Link>
          <Link to="/shop?cat=Flours">Millet Flours</Link>
          <Link to="/shop?filter=Low GI for Diabetes">Diabetic Care</Link>
          <Link to="/shop?filter=Baby Food">Baby Food</Link>
        </div>

        <div>
          <h4>Company</h4>
          <Link to="/our-farm">Our Farm</Link>
          <Link to="/benefits">Benefits</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/shop">Track Order</Link>
        </div>

        <div>
          <h4>Fresh Batches Newsletter</h4>
          <p style={{ color: "#cfc9b8" }}>Get milling updates & recipes.</p>
          <form className="news-form" onSubmit={subscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              aria-label="Email"
            />
            <button className="btn btn-gold" type="submit">Join</button>
          </form>
          {done && <p style={{ color: "var(--gold)", marginTop: 8 }}>✓ Subscribed! Check your inbox.</p>}
        </div>
      </div>
      <div className="container footer-bottom">
        © {new Date().getFullYear()} Shuddha Millets · FSSAI Certified · Made with millets in India
      </div>
    </footer>
  );
}
