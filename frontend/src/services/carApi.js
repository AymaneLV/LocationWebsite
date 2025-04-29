import api from "./api";  

// Fetch all cars  
export const getAllCars = async () => {  
  const res = await api.get("/cars");  
  return res.data;  
};  

// Fetch a single car by ID  
export const getCarById = async (id) => {  
  const res = await api.get(`/cars/${id}`);  
  return res.data;  
};  

// Create a new car (admin only)  
export const createCar = async (carData) => {  
  const res = await api.post("/cars", carData);  
  return res.data;  
};  

// Update a car (admin only)  
export const updateCar = async (id, updatedData) => {  
  const res = await api.put(`/cars/${id}`, updatedData);  
  return res.data;  
};  

// Delete a car (admin only)  
export const deleteCar = async (id) => {  
  const res = await api.delete(`/cars/${id}`);  
  return res.data;  
};  