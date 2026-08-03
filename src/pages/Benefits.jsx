import { Link } from "react-router-dom";
import { Arrow } from "../components/icons";

const benefits = [
  { icon: "🦴", t: "10x Calcium of Milk", d: "Ragi is one of the richest plant sources of calcium — vital for strong bones and teeth at every age." },
  { icon: "📉", t: "Low Glycemic Index", d: "Millets release energy slowly, helping keep blood sugar steady — ideal for people managing diabetes." },
  { icon: "🌾", t: "High Dietary Fibre", d: "Keeps you full for longer, aids digestion and supports healthy, natural weight management." },
  { icon: "💪", t: "Plant Protein & Iron", d: "A wholesome source of protein and iron for energy, immunity and healthy blood." },
  { icon: "🚫", t: "Naturally Gluten-Free", d: "Gentle on sensitive stomachs and perfect for gluten-free and coeliac-friendly diets." },
  { icon: "❤️", t: "Heart Friendly", d: "Magnesium and antioxidants in millets support healthy cholesterol and heart function." },
];

const compare = [
  ["Nutrient (per 100g)", "Ragi", "White Rice", "Wheat"],
  ["Calcium", "344 mg", "10 mg", "30 mg"],
  ["Dietary Fibre", "11 g", "0.6 g", "11 g"],
  ["Iron", "3.9 mg", "0.7 mg", "3.5 mg"],
  ["Glycemic Index", "Low", "High", "Medium"],
];

export default function Benefits() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Benefits</p>
          <h1 className="section-title" style={{ fontSize: 46 }}>Why millets are a true superfood</h1>
          <p className="page-hero-sub">Ancient grains, modern science — here's what makes freshly-milled millets so good for you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="why-grid benefits-page-grid">
            {benefits.map((b) => (
              <div className="why-card" key={b.t}>
                <span className="why-icon">{b.icon}</span>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream-2)" }}>
        <div className="container">
          <h2 className="section-title">How ragi compares</h2>
          <div className="compare-wrap">
            <table className="compare-table">
              <thead>
                <tr>{compare[0].map((h) => <th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {compare.slice(1).map((row) => (
                  <tr key={row[0]}>
                    {row.map((c, i) => <td key={i} className={i === 1 ? "highlight" : ""}>{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Link to="/shop" className="btn btn-gold">Shop Millet Range <Arrow /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
