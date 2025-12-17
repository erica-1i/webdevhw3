import { Link } from "react-router-dom";
const base = import.meta.env.BASE_URL;

export default function Home(){
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1 className="fw-bold">Handcrafted Drinks, Cozy Vibes</h1>
          <p>Erica's Starbucks website.</p>
          <div className="d-flex justify-content-center gap-2 flex-wrap mt-3">
            <Link to="/menu" className="btn btn-green">Explore the Menu</Link>
            <Link to="/about" className="btn btn-outline-light">Our Story</Link>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="mb-3">Gallery</h2>
        <div className="row g-3 gallery">
          <div className="col-12 col-md-6"><img src={`${base}drink1.jpg`} alt="Drink 1" /></div>
          <div className="col-12 col-md-6"><img src={`${base}drink2.jpg`} alt="Drink 2" /></div>
          <div className="col-12 col-md-4"><img src={`${base}drink3.jpg`} alt="Drink 3" /></div>
          <div className="col-12 col-md-4"><img src={`${base}drink4.jpg`} alt="Drink 4" /></div>
          <div className="col-12 col-md-4"><img src={`${base}drink5.jpg`} alt="Drink 5" /></div>
        </div>
      </section>
    </>
  );
}
