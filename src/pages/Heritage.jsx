import { Link } from "react-router-dom";
import { Arrow } from "../components/icons";

const steps = [
  { n: 1, t: "Organic Farming", d: "Sourced from Certified Indian Farms" },
  { n: 2, t: "Sun Drying", d: "Preserving Natural Goodness" },
  { n: 3, t: "Traditional Stone Grinding", d: "Cold-Milled for Superior Taste & Nutrition" },
  { n: 4, t: "Nitrogen-Sealed Freshness", d: "Retaining Purity and Long Shelf Life" },
];

export default function Heritage() {
  return (
    <>
      {/* HERITAGE HERO */}
      <section className="heritage-hero">
        <div className="heritage-split">
          <div className="hs-left"><img src="/img/farm.jpg" alt="Farmer harvesting millet in a golden field" /></div>
          <div className="hs-right"><img src="/img/mill.jpg" alt="Traditional stone grinding mill" /></div>
          <div className="heritage-hero-copy">
            <h1>Our Heritage &amp; Journey:<br />Rooted in Tradition,<br />Crafted for Purity</h1>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ fontSize: 44 }}>From Traditional Farms to Your Kitchen</h2>
          <div className="steps">
            {steps.map((s, i) => (
              <div className="step" key={s.n}>
                <div className="step-top">
                  <span className="step-num">{s.n}</span>
                  {i < steps.length - 1 && <span className="step-line" />}
                </div>
                <div className="step-icon">{["🌱","☀️","🪨","📦"][i]}</div>
                <h3><b>{s.t}</b></h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>

          <div className="founder-quote">
            <p>"Ancestral wisdom, combined with sustainable farming, empowers our communities and brings you true health."</p>
            <span>— Our Founders</span>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section" style={{ background: "var(--cream-2)" }}>
        <div className="container">
          <p className="eyebrow">What we stand for</p>
          <h2 className="section-title">Purity you can trace to the field</h2>
          <div className="why-grid">
            {[
              { icon: "🤝", t: "Fair to Farmers", d: "We pay above-market rates directly to 200+ smallholder families." },
              { icon: "🌍", t: "Regenerative", d: "Millets need little water and heal the soil — good for you and the planet." },
              { icon: "🔬", t: "Lab Tested", d: "Every batch is tested for purity, heavy metals and moisture." },
              { icon: "📅", t: "Milled Fresh", d: "Nitrogen-sealed within hours of grinding to lock in nutrition." },
            ].map((c) => (
              <div className="why-card" key={c.t}>
                <span className="why-icon">{c.icon}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link to="/shop" className="btn btn-gold">Shop Fresh Batches <Arrow /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
