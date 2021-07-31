const db = require("../models");
const Prestamo = db.prestamo;
const Persona = db.persona;
const Libro = db.libro;
const Op = db.Sequelize.Op;



exports.create=(req,res)=>{

    const prestamo = {
        id_persona_personas: req.body.id_persona_personas,
        id_libro_libros: req.body.id_libro_libros,
        fecha: req.body.fecha
      };

    Prestamo.create(prestamo)
    .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al Registrar Prestamo."
        });
      });

}

exports.ConsultaTodos=(req,res)=>
{

    try{
        Prestamo.findAll(
        {
        include: [{
          model: Persona,
          attributes: ['nombre','apellido_paterno','apellido_materno']
    
        },
        {
          model: Libro,
          attributes: ['autor','titulo','anio']
        }
      ]
      }
      ).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Prestamo."
        });
      });;
  
  
    }catch(error)
    {
      res.status(500).send(error)
    }
  
   
}


exports.ConsultaPersona=(req,res)=>
{

    const id= req.params.id;

    try{
        Prestamo.findAll({
          
        where:{id_persona_personas:id},
        include: [{
          model: Persona,
          attributes: ['nombre','apellido_paterno','apellido_materno'],
        },
        {
          model: Libro,
          attributes: ['autor','libro','anio']
        }
      ]
      }
      ).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Prestamos."
        });
      });;
  
  
    }catch(error)
    {
      res.status(500).send(error)
    }
  
   
}