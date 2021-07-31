module.exports = app => {
    const persona = require("../controllers/persona.controller");
  
    var router = require("express").Router();
  
    // Create a new libro
    router.post("/", persona.create);
    
    router.get("/", persona.findAll);
    router.delete("/:id",persona.delete)
   
    router.put("/:id", persona.update);
    app.use("/api/persona", router);
  };