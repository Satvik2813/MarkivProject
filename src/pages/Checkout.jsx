import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, formatINR } from "../context/CartContext";
import Pouch from "../components/Pouch";
import { Check } from "../components/icons";

const FREE_SHIP = 499;
const COUPONS = { SHUDDHA10: 0.1, FRESH50: 50, MILLET15: 0.15 };

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", mobile: "", pincode: "", city: "", address: "" });
  const [errors, setErrors] = useState({});
  const [wallet, setWallet] = useState("UPI");
  const [payMethod, setPayMethod] = useState("COD");
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(null);
  const [couponMsg, setCouponMsg] = useState("");
  const [pinStatus, setPinStatus] = useState(null); // null | 'ok' | 'bad'
  const [placed, setPlaced] = useState(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const checkPin = (val) => {
    setForm((f) => ({ ...f, pincode: val }));
    if (/^\d{6}$/.test(val)) {
      setPinStatus("ok");
      // fake city lookup
      if (!form.city) setForm((f) => ({ ...f, pincode: val, city: guessCity(val) }));
    } else {
      setPinStatus(val.length ? "bad" : null);
    }
  };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code] != null) {
      setApplied(code);
      setCouponMsg(`✓ Coupon ${code} applied!`);
    } else {
      setApplied(null);
      setCouponMsg("Invalid coupon code");
    }
  };

  const discount = applied
    ? COUPONS[applied] < 1 ? Math.round(subtotal * COUPONS[applied]) : COUPONS[applied]
    : 0;
  const shipping = subtotal >= FREE_SHIP ? 0 : subtotal > 0 ? 49 : 0;
  const grandTotal = Math.max(0, subtotal - discount + shipping);

  const progress = Math.min(100, (subtotal / FREE_SHIP) * 100);

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Enter your name";
    if (!/^\d{10}$/.test(form.mobile)) er.mobile = "Enter a valid 10-digit mobile";
    if (!/^\d{6}$/.test(form.pincode)) er.pincode = "Enter a valid 6-digit pincode";
    if (!form.city.trim()) er.city = "Enter city/state";
    if (!form.address.trim()) er.address = "Enter your address";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const placeOrder = () => {
    if (items.length === 0) return;
    if (!validate()) {
      document.querySelector(".checkout-form")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setPlaced(true);
    clearCart();
    window.scrollTo(0, 0);
  };

  if (placed) {
    return (
      <div className="container section order-success">
        <div className="success-badge"><Check size={40} /></div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you, {form.name.split(" ")[0] || "friend"} 🌾 Your millets are being freshly milled and will ship soon.</p>
        <p className="order-id">Order ID: <b>#SM{Math.floor(100000 + Math.random() * 899999)}</b></p>
        <div className="success-actions">
          <Link to="/shop" className="btn btn-green">Continue Shopping</Link>
          <Link to="/" className="btn btn-outline">Back Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout">
      <h1 className="section-title" style={{ fontSize: 40 }}>Checkout</h1>

      {items.length === 0 ? (
        <div className="no-results" style={{ margin: "40px 0" }}>
          <p>Your cart is empty — add some fresh millets first.</p>
          <Link to="/shop" className="btn btn-green">Go to Shop</Link>
        </div>
      ) : (
        <div className="checkout-grid">
          {/* LEFT: FORM */}
          <div className="checkout-form">
            <h2 className="step-heading">Step 1. Delivery Details</h2>
            <div className="field-row">
              <div className="field">
                <input placeholder="Name" value={form.name} onChange={set("name")} />
                {errors.name && <small className="err">{errors.name}</small>}
              </div>
              <div className="field">
                <input placeholder="Mobile Number" value={form.mobile} maxLength={10}
                  onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value.replace(/\D/g, "") }))} />
                {errors.mobile && <small className="err">{errors.mobile}</small>}
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label className="field-label">Indian Pincode Check</label>
                <div className="pin-wrap">
                  <input placeholder="Enter Pincode" value={form.pincode} maxLength={6}
                    onChange={(e) => checkPin(e.target.value.replace(/\D/g, ""))} />
                  {pinStatus === "ok" && <span className="pin-ok"><Check size={16} /></span>}
                </div>
                {pinStatus === "ok" && <small className="ok">✓ Delivers in 3–5 days</small>}
                {pinStatus === "bad" && <small className="err">Enter a valid 6-digit pincode</small>}
                {errors.pincode && !pinStatus && <small className="err">{errors.pincode}</small>}
              </div>
              <div className="field">
                <label className="field-label">City / State</label>
                <input placeholder="City/State" value={form.city} onChange={set("city")} />
                {errors.city && <small className="err">{errors.city}</small>}
              </div>
            </div>

            <div className="field">
              <label className="field-label">Address Input</label>
              <input placeholder="Street, Apartment, Landmark…" value={form.address} onChange={set("address")} />
              {errors.address && <small className="err">{errors.address}</small>}
            </div>

            <h2 className="step-heading" style={{ marginTop: 34 }}>Step 2. Payment Options</h2>
            <label className="field-label">Digital Wallet</label>
            <div className="wallet-row">
              {[
                { id: "UPI", label: "UPI", sub: "For most digital wallets" },
                { id: "GPay", label: "GPay", sub: "Google Pay" },
                { id: "PhonePe", label: "PhonePe", sub: "" },
              ].map((w) => (
                <button
                  key={w.id}
                  className={"wallet" + (wallet === w.id ? " active" : "")}
                  onClick={() => { setWallet(w.id); setPayMethod("UPI"); }}
                >
                  <span className="radio">{wallet === w.id && payMethod === "UPI" && <i />}</span>
                  <span className="wallet-name">{w.label}</span>
                  {w.sub && <small>{w.sub}</small>}
                </button>
              ))}
            </div>

            <div className="pay-row">
              <button className={"pay-opt" + (payMethod === "COD" ? " active" : "")} onClick={() => setPayMethod("COD")}>
                <span className="radio">{payMethod === "COD" && <i />}</span>
                Cash on Delivery
              </button>
              <button className={"pay-opt" + (payMethod === "CARD" ? " active" : "")} onClick={() => setPayMethod("CARD")}>
                <span className="radio">{payMethod === "CARD" && <i />}</span>
                Credit / Debit Cards
                <span className="cards">VISA · MC · AMEX</span>
              </button>
            </div>

            {payMethod === "CARD" && (
              <div className="card-note">
                🔒 For your security, card details are entered on our encrypted payment gateway after you place the order.
              </div>
            )}
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <aside className="order-summary">
            <h3>Order Summary</h3>
            <p className="ship-progress-label">
              {subtotal >= FREE_SHIP ? "🎉 Free shipping unlocked!" : `Add ${formatINR(FREE_SHIP - subtotal)} for free shipping`}
            </p>
            <div className="ship-track"><span style={{ width: progress + "%" }} /></div>

            <div className="summary-items">
              {items.map((i) => (
                <div className="summary-item" key={i.key}>
                  <div className="si-thumb"><Pouch name={i.name} grain={i.grain} photo={i.img} size={44} /></div>
                  <div className="si-info">
                    <b>{i.name}</b>
                    <small>{i.pack} × {i.qty}</small>
                  </div>
                  <span>{formatINR(i.price * i.qty)}</span>
                </div>
              ))}
            </div>

            <div className="summary-line"><span>Subtotal</span><b>{formatINR(subtotal)}</b></div>
            {discount > 0 && <div className="summary-line disc"><span>Discount ({applied})</span><b>−{formatINR(discount)}</b></div>}
            <div className="summary-line"><span>Shipping</span><b>{shipping === 0 ? "FREE" : formatINR(shipping)}</b></div>
            <div className="summary-total"><span>Grand Total</span><b>{formatINR(grandTotal)}</b></div>

            <div className="coupon">
              <input placeholder="Apply Coupon (try SHUDDHA10)" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
              <button className="btn btn-green" onClick={applyCoupon}>Apply</button>
            </div>
            {couponMsg && <small className={applied ? "ok" : "err"}>{couponMsg}</small>}

            <div className="trust">
              <h4>Trust &amp; Safety</h4>
              <div className="trust-badges">
                <span>🛡️ FSSAI<br />Certified</span>
                <span>🌿 100%<br />Organic</span>
                <span>🌾 Freshly<br />Milled</span>
              </div>
            </div>

            <button className="btn btn-green btn-block place-order" onClick={placeOrder}>
              🔒 Place Order Securely
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

function guessCity(pin) {
  const first = pin[0];
  const map = { 1: "Delhi, DL", 2: "Lucknow, UP", 3: "Ahmedabad, GJ", 4: "Mumbai, MH", 5: "Hyderabad, TS", 6: "Chennai, TN", 7: "Kolkata, WB", 8: "Patna, BR" };
  return map[first] || "";
}
