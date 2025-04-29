import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import { AuthProvider } from "./context/AuthContext";  
import { ThemeProvider } from "./context/ThemeContext";  
import Navbar from "./components/Navbar/Navbar";  
import Footer from "./components/Footer/Footer";  
import Home from "./pages/Home";  
import CarSelection from "./pages/CarSelection";  
import Login from "./pages/Login";  
import Register from "./pages/Register";  
import Account from "./pages/Account";  
import Payment from "./pages/Payment"; 
import AboutUs from "./pages/AboutUs"; 
import ContactUs from "./pages/ContactUs";

function App() {  
  return (  
    <Router>  
      <ThemeProvider>  
        <AuthProvider>  
          <Navbar />  
          <Routes>  
            <Route path="/" element={<Home />} />  
            <Route path="/cars" element={<CarSelection />} />  
            <Route path="/login" element={<Login />} />  
            <Route path="/register" element={<Register />} />  
            <Route path="/account" element={<Account />} />  
            <Route path="/payment" element={<Payment />} /> 
            <Route path="/about" element={<AboutUs />} /> 
            <Route path="/contact" element={<ContactUs />} />
            {/* Add admin routes later */}  
          </Routes>  
          <Footer />  
        </AuthProvider>  
      </ThemeProvider>  
    </Router>  
  );  
}  

export default App;  