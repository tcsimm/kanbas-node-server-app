import express from "express";
import cors from "cors";
import Lab5 from "./Lab5/index.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";

const app = express();
app.use(cors());
app.use(express.json()); 
CourseRoutes(app);
ModuleRoutes(app);
Lab5(app);
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
