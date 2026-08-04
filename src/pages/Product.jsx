import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProduct, products } from "../data/products";
import { useCart, formatINR } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import Pouch from "../components/Pouch";
import { Star, Arrow, Cart, Check } from "../components/icons";

const PACKS = [
  { label: "500g", mult: 1 },
  { label: "1kg", mult: 1.85 },
];

const benefitIcons = ["🥛", "📉", "🚫", "🌿", "⚡", "🌱"];

export default function Product() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const [packIdx, setPackIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);

  if (!product) {
    return (
      <div className="container section" style={{ textAlign: "center" }}>
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-green" style={{ marginTop: 16 }}>Back to Shop</Link>
      </div>
    );
  }

  const pack = PACKS[packIdx];
  const price = Math.round(product.price * pack.mult);
  const unit = pack.label;

  const add = () => addItem(product, { qty, pack: unit, price });
  const buyNow = () => {
    addItem(product, { qty, pack: unit, price, silent: true });
    navigate("/checkout");
  };

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  const fallback = products.filter((p) => p.id !== product.id).slice(0, 3);
  const suggestions = related.length ? related : fallback;

  // gallery[0] = branded pouch (rendered), rest = real detail photos
  const gallery = ["__pouch__", product.img, "/img/mill.jpg", "/img/farm.jpg"];

  return (
    <div className="container pdp">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /{" "}
        <Link to={`/shop?cat=${encodeURIComponent(product.category)}`}>{product.category}</Link> /{" "}
        <span>{product.name}</span>
      </div>

      <div className="pdp-top">
        {/* GALLERY */}
        <div className="pdp-gallery">
          <div className="pdp-thumbs">
            {gallery.map((src, i) => (
              <button
                key={i}
                className={"pdp-thumb" + (imgIdx === i ? " active" : "")}
                onClick={() => setImgIdx(i)}
              >
                {src === "__pouch__"
                  ? <Pouch name={product.name} grain={product.grain} photo={product.img} size={62} />
                  : <img src={src} alt={`${product.name} view ${i + 1}`} />}
              </button>
            ))}
          </div>
          <div className="pdp-main-image">
            {gallery[imgIdx] === "__pouch__"
              ? <Pouch name={product.name} grain={product.grain} photo={product.img} size={340} />
              : <img src={gallery[imgIdx]} alt={product.name} />}
          </div>
        </div>

        {/* INFO */}
        <div className="pdp-info">
          <h1>{product.name}</h1>
          <div className="pdp-rating">
            <div className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}</div>
            <b>{product.rating.toFixed(1)}/5</b>
            <span> | <a href="#reviews">{product.reviews.toLocaleString("en-IN")}+ reviews</a></span>
          </div>

          <p className="pdp-price">{formatINR(price)} <span>/ {unit}</span></p>

          <div className="pdp-pack">
            <label>Pack Size</label>
            <div className="pack-options">
              {PACKS.map((p, i) => (
                <button
                  key={p.label}
                  className={"pack-btn" + (packIdx === i ? " active" : "")}
                  onClick={() => setPackIdx(i)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pdp-qty">
            <label>Quantity</label>
            <div className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
          </div>

          <div className="pdp-actions">
            <button className="btn btn-gold btn-block" onClick={buyNow}>Buy Now <Arrow /></button>
            <button className="btn btn-outline btn-block" onClick={add}><Cart size={18} /> Add to Cart</button>
          </div>

          <ul className="pdp-assurance">
            <li><Check size={16} /> Milled fresh on order</li>
            <li><Check size={16} /> Free shipping over ₹499</li>
            <li><Check size={16} /> FSSAI certified · Lab tested</li>
          </ul>
        </div>
      </div>

      {/* HEALTH BENEFITS */}
      <section className="pdp-benefits">
        <h2>Health Benefits &amp; Nutritional Facts</h2>
        <div className="benefits-grid">
          {product.badges.map((b, i) => (
            <div className="benefit" key={b}>
              <span className="benefit-icon">{benefitIcons[i % benefitIcons.length]}</span>
              <b>{b}</b>
            </div>
          ))}
        </div>
        <p className="pdp-desc">{product.desc}</p>
      </section>

      {/* REVIEWS */}
      <section className="pdp-reviews" id="reviews">
        <h2>What our customers say</h2>
        <div className="review-list">
          {[
            { n: "Priya K.", r: 5, q: "Absolutely fresh and aromatic. My whole family loves it." },
            { n: "Rahul M.", r: 5, q: "Best quality millet powder I've found online. Will reorder." },
            { n: "Sunita D.", r: 4, q: "Great product, packaging keeps it fresh for weeks." },
          ].map((rv) => (
            <div className="review" key={rv.n}>
              <div className="stars">{Array.from({ length: rv.r }).map((_, i) => <Star key={i} size={15} />)}</div>
              <p>"{rv.q}"</p>
              <b>{rv.n}</b> <span className="verified"><Check size={12} /> Verified Buyer</span>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="row-between">
          <h2 className="section-title" style={{ fontSize: 30 }}>You may also like</h2>
          <Link to="/shop" className="btn btn-outline">View All <Arrow /></Link>
        </div>
        <div className="product-grid">
          {suggestions.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
