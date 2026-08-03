import { Link } from "react-router-dom";
import { useCart, formatINR } from "../context/CartContext";
import { Star, Cart } from "./icons";
import Pouch from "./Pouch";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="pc-image">
        <Pouch name={product.name} grain={product.grain} size={200} />
        {product.featured && <span className="pc-badge">Bestseller</span>}
      </Link>
      <div className="pc-body">
        <Link to={`/product/${product.id}`}><h3 className="pc-name">{product.name}</h3></Link>
        <div className="pc-rating">
          <Star size={15} /><b>{product.rating.toFixed(1)}</b>
          <span>({product.reviews})</span>
        </div>
        <p className="pc-price">{formatINR(product.price)} <span>/ {product.unit}</span></p>
        <div className="pc-tags">
          {product.tags.map((t) => <span className="pill" key={t}>{t}</span>)}
        </div>
        <button className="btn btn-rust btn-block" onClick={() => addItem(product)}>
          <Cart size={17} /> Quick Add
        </button>
      </div>
    </div>
  );
}
