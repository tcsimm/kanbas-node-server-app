import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import Lab5 from "./Lab5/index.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import Hello from "./Hello.js";
import UserRoutes from "./Users/routes.js";

// MongoDB connection string
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";

// Connect to MongoDB
mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Connection error', err);
  });

const app = express();

// CORS options
const corsOptions = {
  origin: process.env.NETLIFY_URL || "http://localhost:3000",
  credentials: true, 
};

// Apply CORS middleware
app.use(cors(corsOptions));

// JSON middleware
app.use(express.json());

// Session options
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "lax",  // Set to "lax" instead of "none" for development purposes
    secure: process.env.NODE_ENV === "production",  // Ensure cookies are only sent over HTTPS in production
  },
};

// Apply session middleware
app.use(session(sessionOptions));

// Routes
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);
UserRoutes(app);

// Start server
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
