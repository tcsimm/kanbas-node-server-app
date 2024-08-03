import express from "express";
import cors from "cors";
import Lab5 from "./Lab5/index.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";

const corsOptions = {
  origin: 'http://localhost:3000', 
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
