import express from "express";
import * as courseDao from "./dao.js"; 

export default function CourseRoutes(app) {
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await courseDao.findAllCourses(); 
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
      res.status(500).send("Error fetching courses.");
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const course = { ...req.body, _id: req.body._id || new Date().getTime().toString() };
      const newCourse = await courseDao.createCourse(course); 
      res.json(newCourse);
    } catch (error) {
      console.error("Error creating course:", error.message);
      res.status(500).send("Error creating course.");
    }
  });

  app.delete("/api/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await courseDao.deleteCourse(id); 
      if (result.deletedCount === 0) {
        res.status(404).json({ message: `Unable to delete course with ID ${id}` });
        return;
      }
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting course:", error.message);
      res.status(500).send("Error deleting course.");
    }
  });

  app.put("/api/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await courseDao.updateCourse(id, req.body); 
      if (result.nModified === 0) {
        res.status(404).json({ message: `Unable to update course with ID ${id}` });
        return;
      }
      res.sendStatus(204);
    } catch (error) {
      console.error("Error updating course:", error.message);
      res.status(500).send("Error updating course.");
    }
  });
}
