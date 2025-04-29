const bcrypt = require("bcryptjs");  
const jwt = require("jsonwebtoken");  
const User = require("../models/User");  

// Register a new user  
exports.register = async (req, res) => {  
  try {  
    const { name, email, password, phoneNumber, driverLicense } = req.body;  

    // Check if user exists  
    const userExists = await User.findOne({ email });  
    if (userExists) {  
      return res.status(400).json({  
        success: false,  
        error: "Email already in use",  
      });  
    }  

    // Create user  
    const user = await User.create({  
      name,  
      email,  
      password,  
      phoneNumber,  
      driverLicense,  
    });  

    // Generate token  
    const token = jwt.sign(  
      { id: user._id, role: user.role },  
      process.env.JWT_SECRET,  
      { expiresIn: process.env.JWT_EXPIRE || "30d" }  
    );  

    // Remove sensitive data  
    user.password = undefined;  

    res.status(201).json({  
      success: true,  
      token,  
      user,  
    });  
  } catch (error) {  
    console.error(error);  
    res.status(500).json({  
      success: false,  
      error: "Registration failed. Please try again.",  
    });  
  }  
};  

// Login user  
exports.login = async (req, res) => {  
  try {  
    const { email, password } = req.body;  

    // Validate input  
    if (!email || !password) {  
      return res.status(400).json({  
        success: false,  
        error: "Please provide email and password",  
      });  
    }  

    // Find user and compare password  
    const user = await User.findOne({ email }).select("+password");  
    if (!user || !(await user.comparePassword(password))) {  
      return res.status(401).json({  
        success: false,  
        error: "Invalid credentials",  
      });  
    }  

    // Generate token  
    const token = jwt.sign(  
      { id: user._id, role: user.role },  
      process.env.JWT_SECRET,  
      { expiresIn: process.env.JWT_EXPIRE || "30d" }  
    );  

    // Remove sensitive data  
    user.password = undefined;  

    res.status(200).json({  
      success: true,  
      token,  
      user,  
    });  
  } catch (error) {  
    console.error(error);  
    res.status(500).json({  
      success: false,  
      error: "Login failed. Please try again.",  
    });  
  }  
};  

// Get current user  
exports.getMe = async (req, res) => {  
  try {  
    const user = await User.findById(req.user.id);  
    res.status(200).json({  
      success: true,  
      data: user,  
    });  
  } catch (error) {  
    console.error(error);  
    res.status(500).json({  
      success: false,  
      error: "Server error",  
    });  
  }  
};  

// Logout user (added)  
exports.logout = async (req, res) => {  
  try {  
    res.status(200).json({  
      success: true,  
      message: "Logged out successfully",  
    });  
  } catch (error) {  
    res.status(500).json({  
      success: false,  
      error: "Logout failed",  
    });  
  }  
};  