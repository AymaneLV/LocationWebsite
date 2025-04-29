import React from "react";
import { FaCar, FaUsers, FaGlobe } from "react-icons/fa";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <section className="hero-section">
        <h1>About AutoMaison</h1>
        <p>
          At AutoMaison, we are dedicated to providing you with the best car rental experience. Whether you're traveling for business or leisure, our premium fleet and exceptional service ensure a seamless journey.
        </p>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <FaCar className="icon" />
          <h3>Wide Selection of Cars</h3>
          <p>
            From luxury sedans to compact SUVs, we offer a diverse range of vehicles to suit every need and budget.
          </p>
        </div>

        <div className="feature-card">
          <FaUsers className="icon" />
          <h3>Customer-Centric Service</h3>
          <p>
            Our team is committed to delivering personalized support and ensuring your satisfaction throughout your rental period.
          </p>
        </div>

        <div className="feature-card">
          <FaGlobe className="icon" />
          <h3>Global Reach</h3>
          <p>
            With locations in over 100 countries, we make it easy to rent a car wherever your travels take you.
          </p>
        </div>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to redefine the car rental experience by combining convenience, affordability, and reliability. We strive to empower travelers to explore the world with confidence and ease.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;