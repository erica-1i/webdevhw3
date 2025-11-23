import { useCart } from "./CartContext.jsx";

export default function CartDrawer(){
  const { cart, inc, dec, remove, clear, totalPrice, drawerOpen, close } = useCart();

  return (
    <>
      {drawerOpen && <div className="cart-overlay" onClick={close}></div>}

      <aside className={`cart-drawer ${drawerOpen ? "show" : ""}`} aria-label="Cart">
        <div className="d-flex justify-content-between align-items-center border-bottom p-3">
          <h5 className="m-0">Your Cart</h5>
          <button className="btn btn-sm btn-outline-secondary" onClick={close}>✕</button>
        </div>

        <div className="p-3" style={{overflowY:"auto", flex:"1 1 auto"}}>
          {cart.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            cart.map((item, index)=>(
              <div key={item.name} className="d-flex justify-content-between align-items-start border-bottom py-3">
                <div>
                  <div className="fw-semibold">{item.name}</div>
                  <div className="text-muted">${item.price.toFixed(2)}</div>
                </div>
                <div className="d-flex flex-column align-items-end gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-sm btn-outline-secondary" onClick={()=>dec(index)}>-</button>
                    <span>{item.qty}</span>
                    <button className="btn btn-sm btn-outline-secondary" onClick={()=>inc(index)}>+</button>
                  </div>
                  <button className="btn btn-sm btn-outline-danger" onClick={()=>remove(index)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-top p-3">
          <div className="d-flex justify-content-between fs-5 mb-2">
            <span>Total:</span>
            <strong>${totalPrice().toFixed(2)}</strong>
          </div>
          <button className="btn w-100 btn-dark mb-2" onClick={clear}>Clear Cart</button>
        </div>
      </aside>
    </>
  );
}
