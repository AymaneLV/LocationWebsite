const Reservation = require("../models/Reservation");  
const Car = require("../models/Car");  

// Create a reservation  
exports.createReservation = async (req, res) => {  
  try {  
    const { carId, startDate, endDate } = req.body;  
    const car = await Car.findById(carId);  
    if (!car.availability) {  
      return res.status(400).json({ error: "Car not available" });  
    }  

    // Calculate total price  
    const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);  
    const totalPrice = days <= 30 ? days * car.pricePerDay : car.pricePerMonth;  

    const reservation = await Reservation.create({  
      user: req.user._id,  
      car: carId,  
      startDate,  
      endDate,  
      totalPrice,  
    });  

    // Update car availability if needed (optional)  
    await Car.findByIdAndUpdate(carId, { availability: false });  

    res.status(201).json(reservation);  
  } catch (error) {  
    res.status(400).json({ error: "Reservation failed" });  
  }  
};  

// Get user's reservations  
exports.getMyReservations = async (req, res) => {  
  try {  
    const reservations = await Reservation.find({ user: req.user._id }).populate(  
      "car"  
    );  
    res.json(reservations);  
  } catch (error) {  
    res.status(500).json({ error: "Server error" });  
  }  
};  

// Cancel a reservation  
exports.cancelReservation = async (req, res) => {  
  try {  
    const reservation = await Reservation.findById(req.params.id);  
    if (!reservation) {  
      return res.status(404).json({ error: "Reservation not found" });  
    }  
    reservation.status = "cancelled";  
    await reservation.save();  

    // Re-enable car availability (optional)  
    await Car.findByIdAndUpdate(reservation.car, { availability: true });  

    res.json({ message: "Reservation cancelled" });  
  } catch (error) {  
    res.status(400).json({ error: "Cancellation failed" });  
  }  
};  