import { useNavigate } from "react-router-dom";
import { useCart, formatINR } from "../context/CartContext";
import { Close, Trash, Cart } from "./icons";
import Pouch from "./Pouch";

const FREE_SHIP = 499;

export default function CartDrawer() {
  const { items, drawerOpen, setDrawerOpen, updateQty, removeItem, subtotal, count } = useCart();
  const navigate = useNavigate();

  const remaining = Math.max(0, FREE_SHIP - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIP) * 100);

  const goCheckout = () => {
    setDrawerOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      <div
        className="drawer-overlay"
        style={{ opacity: drawerOpen ? 1 : 0, pointerEvents: drawerOpen ? "auto" : "none" }}
        onClick={() => setDrawerOpen(false)}
      />
      <aside className={"drawer" + (drawerOpen ? " open" : "")} aria-hidden={!drawerOpen}>
        <div className="drawer-head">
          <h3><Cart size={22} /> Your Cart ({count})</h3>
          <button onClick={() => setDrawerOpen(false)} aria-label="Close cart"><Close /></button>
        </div>

        <div className="ship-bar">
          {remaining > 0 ? (
            <p>Add <b>{formatINR(remaining)}</b> more for <b>FREE shipping</b> 🚚</p>
          ) : (
            <p>🎉 You've unlocked <b>FREE shipping!</b></p>
          )}
          <div className="ship-track"><span style={{ width: progress + "%" }} /></div>
        </div>

        <div className="drawer-body">
          {items.length === 0 && (
            <div className="cart-empty">
              <div className="empty-emoji">🌾</div>
              <p>Your cart is empty.</p>
              <button className="btn btn-green" onClick={() => { setDrawerOpen(false); navigate("/shop"); }}>Start Shopping</button>
            </div>
          )}
          {items.map((i) => (
            <div className="cart-line" key={i.key}>
              <div className="cart-thumb"><Pouch name={i.name} grain={i.grain} size={58} /></div>
              <div className="cart-info">
                <p className="cart-name">{i.name}</p>
                <p className="cart-pack">Pack: {i.pack}</p>
                <div className="qty">
                  <button onClick={() => updateQty(i.key, i.qty - 1)} aria-label="Decrease">−</button>
                  <span>{i.qty}</span>
                  <button onClick={() => updateQty(i.key, i.qty + 1)} aria-label="Increase">+</button>
                </div>
              </div>
              <div className="cart-right">
                <span className="cart-price">{formatINR(i.price * i.qty)}</span>
                <button className="cart-remove" onClick={() => removeItem(i.key)} aria-label="Remove"><Trash /></button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="drawer-foot">
            <div className="drawer-subtotal">
              <span>Subtotal</span>
              <b>{formatINR(subtotal)}</b>
            </div>
            <button className="btn btn-gold btn-block" onClick={goCheckout}>Checkout</button>
            <button className="drawer-continue" onClick={() => setDrawerOpen(false)}>Continue Shopping</button>
          </div>
        )}
      </aside>
    </>
  );
}
