module.exports = app => {
    
    const prestamo= require("../controllers/prestamo.controller");
    var router = require("express").Router();
   
    router.post("/", prestamo.create);
    router.get("/", prestamo.ConsultaTodos);
    router.get("/:id", prestamo.ConsultaPersona);

  };
  