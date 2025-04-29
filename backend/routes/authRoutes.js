const express = require("express");  
const router = express.Router();  
const authController = require("../controllers/authController");  
const { protect } = require("../middleware/authMiddleware");  
const { check } = require("express-validator");  
const validate = require("../middleware/validate"); // Import validation middleware  

// Register Route  
router.post(  
  "/register",  
  [  
    check("name", "Name is required").notEmpty(),  
    check("email", "Please include a valid email").isEmail(),  
    check("password", "Password must be 6+ characters").isLength({ min: 6 }),  
    check("confirmPassword", "Passwords must match").custom(  
      (value, { req }) => value === req.body.password  
    ),  
  ],  
  validate, // Apply validation middleware  
  authController.register  
);  

// Login Route  
router.post(  
  "/login",  
  [  
    check("email", "Please include a valid email").isEmail(),  
    check("password", "Password is required").notEmpty(),  
  ],  
  validate, // Apply validation middleware  
  authController.login  
);  

// Get Current User (Protected Route)  
router.get("/me", protect, authController.getMe);  

// Logout Route  
router.post("/logout", protect, authController.logout);  

module.exports = router;  