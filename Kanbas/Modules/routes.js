import db from "../Database/index.js";

export default function ModuleRoutes(app) {
  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    console.log(`Fetching modules for course ID: ${cid}`); // Log for debugging
    const modules = db.modules.filter((m) => m.course === cid);
    console.log(`Modules found: ${JSON.stringify(modules)}`); // Log for debugging
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

  app.delete("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    db.modules = db.modules.filter((m) => m._id !== mid);
    res.sendStatus(200);
  });

  app.put("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    const moduleIndex = db.modules.findIndex((m) => m._id === mid);
    if (moduleIndex === -1) {
      return res.status(404).send("Module not found.");
    }
    db.modules[moduleIndex] = { ...db.modules[moduleIndex], ...req.body };
    res.sendStatus(200);
  });
}
