import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaCheckCircle, 
  FaCar, 
  FaChevronDown, 
  FaChevronUp,
  FaCalendarDay,
  FaCalendarAlt,
  FaCalendarCheck
} from "react-icons/fa";
import "./CarCard.css";

const CarCard = ({ car, isSelected, onSelect }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleReserve = (e) => {
    e.stopPropagation();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/payment");
  };

  const handleCardClick = (e) => {
    // Only call onSelect if we're not clicking on a button or link
    if (!e.target.closest('button') && !e.target.closest('a')) {
      onSelect?.();
    }
  };

  return (
    <div
      className={`car-card ${isSelected ? "selected" : ""}`}
      onClick={handleCardClick}
    >
      {/* Car Image with fallback */}
      <img 
        src={car.image || 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-4.0.3'} 
        alt={car.name} 
        className="car-image" 
      />

      {/* Car Information */}
      <div className="car-info">
        {/* Name with icon */}
        <h3 className="car-name">
          <FaCar className="car-icon" />
          {car.name}
        </h3>

        {/* Pricing */}
        <div className="car-pricing">
          <div className="price-tag">
            <FaCalendarDay className="price-icon" />
            <div>
              <div className="price-label">Daily</div>
              <div className="price-amount">${car.pricePerDay}</div>
            </div>
          </div>
          <div className="price-tag">
            <FaCalendarAlt className="price-icon" />
            <div>
              <div className="price-label">Monthly</div>
              <div className="price-amount">${car.pricePerMonth}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="car-description">{car.info}</p>

        {/* Details Toggle */}
        <button
          className="details-btn"
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(!showDetails);
          }}
        >
          {showDetails ? "Hide Details" : "Show Details"}
          {showDetails ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {/* Additional Details */}
        {showDetails && (
          <div className="details-content">
            <p><strong>Model:</strong> {car.model || 'Premium Model'}</p>
            <p><strong>Type:</strong> {car.type || 'Luxury Vehicle'}</p>
            <p><strong>Features:</strong> {car.features || 'Automatic transmission, Premium sound system'}</p>
            
            {/* Reserve Button */}
            <button 
              className="reserve-btn" 
              onClick={handleReserve}
            >
              <FaCalendarCheck className="reserve-icon" />
              Reserve Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;