import express from "express";
import Lab5 from "./Lab5/index.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // Ensure this line is here

CourseRoutes(app);
Lab5(app);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
