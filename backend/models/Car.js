const mongoose = require("mongoose");  

const carSchema = new mongoose.Schema({  
  name: { type: String, required: true },  
  pricePerDay: { type: Number, required: true },  
  pricePerMonth: { type: Number, required: true },  
  info: { type: String, required: true },  
  image: { type: String, required: true }, // URL to car image  
  availability: { type: Boolean, default: true },  
});  

module.exports = mongoose.model("Car", carSchema);  