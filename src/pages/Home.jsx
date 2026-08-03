import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { Arrow, Star } from "../components/icons";

export default function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1 className="hero-title">100%<br />Organic<br />Ancestral<br />Superfood</h1>
            <p className="hero-sub">Pristine Nutrition from Nature's Bounty.</p>
            <Link to="/shop" className="btn btn-gold">Explore Fresh Batches <Arrow /></Link>
            <div className="hero-trust">
              <div><b>50,000+</b><span>Happy Families</span></div>
              <div><b>4.9★</b><span>Avg. Rating</span></div>
              <div><b>100%</b><span>Stone Ground</span></div>
            </div>
          </div>
          <div className="hero-art">
            <img className="hero-img" src="/img/hero.jpg" alt="Wholesome millet breakfast bowl" />
          </div>
        </div>
      </section>

      {/* WHY FRESH MILLETS */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Why Fresh Millets Matter</p>
          <h2 className="section-title">Nutrition the way nature intended</h2>
          <div className="why-grid">
            {[
              { icon: "🌾", t: "Milled on Order", d: "We grind only after you order, so nutrients and aroma stay locked in." },
              { icon: "🚜", t: "Certified Organic Farms", d: "Directly sourced from small Indian farmers using ancestral methods." },
              { icon: "🪨", t: "Cold Stone Grinding", d: "Low-heat grinding preserves calcium, iron and living enzymes." },
              { icon: "🧪", t: "Zero Preservatives", d: "Nothing added, nothing hidden — just pure whole millet." },
            ].map((c) => (
              <div className="why-card" key={c.t}>
                <span className="why-icon">{c.icon}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section" style={{ background: "var(--cream-2)" }}>
        <div className="container">
          <div className="row-between">
            <div>
              <p className="eyebrow">Fresh Off the Mill</p>
              <h2 className="section-title">Our Bestsellers</h2>
            </div>
            <Link to="/shop" className="btn btn-outline">View All <Arrow /></Link>
          </div>
          <div className="product-grid">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* PROCESS TEASER */}
      <section className="section">
        <div className="container process-teaser">
          <div>
            <p className="eyebrow">From Traditional Farms to Your Kitchen</p>
            <h2 className="section-title">Rooted in tradition, crafted for purity</h2>
            <ol className="process-list">
              <li><b>Organic Farming</b> — Sourced from certified Indian farms</li>
              <li><b>Sun Drying</b> — Preserving natural goodness</li>
              <li><b>Traditional Stone Grinding</b> — Cold-milled for superior taste</li>
              <li><b>Nitrogen-Sealed Freshness</b> — Purity and long shelf life</li>
            </ol>
            <Link to="/our-farm" className="btn btn-green">Discover Our Heritage <Arrow /></Link>
          </div>
          <div className="process-quote">
            <p>"Ancestral wisdom, combined with sustainable farming, empowers our communities and brings you true health."</p>
            <span>— Our Founders</span>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ background: "var(--green)", color: "#f0ead9" }}>
        <div className="container">
          <h2 className="section-title" style={{ color: "#fff", textAlign: "center" }}>Loved across India</h2>
          <div className="testi-grid">
            {[
              { n: "Ananya R.", c: "Bengaluru", q: "The ragi malt is my kid's favourite breakfast now. You can actually smell the freshness!" },
              { n: "Vikram S.", c: "Hyderabad", q: "As a diabetic, the low-GI mix has helped me keep my sugar steady. Genuinely great quality." },
              { n: "Meera J.", c: "Pune", q: "Jowar rotis come out so soft. Nothing like the stale flour from supermarkets." },
            ].map((t) => (
              <div className="testi-card" key={t.n}>
                <div className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}</div>
                <p>"{t.q}"</p>
                <b>{t.n}</b><span> · {t.c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container cta-band">
          <h2>Taste the difference of freshly-milled millets</h2>
          <Link to="/shop" className="btn btn-gold">Shop Fresh Batches <Arrow /></Link>
        </div>
      </section>
    </>
  );
}
