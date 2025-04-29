import { useState, useEffect, useRef } from "react";  
import { Link } from "react-router-dom";  
import CarCard from "../components/CarCard";  
import ReservationForm from "../components/ReservationForm";  
import ReviewCard from "../components/ReviewCard";  
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "./Home.css";  

const Home = () => {  
  const [cars, setCars] = useState([]);  
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [currentReview, setCurrentReview] = useState(0);
  const reviewRef = useRef(null);

  // Auto-slide effect for reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview(prev => (prev === 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch latest cars (mock API call)  
  useEffect(() => {  
    setCars([  
      {  
        _id: 1,  
        name: "Tesla Model S",  
        pricePerDay: 150,  
        pricePerMonth: 3000,  
        info: "Electric sedan with autopilot",  
        image: "https://hips.hearstapps.com/hmg-prod/images/2025-tesla-model-s-1-672d42e172407.jpg?crop=0.465xw:0.466xh;0.285xw,0.361xh&resize=1200:*",  
      },  
      {  
        _id: 2,  
        name: "BMW X5",  
        pricePerDay: 200,  
        pricePerMonth: 4500,  
        info: "Luxury SUV with all-wheel drive",  
        image: "https://hips.hearstapps.com/hmg-prod/images/2024-bmw-x5-m60i-102-6602d48787fb7.jpg?crop=0.790xw:0.591xh;0.103xw,0.214xh&resize=1200:*",  
      },  
    ]);  
  }, []);  

  return (  
    <div className="home-page">  
      {/* Banner Section */}  
      <div className="banner">  
        <div className="banner-content">  
          <h1>Rent Premium Cars at Unbeatable Prices</h1>  
          <ReservationForm />  
        </div>  
      </div>  

      {/* Promotional Section */}  
      <div className="promo-section">  
        <p>  
          Découvrez la location de voitures premium au meilleur prix, pour des  
          voyages d'exception à travers le monde.  
        </p>  
      </div>  

      {/* Mini About Section */}
      <div className="about-section">
        <div className="about-card">
          <i className="fa-solid fa-globe"></i>
          <h3>Portée mondiale</h3>
          <p>Plus de 2 000 stations SIXT dans plus de 105 pays.</p>
        </div>
        <div className="about-card">
          <i className="fa-solid fa-car"></i>
          <h3>Flotte unique</h3>
          <p>Des cabriolets haut de gamme aux SUV premium.</p>
        </div>
        <div className="about-card">
          <i className="fa-solid fa-award"></i>
          <h3>Service exceptionnel</h3>
          <p>Sans stress, fiable, sans coûts cachés.</p>
        </div>
      </div>

      {/* Offers Section */}  
      <div className="offers-section">  
        <h2>Current Offers</h2>  
        <div className="offer-slider">  
          <div className="offer-card">  
            <div className="offer-card-content">  
              <div className="offer-card-title">10% OFF</div>  
              <div className="offer-card-desc">On Italy reservations</div>  
            </div>  
          </div>  
          <div className="offer-card">  
            <div className="offer-card-content">  
              <div className="offer-card-title">5% OFF</div>  
              <div className="offer-card-desc">With MasterCard payments</div>  
            </div>  
          </div>
          <div className="offer-card">  
            <div className="offer-card-content">  
              <div className="offer-card-title">5% OFF</div>  
              <div className="offer-card-desc">For long-term bookings</div>  
            </div>  
          </div>
          <div className="offer-card">  
            <div className="offer-card-content">  
              <div className="offer-card-title">5% OFF</div>  
              <div className="offer-card-desc">With Visa payments</div>  
            </div>  
          </div>
        </div>  
      </div>

      {/* Latest Cars Section */}  
      <div className="cars-section">  
        <div className="section-header">
          <h2>Latest Cars</h2>
          <div className="section-divider"></div>
        </div>
        <div className="car-grid-container">
          <div className="car-grid">  
            {cars.map((car) => (  
              <CarCard 
                key={car._id} 
                car={car}
                isSelected={selectedCarId === car._id}
                onSelect={() => setSelectedCarId(car._id)}
              />  
            ))}  
          </div>  
        </div>
        <div className="view-all-container">
          <Link to="/cars" className="view-all-btn">  
            View All Cars <i className="fas fa-chevron-right"></i>
          </Link>  
        </div>
      </div>

      {/* Reviews Section */}  
      <div className="reviews-section">
        <div className="section-header">
          <h2>Customer Reviews</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="reviews-container">
          <button 
            className="review-nav-btn prev-btn"
            onClick={() => setCurrentReview(prev => prev === 0 ? 2 : prev - 1)}
          >
            <FaChevronLeft />
          </button>
          
          <div className="reviews-slider" ref={reviewRef}>
            <div 
              className="reviews-track" 
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              <ReviewCard  
                review={{  
                  user: { name: "John Doe", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },  
                  rating: 5,  
                  comment: "Excellent service and pristine cars! The booking process was seamless and the vehicle exceeded my expectations.",  
                  date: "2 days ago"
                }}  
              />
              <ReviewCard  
                review={{  
                  user: { name: "Sarah Johnson", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },  
                  rating: 4,  
                  comment: "Great experience overall. The car was clean and fully equipped. Would definitely rent again!",  
                  date: "1 week ago"
                }}  
              />
              <ReviewCard  
                review={{  
                  user: { name: "Michael Chen", avatar: "https://randomuser.me/api/portraits/men/75.jpg" },  
                  rating: 5,  
                  comment: "Best rental service I've used. The staff was incredibly helpful and the rates were competitive.",  
                  date: "3 weeks ago"
                }}  
              />
            </div>
          </div>
          
          <button 
            className="review-nav-btn next-btn"
            onClick={() => setCurrentReview(prev => prev === 2 ? 0 : prev + 1)}
          >
            <FaChevronRight />
          </button>
        </div>
        
        <div className="review-dots">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              className={`review-dot ${currentReview === i ? 'active' : ''}`}
              onClick={() => setCurrentReview(i)}
            />
          ))}
        </div>
      </div>
    </div>  
  );  
};  

export default Home;