export default function Contact(){
  return (
    <section className="container my-4">
      <h2 className="mb-3">Contact</h2>
      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <form className="bg-white border rounded-3 p-3">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input id="name" className="form-control" placeholder="Your name" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input id="email" type="email" className="form-control" placeholder="you@example.com" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="msg" className="form-label">Message</label>
              <textarea id="msg" rows="5" className="form-control" placeholder="How can we help?" required></textarea>
            </div>
            <button type="submit" className="btn btn-green">Send (Demo)</button>
          </form>
        </div>
        <div className="col-12 col-lg-6">
          <div className="bg-white border rounded-3 p-2">
            <iframe
              title="Map"
              style={{border:0, width:"100%", height:"360px", borderRadius:"12px"}}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.901188046998!2d-73.9851353!3d40.7588962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sStarbucks!5e0!3m2!1sen!2sus!4v1699999999999"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
