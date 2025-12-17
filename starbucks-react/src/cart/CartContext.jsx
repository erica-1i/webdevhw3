import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { API_BASE } from "../api.js";

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);

  async function fetchCart() {
    try {
      setLoadingCart(true);
      const res = await fetch(`${API_BASE}/cart`);
      const data = await res.json();
      setCartItems(data.items || []);
    } finally {
      setLoadingCart(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  async function post(path, body = undefined) {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      let msg = "Request failed";
      try {
        const err = await res.json();
        msg = err?.error || msg;
      } catch {}
      throw new Error(msg);
    }
    const data = await res.json();
    setCartItems(data.items || []);
    return data;
  }

  const value = useMemo(() => {
    const totalQty = () => cartItems.reduce((s, it) => s + it.qty, 0);
    const totalPrice = () => cartItems.reduce((s, it) => s + it.qty * it.price, 0);

    return {
      // state
      cart: cartItems,
      loadingCart,

      // drawer controls
      drawerOpen,
      open: () => setDrawerOpen(true),
      close: () => setDrawerOpen(false),

      // helpers
      totalQty,
      totalPrice,

      // API-backed actions
      refresh: fetchCart,
      addById: (menuItemId) => post("/cart/add", { menuItemId }),
      incById: (menuItemId) => post("/cart/inc", { menuItemId }),
      decById: (menuItemId) => post("/cart/dec", { menuItemId }),
      removeById: (menuItemId) => post("/cart/remove", { menuItemId }),
      clear: () => post("/cart/clear"),
      placeOrder: async () => {
        const order = await post("/orders/place");
        // backend clears cart automatically; our post() already updated cartItems
        return order;
      },
    };
  }, [cartItems, drawerOpen, loadingCart]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
