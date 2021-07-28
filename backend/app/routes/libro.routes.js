module.exports = app => {
  const libro = require("../controllers/libro.controller");

  var router = require("express").Router();

  // Create a new libro
  router.post("/", libro.create);
  
  router.get("/", libro.findAll);
  router.delete("/:id",libro.delete)
 
  router.put("/:id", libro.update);
  app.use("/api/libro", router);
};
