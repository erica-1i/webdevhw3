import { useState } from "react";
import { useCart } from "./CartContext.jsx";

export default function CartDrawer() {
  const {
    cart,
    loadingCart,
    drawerOpen,
    close,
    incById,
    decById,
    removeById,
    clear,
    totalPrice,
    placeOrder,
  } = useCart();

  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  async function handlePlaceOrder() {
    try {
      setError("");
      setPlacing(true);
      await placeOrder();
      close();
      alert("Order placed! ✅");
    } catch (e) {
      setError(e.message || "Failed to place order");
    } finally {
      setPlacing(false);
    }
  }

  return (
    <>
      {drawerOpen && <div className="cart-overlay" onClick={close}></div>}

      <aside className={`cart-drawer ${drawerOpen ? "show" : ""}`} aria-label="Cart">
        <div className="d-flex justify-content-between align-items-center border-bottom p-3">
          <h5 className="m-0">Your Cart</h5>
          <button className="btn btn-sm btn-outline-secondary" onClick={close}>✕</button>
        </div>

        <div className="p-3" style={{ overflowY: "auto", flex: "1 1 auto" }}>
          {loadingCart ? (
            <p className="text-muted">Loading cart…</p>
          ) : cart.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.menuItemId} className="d-flex justify-content-between align-items-start border-bottom py-3">
                <div>
                  <div className="fw-semibold">{item.name}</div>
                  <div className="text-muted">${item.price.toFixed(2)}</div>
                </div>

                <div className="d-flex flex-column align-items-end gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => decById(item.menuItemId)}>-</button>
                    <span>{item.qty}</span>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => incById(item.menuItemId)}>+</button>
                  </div>

                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeById(item.menuItemId)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}

          {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
        </div>

        <div className="border-top p-3">
          <div className="d-flex justify-content-between fs-5 mb-2">
            <span>Total:</span>
            <strong>${totalPrice().toFixed(2)}</strong>
          </div>

          <button className="btn w-100 btn-dark mb-2" onClick={clear} disabled={placing || cart.length === 0}>
            Clear Cart
          </button>

          <button className="btn w-100 btn-green" onClick={handlePlaceOrder} disabled={placing || cart.length === 0}>
            {placing ? "Placing order…" : "Place Order"}
          </button>
        </div>
      </aside>
    </>
  );
}
