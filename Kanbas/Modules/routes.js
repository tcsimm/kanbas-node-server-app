import ModuleModel from "./model.js";  

export default function ModuleRoutes(app) {
  
  app.get("/api/modules", async (req, res) => {
    try {
      const modules = await ModuleModel.find(); 
      res.json(modules);
    } catch (error) {
      console.error("Error fetching modules:", error.message);
      res.status(500).send({ error: "Error fetching modules." });
    }
  });

  app.get("/api/courses/:cid/modules", async (req, res) => {
    try {
      const { cid } = req.params;
      const modules = await ModuleModel.find({ course: cid });
      if (!modules.length) {
        return res.status(404).send({ error: "No modules found for this course." });
      }
      res.json(modules);
    } catch (error) {
      console.error("Error fetching modules for course:", error.message);
      res.status(500).send({ error: "Error fetching modules for course." });
    }
  });

  app.post("/api/courses/:cid/modules", async (req, res) => {
    try {
      const { cid } = req.params;
      const newModule = new ModuleModel({
        ...req.body,
        course: cid,
        _id: new Date().getTime().toString(),
      });
      const savedModule = await newModule.save();
      res.json(savedModule);
    } catch (error) {
      console.error("Error creating module:", error.message);
      res.status(500).send("Error creating module.");
    }
  });
  
  app.delete("/api/modules/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await ModuleModel.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).send({ error: "Module not found." });
      }
      res.sendStatus(204);  
    } catch (error) {
      console.error("Error deleting module:", error.message);
      res.status(500).send({ error: "Error deleting module." });
    }
  });

  app.put("/api/modules/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedModule = await ModuleModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedModule) {
        return res.status(404).send({ error: "Module not found." });
      }
      res.json(updatedModule);
    } catch (error) {
      console.error("Error updating module:", error.message);
      res.status(500).send({ error: "Error updating module." });
    }
  });
}
