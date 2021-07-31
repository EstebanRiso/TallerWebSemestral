module.exports = (sequelize, Sequelize) => {
    const persona = sequelize.define("persona", {
      nombre: {
        type: Sequelize.STRING
      },
      apellido_paterno: {
        type: Sequelize.STRING
      },
      apellido_materno: {
        type: Sequelize.STRING
      }
    });
  
    return persona;
  };
  