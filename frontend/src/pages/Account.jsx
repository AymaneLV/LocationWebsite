import React, { useState, useEffect, useContext } from "react";  
import { useNavigate } from "react-router-dom";  
import { AuthContext } from "../context/AuthContext";  
import "./Account.css";  

const Account = () => {  
  const { user, logout } = useContext(AuthContext);  
  const [formData, setFormData] = useState({  
    name: user?.name || "",  
    email: user?.email || "",  
  });  
  const [reservations, setReservations] = useState([]);  
  const navigate = useNavigate();  

  // Fetch reservations  
  useEffect(() => {  
    const fetchReservations = async () => {  
      try {  
        const res = await fetch("/api/reservations");  
        const data = await res.json();  
        setReservations(data);  
      } catch (err) {  
        console.error(err);  
      }  
    };  
    fetchReservations();  
  }, []);  

  // Update profile  
  const handleUpdate = async (e) => {  
    e.preventDefault();  
    try {  
      await fetch("/api/auth/update", {  
        method: "PUT",  
        headers: {  
          "Content-Type": "application/json",  
          Authorization: `Bearer ${localStorage.getItem("token")}`,  
        },  
        body: JSON.stringify(formData),  
      });  
      alert("Profile updated successfully!");  
    } catch (err) {  
      alert("Update failed");  
    }  
  };  

  return (  
    <div className="account-page">  
      <h2>My Account</h2>  
      <div className="profile-section">  
        <h3>Personal Information</h3>  
        <form onSubmit={handleUpdate} className="profile-form">  
          <input  
            type="text"  
            placeholder="Name"  
            value={formData.name}  
            onChange={(e) =>  
              setFormData({ ...formData, name: e.target.value })  
            }  
          />  
          <input  
            type="email"  
            placeholder="Email"  
            value={formData.email}  
            onChange={(e) =>  
              setFormData({ ...formData, email: e.target.value })  
            }  
          />  
          <button type="submit" className="save-btn">  
            Save Changes  
          </button>  
        </form>  
        <button onClick={logout} className="logout-btn">  
          Logout  
        </button>  
      </div>  
      <div className="reservations-section">  
        <h3>My Reservations</h3>  
        {reservations.map((res) => (  
          <div key={res._id} className="reservation-card">  
            <p>  
              {res.car.name} | {new Date(res.startDate).toLocaleDateString()}  
              {" - "}  
              {new Date(res.endDate).toLocaleDateString()}  
            </p>  
            <button  
              className="cancel-btn"  
              onClick={async () => {  
                await fetch(`/api/reservations/${res._id}/cancel`, {  
                  method: "PUT",  
                  headers: {  
                    Authorization: `Bearer ${localStorage.getItem("token")}`,  
                  },  
                });  
                setReservations(reservations.filter((r) => r._id !== res._id));  
              }}  
            >  
              Cancel  
            </button>  
          </div>  
        ))}  
      </div>  
    </div>  
  );  
};  

export default Account;  