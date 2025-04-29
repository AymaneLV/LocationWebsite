const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController"); // Ensure the path is correct
const { protect, admin } = require("../middleware/authMiddleware");
const { check } = require("express-validator");
const validate = require("../middleware/validate");

// Validation Middleware
const validateCarId = check("id").isMongoId().withMessage("Invalid car ID");

// @route   POST /api/cars
// @desc    Create a new car (Admin only)
// @access  Private (Admin)
router.post(
  "/",
  protect,
  admin,
  [
    check("name", "Name is required").notEmpty(),
    check("model", "Model is required").notEmpty(),
    check("year", "Year must be a number").isInt(),
    check("pricePerDay", "Price per day must be a number").isFloat({ min: 0 }),
    check("location", "Location is required").notEmpty(),
  ],
  validate,
  carController.createCar // Ensure this method is defined in your carController
);

// @route   GET /api/cars
// @desc    Get all cars
// @access  Public
router.get("/", carController.getAllCars);

// @route   GET /api/cars/:id
// @desc    Get car details by ID
// @access  Public
router.get("/:id", validateCarId, validate, carController.getCarById);

// @route   PUT /api/cars/:id
// @desc    Update car details (Admin only)
// @access  Private (Admin)
router.put(
  "/:id",
  protect,
  admin,
  [
    validateCarId,
    check("name", "Name is required").optional(),
    check("model", "Model is required").optional(),
    check("year", "Year must be a number").optional().isInt(),
    check("pricePerDay", "Price per day must be a number")
      .optional()
      .isFloat({ min: 0 }),
    check("location", "Location is required").optional(),
  ],
  validate,
  carController.updateCar
);

// @route   DELETE /api/cars/:id
// @desc    Delete a car (Admin only)
// @access  Private (Admin)
router.delete("/:id", protect, admin, validateCarId, validate, carController.deleteCar);

module.exports = router;
