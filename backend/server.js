const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { errorHandler } = require("./utils/errorHandler");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const morgan = require("morgan");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();

connectDB();

// Middleware setup
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(xss());
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use(limiter);

const carRoutes = require('./routes/carRoutes');

app.use('/api/cars', carRoutes);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cars", require("./routes/carRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

// Serve React in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"))
  );
}

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
);