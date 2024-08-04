import express from "express";
import cors from "cors";
import Lab5 from "./Lab5/index.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3000', // local development
    'https://your-netlify-site.netlify.app' // replace with your actual Netlify URL
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
