import Database from "../Database/index.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    try {
      const courses = Database.courses;
      res.send(courses);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
      res.status(500).send("Error fetching courses.");
    }
  });

  app.post("/api/courses", (req, res) => {
    try {
      const course = { ...req.body, _id: new Date().getTime().toString() };
      Database.courses.push(course);
      res.send(course);
    } catch (error) {
      console.error("Error creating course:", error.message);
      res.status(500).send("Error creating course.");
    }
  });

  app.delete("/api/courses/:id", (req, res) => {
    try {
      const { id } = req.params;
      const courseIndex = Database.courses.findIndex((course) => course._id === id);
      if (courseIndex === -1) {
        res.status(404).json({ message: `Unable to delete course with ID ${id}` });
        return;
      }
      Database.courses.splice(courseIndex, 1);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error deleting course:", error.message);
      res.status(500).send("Error deleting course.");
    }
  });

  app.put("/api/courses/:id", (req, res) => {
    try {
      const { id } = req.params;
      const courseIndex = Database.courses.findIndex((course) => course._id === id);
      if (courseIndex === -1) {
        res.status(404).json({ message: `Unable to update course with ID ${id}` });
        return;
      }
      Database.courses[courseIndex] = { ...Database.courses[courseIndex], ...req.body };
      res.sendStatus(200);
    } catch (error) {
      console.error("Error updating course:", error.message);
      res.status(500).send("Error updating course.");
    }
  });
}
