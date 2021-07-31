const db = require("../models");
const Persona= db.persona;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  const persona = {
    nombre: req.body.nombre,
    apellido_paterno: req.body.apellido_paterno,
    apellido_materno: req.body.apellido_materno
  };


  Persona.create(persona) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al registrar persona."
      });
    });
};


  exports.findAll = (req, res) => {

    Persona.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al retirar personas."
        });
      });
  };


  exports.update = (req, res) => {
    const id = req.params.id;

    Persona.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "persona fue actualizado satisfactoriamente."
          });
        } else {
          res.send({
            message: `error al actualizar persona con id=${id}. tal vez persona no fue encontrado  o req.body esta vacío!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "error al acutalizar persona con id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;

    Persona.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "persona fue eliminado satisfactoriamente!"
          });
        } else {
          res.send({
            message: `no se pudo eliminar persona con id=${id}. tal vez esta persona no fue encontrado!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "no se pudo borrar persona con id=" + id
        });
      });
  };
