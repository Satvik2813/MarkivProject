import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories, quickFilters } from "../data/products";
import ProductCard from "../components/ProductCard";

const MAX_PRICE = 1200;

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState("popular");

  const q = params.get("q") || "";
  const activeCat = params.get("cat") || "";
  const activeFilter = params.get("filter") || "";

  useEffect(() => { setMaxPrice(MAX_PRICE); }, [activeCat, activeFilter]);

  const setParam = (key, val) => {
    const next = new URLSearchParams(params);
    if (val) next.set(key, val); else next.delete(key);
    setParams(next);
  };

  const list = useMemo(() => {
    let arr = products.filter((p) => p.price <= maxPrice);
    if (q) {
      const t = q.toLowerCase();
      arr = arr.filter((p) => (p.name + p.category + p.desc).toLowerCase().includes(t));
    }
    if (activeCat) arr = arr.filter((p) => p.category === activeCat);
    if (activeFilter) arr = arr.filter((p) => p.filters.includes(activeFilter));

    if (sort === "price-asc") arr = [...arr].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") arr = [...arr].sort((a, b) => b.price - a.price);
    else if (sort === "rating") arr = [...arr].sort((a, b) => b.rating - a.rating);
    else arr = [...arr].sort((a, b) => b.reviews - a.reviews);
    return arr;
  }, [q, activeCat, activeFilter, maxPrice, sort]);

  return (
    <>
      {/* filter chips bar */}
      <div className="chips-bar">
        <div className="container chips-inner">
          {quickFilters.map((f) => (
            <button
              key={f}
              className={"chip" + (activeFilter === f ? " active" : "")}
              onClick={() => setParam("filter", activeFilter === f ? "" : f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="container shop-layout">
        {/* SIDEBAR */}
        <aside className="shop-sidebar">
          <h4>Category</h4>
          {categories.map((g) => (
            <div key={g.group}>
              <button
                className={"cat-group" + (!activeCat ? " active" : "")}
                onClick={() => setParam("cat", "")}
              >
                {g.group}
              </button>
              {g.items.map((it) => (
                <button
                  key={it}
                  className={"cat-item" + (activeCat === it ? " active" : "")}
                  onClick={() => setParam("cat", activeCat === it ? "" : it)}
                >
                  {it}
                </button>
              ))}
            </div>
          ))}

          <h4 style={{ marginTop: 26 }}>Refine By Price</h4>
          <input
            type="range" min="100" max={MAX_PRICE} step="10" value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="range"
          />
          <div className="range-labels">
            <span>₹100</span><span>Up to ₹{maxPrice}</span>
          </div>

          <h4 style={{ marginTop: 26 }}>Sort By</h4>
          <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          {(activeCat || activeFilter || q) && (
            <button className="btn btn-outline btn-block" style={{ marginTop: 24 }} onClick={() => setParams({})}>
              Clear Filters
            </button>
          )}
        </aside>

        {/* GRID */}
        <div className="shop-main">
          <div className="shop-head">
            <h1 className="section-title" style={{ fontSize: 32, marginBottom: 0 }}>
              {activeCat || activeFilter || (q ? `Results for "${q}"` : "All Products")}
            </h1>
            <span className="result-count">{list.length} product{list.length !== 1 ? "s" : ""}</span>
          </div>

          {list.length === 0 ? (
            <div className="no-results">
              <p>No products match your filters.</p>
              <button className="btn btn-green" onClick={() => setParams({})}>Reset</button>
            </div>
          ) : (
            <div className="product-grid">
              {list.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
