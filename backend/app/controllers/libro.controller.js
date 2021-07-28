const db = require("../models");
const Libro = db.libro;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {



  const libro = {
    autor: req.body.autor,
    titulo: req.body.titulo,
    anio : req.body.anio
  };


  Libro.create(libro) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al registrar libro."
      });
    });
};


  exports.findAll = (req, res) => {

    Libro.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al retirar libros."
        });
      });
  };


  exports.update = (req, res) => {
    const id = req.params.id;

    Libro.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "libro fue actualizado satisfactoriamente."
          });
        } else {
          res.send({
            message: `error al actualizar libro con id=${id}. tal vez libro no fue encontrado  o req.body esta vacío!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "error al acutalizar libro con id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;

    Libro.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "libro fue eliminado satisfactoriamente!"
          });
        } else {
          res.send({
            message: `no se pudo eliminar libro con id=${id}. tal vez libro no fue encontrado!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "no se pudo borrar libro con id=" + id
        });
      });
  };
