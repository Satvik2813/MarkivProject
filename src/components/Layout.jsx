import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import { useCart } from "../context/CartContext";
import { Cart, Check } from "./icons";

export default function Layout() {
  const { count, toast, setDrawerOpen } = useCart();
  const { pathname } = useLocation();

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />

      {count > 0 && (
        <button className="float-cart" onClick={() => setDrawerOpen(true)}>
          <Cart size={22} /> My Cart ({count})
          <span className="dot" />
        </button>
      )}

      {toast && (
        <div className="toast"><Check /> {toast}</div>
      )}
    </>
  );
}
