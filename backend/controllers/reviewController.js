const Review = require("../models/Review");
const Car = require("../models/Car");

// Create a review  
exports.createReview = async (req, res) => {
  try {
    const { rating, comment, title } = req.body;
    
    const review = await Review.create({
      user: req.user._id,
      car: req.params.carId,
      rating,
      comment,
      title
    });

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Review submission failed"
    });
  }
};

// Get all reviews for a car
exports.getCarReviews = async (req, res) => {
  try {
    // Build query
    let query = Review.find({ car: req.params.carId })
      .populate("user", "name");

    // Sorting
    if (req.query.sort === 'highest') {
      query = query.sort('-rating');
    } else if (req.query.sort === 'lowest') {
      query = query.sort('rating');
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await query.skip(skip).limit(limit);
    const total = await Review.countDocuments({ car: req.params.carId });

    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      pages: Math.ceil(total / limit),
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        error: "Review not found"
      });
    }

    // Check if user is admin OR the review author
    if (req.user.role !== 'admin' && req.user._id.toString() !== review.user.toString()) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to delete this review"
      });
    }

    await review.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Deletion failed"
    });
  }
};