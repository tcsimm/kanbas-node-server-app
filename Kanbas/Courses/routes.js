import Database from "../Database/index.js";
export default function CourseRoutes(app) {
  app.post("/api/courses", (req, res) => {
    const course = { ...req.body, _id: new Date().getTime().toString() };
    Database.courses.push(course);
    res.send(course);
  });

  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.send(courses);
  });

  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const courseIndex = Database.courses.findIndex((course) => course._id === id);
    if (courseIndex === -1) {
      res.status(404).json({ message: `Unable to delete course with ID ${id}` });
      return;
    }
    Database.courses.splice(courseIndex, 1);
    res.sendStatus(200);
  });

  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const courseIndex = Database.courses.findIndex((course) => course._id === id);
    if (courseIndex === -1) {
      res.status(404).json({ message: `Unable to update course with ID ${id}` });
      return;
    }
    Database.courses[courseIndex] = { ...Database.courses[courseIndex], ...req.body };
    res.sendStatus(200);
  });
}
