const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { protect, restrictTo } = require("../middleware/authMiddleware");
const { check } = require('express-validator');
const validate = require("../middleware/validate");

// Reusable validators
const validateCarId = check('carId').isMongoId().withMessage('Invalid car ID');
const validateReviewId = check('id').isMongoId().withMessage('Invalid review ID');

/**
 * @route   POST /api/reviews/:carId
 * @desc    Create new review for a car
 * @access  Private
 */
router.post("/:carId",
  protect,
  [
    validateCarId,
    check('rating')
      .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1-5'),
    check('comment')
      .trim()
      .isLength({ min: 10 }).withMessage('Comment must be at least 10 characters')
      .escape(),
    check('title')
      .trim()
      .isLength({ min: 5, max: 50 }).withMessage('Title must be 5-50 characters')
      .escape()
  ],
  validate,
  reviewController.createReview
);

/**
 * @route   GET /api/reviews/:carId
 * @desc    Get all reviews for a car
 * @access  Public
 */
router.get("/:carId",
  [
    validateCarId,
    check('sort').optional().isIn(['newest', 'highest', 'lowest']).withMessage('Invalid sort parameter'),
    check('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    check('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1-50')
  ],
  validate,
  reviewController.getCarReviews
);

/**
 * @route   DELETE /api/reviews/:id
 * @desc    Delete a review (admin or author only)
 * @access  Private
 */
router.delete("/:id",
  protect,
  restrictTo('admin', 'user'),
  [
    validateReviewId
  ],
  validate,
  reviewController.deleteReview
);

module.exports = router;