const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const { protect } = require("../middleware/authMiddleware");
const { check } = require('express-validator');
const validate = require("../middleware/validate");

// Validate MongoDB ID parameter
const validateId = check('id').isMongoId().withMessage('Invalid ID format');

/**
 * @route   POST /api/reservations
 * @desc    Create new reservation
 * @access  Private
 */
router.post("/",
  protect,
  [
    check('carId').isMongoId().withMessage('Invalid car ID'),
    check('startDate')
      .isISO8601().withMessage('Invalid date format')
      .toDate()
      .custom(value => value > new Date()).withMessage('Start date must be in the future'),
    check('endDate')
      .isISO8601().withMessage('Invalid date format')
      .toDate()
      .custom((value, { req }) => value > new Date(req.body.startDate)).withMessage('End date must be after start date'),
    check('pickupLocation').trim().notEmpty().withMessage('Pickup location is required'),
    check('dropoffLocation').trim().notEmpty().withMessage('Dropoff location is required')
  ],
  validate,
  reservationController.createReservation
);

/**
 * @route   GET /api/reservations
 * @desc    Get current user's reservations
 * @access  Private
 */
router.get("/",
  protect,
  [
    check('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    check('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1-100')
  ],
  validate,
  reservationController.getMyReservations
);

/**
 * @route   PUT /api/reservations/:id/cancel
 * @desc    Cancel a reservation
 * @access  Private
 */
router.put("/:id/cancel",
  protect,
  [
    validateId,
    check('cancellationReason').trim().notEmpty().withMessage('Cancellation reason is required')
  ],
  validate,
  reservationController.cancelReservation
);

module.exports = router;