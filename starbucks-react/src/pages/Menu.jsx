import { useCart } from "../cart/CartContext.jsx";

const ITEMS = [
  { name:"Caffè Latte", price:4.25, img:"/drink2.jpg", desc:"Rich espresso with steamed milk." },
  { name:"Caramel Macchiato", price:5.25, img:"/drink3.jpg", desc:"Vanilla, espresso, milk, caramel drizzle." },
  { name:"Cold Brew", price:4.75, img:"/drink4.jpg", desc:"Slow-steeped, super smooth." },
  { name:"Matcha Latte", price:5.00, img:"/drink5.jpg", desc:"Stone-ground matcha with milk." },
  { name:"Butter Croissant", price:3.25, img:"/drink6.jpg", desc:"Flaky, buttery goodness." },
  { name:"Blueberry Muffin", price:3.75, img:"/drink1.jpg", desc:"Studded with juicy berries." }
];

export default function Menu(){
  const { add, open } = useCart();

  const handleAdd = (item)=>{
    add({ name:item.name, price:item.price });
    open();
  };

  return (
    <section className="container my-4">
      <h2 className="mb-3">Menu</h2>
      <div className="row g-3">
        {ITEMS.map(item=>(
          <div key={item.name} className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100">
              <img src={item.img} alt={item.name} className="card-img-top menu-img" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-muted">{item.desc}</p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <strong>${item.price.toFixed(2)}</strong>
                  <button className="btn btn-green" onClick={()=>handleAdd(item)}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
