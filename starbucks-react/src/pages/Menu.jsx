import { useEffect, useState } from "react";
import { useCart } from "../cart/CartContext.jsx";
import { API_BASE } from "../api.js";



export default function Menu() {
  const { open, addById } = useCart();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function loadMenu() {
      try {
        setErr("");
        setLoading(true);

        const res = await fetch(`${API_BASE}/menu`);
        if (!res.ok) throw new Error("Failed to load menu");
        const data = await res.json();

        setItems(data);
      } catch (e) {
        setErr(e.message || "Something went wrong loading the menu");
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  async function handleAdd(menuItemId) {
    try {
      setErr("");
      await addById(menuItemId); // updates DB + updates cart state
      open(); // opens cart drawer
    } catch (e) {
      setErr(e.message || "Failed to add item to cart");
    }
  }

  if (loading) {
    return <div className="container my-4">Loading menu…</div>;
  }

  return (
    <section className="container my-4">
      <h2 className="mb-3">Menu</h2>

      {err && <div className="alert alert-danger">{err}</div>}

      <div className="row g-3">
        {items.map((it) => (
          <div key={it._id} className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100">
              {}
<img src={`${import.meta.env.BASE_URL}${it.imageKey}`} alt={it.name} className="card-img-top menu-img" />


              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{it.name}</h5>

                <p className="card-text text-muted">
                  {it.description || " "}
                </p>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <strong>${Number(it.price).toFixed(2)}</strong>

                  <button
                    className="btn btn-green"
                    onClick={() => handleAdd(it._id)}
                  >
                    
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}