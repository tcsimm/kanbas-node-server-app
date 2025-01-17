import db from "../Database/index.js";

export default function ModuleRoutes(app) {
  app.get("/api/modules", (req, res) => {
    res.json(db.modules);
  });

  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const modules = db.modules.filter((m) => m.course === cid);
    res.json(modules);
  });

  app.post("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const newModule = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.modules.push(newModule);
    res.send(newModule);
  });

  app.delete("/api/modules/:id", (req, res) => {
    const { id } = req.params;
    db.modules = db.modules.filter((m) => m._id !== id);
    res.sendStatus(200);
  });

  app.put("/api/modules/:id", (req, res) => {
    const { id } = req.params;
    const moduleIndex = db.modules.findIndex((m) => m._id === id);
    if (moduleIndex === -1) {
      return res.status(404).send("Module not found.");
    }
    db.modules[moduleIndex] = { ...db.modules[moduleIndex], ...req.body };
    res.send(db.modules[moduleIndex]); // Send the updated module back
  });
}
