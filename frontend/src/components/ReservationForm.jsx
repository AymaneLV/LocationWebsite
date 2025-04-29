import { useState } from "react";  
import { useNavigate } from "react-router-dom";  
import DatePicker from "react-datepicker";  
import "react-datepicker/dist/react-datepicker.css";  
import "./ReservationForm.css";  

const ReservationForm = () => {  
  const [startDate, setStartDate] = useState(new Date());  
  const [endDate, setEndDate] = useState(new Date());  
  const navigate = useNavigate();  

  const handleSubmit = (e) => {  
    e.preventDefault();  
    if (endDate <= startDate) {  
      alert("End date must be after start date!");  
      return;  
    }  
    navigate("/cars"); // Redirect to car selection  
  };  

  return (  
    <form className="reservation-form" onSubmit={handleSubmit}>  
      <div className="form-group">  
        <label>Pickup Location</label>  
        <input type="text" placeholder="City, Airport, or Address" />  
      </div>  
      <div className="form-group">  
        <label>Dates</label>  
        <div className="date-picker">  
          <DatePicker  
            selected={startDate}  
            onChange={(date) => setStartDate(date)}  
            selectsStart  
            startDate={startDate}  
            endDate={endDate}  
            placeholderText="Start Date"  
          />  
          <DatePicker  
            selected={endDate}  
            onChange={(date) => setEndDate(date)}  
            selectsEnd  
            startDate={startDate}  
            endDate={endDate}  
            minDate={startDate}  
            placeholderText="End Date"  
          />  
        </div>  
      </div>  
      <button type="submit" className="show-cars-btn">  
        Show Available Cars  
      </button>  
    </form>  
  );  
};  

export default ReservationForm;  