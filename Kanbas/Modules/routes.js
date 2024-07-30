import db from "../Database/index.js";

export default function ModuleRoutes(app) {
  app.get("/api/courses/:cid/modules", (req, res) => {
    try {
      const { cid } = req.params;
      const modules = db.modules.filter((m) => m.course === cid);
      res.json(modules);
    } catch (error) {
      console.error("Error fetching modules:", error.message);
      res.status(500).send("Error fetching modules.");
    }
  });

  app.post("/api/courses/:cid/modules", (req, res) => {
    try {
      const { cid } = req.params;
      const module = { ...req.body, _id: new Date().getTime().toString(), course: cid };
      db.modules.push(module);
      res.status(201).json(module);
    } catch (error) {
      console.error("Error creating module:", error.message);
      res.status(500).send("Error creating module.");
    }
  });

  app.delete("/api/modules/:id", (req, res) => {
    try {
      const { id } = req.params;
      db.modules = db.modules.filter((m) => m._id !== id);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting module:", error.message);
      res.status(500).send("Error deleting module.");
    }
  });

  app.put("/api/modules/:id", (req, res) => {
    try {
      const { id } = req.params;
      const moduleIndex = db.modules.findIndex((m) => m._id === id);
      if (moduleIndex === -1) {
        return res.status(404).send("Module not found.");
      }
      db.modules[moduleIndex] = { ...db.modules[moduleIndex], ...req.body };
      res.sendStatus(200);
    } catch (error) {
      console.error("Error updating module:", error.message);
      res.status(500).send("Error updating module.");
    }
  });
}
