/*module.exports = app => {
    
    const prestamo= require("../controllers/prestamo.controller");
  
    var router = require("express").Router();
  
    // Create a new libro
    router.post("/", prestamo.create);
    
    router.get("/", prestamo.findAll);
    router.delete("/:id",prestamo.delete);
   
    router.put("/:id", prestamo.update);
    app.use("/api/prestamo", router);
  };
  */