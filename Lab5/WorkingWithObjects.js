const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  };
  
  const moduleObject = {
    id: "1",
    name: "Module 1",
    description: "Introduction to NodeJS",
    course: "CS5610",
  };
  
  export default function WorkingWithObjects(app) {
    app.get("/lab5/assignment", (req, res) => {
      res.json(assignment);
    });
  
    app.get("/lab5/assignment/title", (req, res) => {
      res.json(assignment.title);
    });
  
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
      const { newTitle } = req.params;
      assignment.title = newTitle;
      res.json(assignment);
    });
  
    // Module routes
    app.get("/lab5/module", (req, res) => {
      res.json(moduleObject);
    });
  
    app.get("/lab5/module/name", (req, res) => {
      res.json(moduleObject.name);
    });
  
    app.get("/lab5/module/name/:newName", (req, res) => {
      const { newName } = req.params;
      moduleObject.name = newName;
      res.json(moduleObject);
    });
  
    app.get("/lab5/module/description/:newDescription", (req, res) => {
      const { newDescription } = req.params;
      moduleObject.description = newDescription;
      res.json(moduleObject);
    });
  
    // Assignment properties modification
    app.get("/lab5/assignment/score/:newScore", (req, res) => {
      const { newScore } = req.params;
      assignment.score = parseInt(newScore);
      res.json(assignment);
    });
  
    app.get("/lab5/assignment/completed/:status", (req, res) => {
      const { status } = req.params;
      assignment.completed = status === "true";
      res.json(assignment);
    });
  }
  