import React from "react";

import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      {/* Main Content */}
      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p>
          We'd love to hear from you! Fill out the form below, and our team will get back to you shortly.
        </p>

        {/* Contact Form */}
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" id="fullName" placeholder="Your Name" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" placeholder="Your Phone" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Your Email" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" placeholder="Your Message" rows="5" required></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>

        {/* Google Maps */}
        <div className="map-container">
        <iframe
            title="Meknes Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101098.67385779653!2d-5.566604744842702!3d33.89216604897472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d948b9ac5%3A0x5957f6ae4d51d204!2sMekn%C3%A8s!5e0!3m2!1sen!2sma!4v169841234567890!5m2!1sen!2sma"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;