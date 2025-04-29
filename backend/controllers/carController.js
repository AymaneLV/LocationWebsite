const Car = require("../models/Car");

// Create a new car
exports.createCar = async (req, res) => {
  try {
    const { name, model, year, pricePerDay, location } = req.body;
    // Input validation (optional)
    if (!name || !model || !year || !pricePerDay || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const car = await Car.create({
      name,
      model,
      year,
      pricePerDay,
      location,
    });
    res.status(201).json(car);
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(400).json({ error: "Failed to create car" });
  }
};

// Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error("Error getting all cars:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    console.error("Error getting car by ID:", error);
    res.status(400).json({ error: "Invalid car ID or failed to fetch car" });
  }
};

// Update car details
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(400).json({ error: "Failed to update car" });
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(400).json({ error: "Failed to delete car" });
  }
};
