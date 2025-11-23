import { createContext, useContext, useReducer, useState, useEffect, useMemo } from "react";

const CartCtx = createContext(null);

function reducer(state, action){
  switch(action.type){
    case "LOAD":
      return action.payload || [];
    case "ADD": {
      const i = state.findIndex(it => it.name === action.item.name);
      if (i >= 0){
        const next = [...state];
        next[i] = {...next[i], qty: next[i].qty + 1};
        return next;
      }
      return [...state, {...action.item, qty:1}];
    }
    case "INC": {
      const next = [...state];
      next[action.index] = {...next[action.index], qty: next[action.index].qty + 1};
      return next;
    }
    case "DEC": {
      const next = [...state];
      next[action.index] = {...next[action.index], qty: next[action.index].qty - 1};
      return next.filter(it => it.qty > 0);
    }
    case "REMOVE": {
      const next = [...state];
      next.splice(action.index,1);
      return next;
    }
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({children}){
  const [cart, dispatch] = useReducer(reducer, []);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // load from localStorage
  useEffect(()=>{
    const raw = localStorage.getItem("react-cart");
    dispatch({type:"LOAD", payload: raw ? JSON.parse(raw) : []});
  },[]);
  // save to localStorage
  useEffect(()=>{
    localStorage.setItem("react-cart", JSON.stringify(cart));
  },[cart]);

  const value = useMemo(()=>({
    cart,
    add:(item)=>dispatch({type:"ADD", item}),
    inc:(index)=>dispatch({type:"INC", index}),
    dec:(index)=>dispatch({type:"DEC", index}),
    remove:(index)=>dispatch({type:"REMOVE", index}),
    clear:()=>dispatch({type:"CLEAR"}),
    totalQty:()=>cart.reduce((s,it)=>s+it.qty,0),
    totalPrice:()=>cart.reduce((s,it)=>s+it.qty*it.price,0),
    drawerOpen,
    open:()=>setDrawerOpen(true),
    close:()=>setDrawerOpen(false)
  }),[cart, drawerOpen]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart(){
  const ctx = useContext(CartCtx);
  if(!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
