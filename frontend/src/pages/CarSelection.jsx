import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import CarCard from "../components/CarCard";
import { FaCar, FaSpinner, FaFilter, FaCalendarAlt } from "react-icons/fa";
import "./CarSelection.css";

const CarSelection = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredCars, setFilteredCars] = useState([]);
  const [priceFilter, setPriceFilter] = useState("all");
  const { startDate, endDate } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call with local images
    setTimeout(() => {
      const mockCars = [
        {
          _id: 1,
          name: "Mercedes S-Class",
          pricePerDay: 250,
          pricePerMonth: 5000,
          info: "Luxury sedan with chauffeur option",
          image: "https://media.ed.edmunds-media.com/mercedes-benz/s-class/2025/oem/2025_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_1600.jpg",
          type: "luxury",
          seats: 4,
          transmission: "automatic"
        },
        {
          _id: 2,
          name: "Audi A3",
          pricePerDay: 120,
          pricePerMonth: 2800,
          info: "Compact executive car",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Audi_A3_8Y_Sedan_IMG_5936.jpg/960px-Audi_A3_8Y_Sedan_IMG_5936.jpg",
          type: "premium",
          seats: 5,
          transmission: "automatic"
        },
        {
          _id: 3,
          name: "BMW X5",
          pricePerDay: 200,
          pricePerMonth: 4500,
          info: "Luxury SUV with all-wheel drive",
          image: "https://hips.hearstapps.com/hmg-prod/images/2024-bmw-x5-m60i-102-6602d48787fb7.jpg?crop=0.790xw:0.591xh;0.103xw,0.214xh&resize=640:*",
          type: "suv",
          seats: 5,
          transmission: "automatic"
        },
        {
          _id: 4,
          name: "Tesla Model 3",
          pricePerDay: 180,
          pricePerMonth: 3800,
          info: "Electric sedan with autopilot",
          image: "https://hips.hearstapps.com/hmg-prod/images/2024-tesla-model-3-long-range-rwd-132-66feb663ecf17.jpg?crop=0.704xw:0.594xh;0.143xw,0.392xh&resize=2048:*",
          type: "electric",
          seats: 5,
          transmission: "automatic"
        },
        {
          _id: 5,
          name: "Porsche 911",
          pricePerDay: 350,
          pricePerMonth: 7000,
          info: "Iconic sports car",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ3-IGAv_Xq-nYX5s9tmRICFXoPSbDyIyig9S_ki0Ran3ewWNdSyp5BjhhGDdAi8YOB8M",
          type: "sports",
          seats: 2,
          transmission: "manual"
        },
        {
          _id: 6,
          name: "Volkswagen Golf",
          pricePerDay: 80,
          pricePerMonth: 1800,
          info: "Reliable compact car",
          image: "https://bluesky-cogcms-prodb.cdn.imgeng.in/media/aflbh5oa/mk7.jpg?&width=1500&center=0.5,0.5&mode=crop&scale=both",
          type: "compact",
          seats: 5,
          transmission: "manual"
        }
      ];
      setCars(mockCars);
      setFilteredCars(mockCars);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (priceFilter === "all") {
      setFilteredCars(cars);
    } else if (priceFilter === "budget") {
      setFilteredCars(cars.filter(car => car.pricePerDay < 100));
    } else if (priceFilter === "midrange") {
      setFilteredCars(cars.filter(car => car.pricePerDay >= 100 && car.pricePerDay < 200));
    } else if (priceFilter === "luxury") {
      setFilteredCars(cars.filter(car => car.pricePerDay >= 200));
    }
  }, [priceFilter, cars]);

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner" />
        <p>Loading our premium fleet...</p>
      </div>
    );
  }

  return (
    <div className="car-selection-page">
      <div className="header">
        <div className="header-content">
          <FaCar className="page-icon" />
          <h1>Available Cars</h1>
          {startDate && endDate && (
            <div className="date-display">
              <FaCalendarAlt className="calendar-icon" />
              <span>{new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        
        <div className="filter-controls">
          <div className="filter-group">
            <FaFilter className="filter-icon" />
            <select 
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="price-filter"
            >
              <option value="all">All Prices</option>
              <option value="budget">Budget (&lt; $100/day)</option>
              <option value="midrange">Mid-Range ($100-$200/day)</option>
              <option value="luxury">Luxury (&gt; $200/day)</option>
            </select>
          </div>
        </div>
      </div>

      {filteredCars.length > 0 ? (
        <div className="car-grid">
          {filteredCars.map((car) => (
            <CarCard 
              key={car._id} 
              car={car} 
              startDate={startDate} 
              endDate={endDate}
            />
          ))}
        </div>
      ) : (
        <div className="no-cars">
          <FaCar className="empty-icon" />
          <p>No cars match your filters</p>
          <button 
            onClick={() => setPriceFilter("all")}
            className="reset-filters"
          >
            Reset Filters
          </button>
        </div>
      )}

      <div className="back-to-home">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CarSelection;