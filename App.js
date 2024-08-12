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

// MongoDB connection string with updated options to avoid deprecation warnings
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Connection error', err);
});

const app = express();

const corsOptions = {
  origin: process.env.NETLIFY_URL || "http://localhost:3000", 
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

// Route handlers
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);
UserRoutes(app);

// Start the server
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
