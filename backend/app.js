const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const logger = require("./utils/logger");
require("dotenv").config();

// Route imports
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const jobRoutes = require("./routes/jobRoutes");

const app = express();

// Connect to DB
connectDB();

// Middleware setup
app.use(morgan("dev")); // Logging middleware
app.use(helmet()); // Security headers
const allowedOrigins = ['https://job-portal-delta-neon.vercel.app', 'https://job-portal-78fa6woho-shady-josephs-projects.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(bodyParser.json({ limit: "5mb" })); // Body parser for JSON
app.use(bodyParser.urlencoded({ extended: true })); // Body parser for URL-encoded data
app.use(cookieParser()); // Cookie parser

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// Welcome Route
app.get('/', (req, res) => {
  res.send('Welcome to the Job Portal API!');
});

// Routes with `/api` prefix
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
