module.exports = (sequelize, Sequelize) => {
    const prestamo= sequelize.define("prestamo", {
  
      id_persona_personas: {
        type: Sequelize.INTEGER,
        references: {
           model: 'personas', 
           key: 'id', 
        }
      },
      id_libro_libros: {
        type: Sequelize.INTEGER,
        references: {
           model: 'libros', 
           key: 'id', 
        }
      },
      fecha: {
        type: Sequelize.DATE
      },
    },
    {freezeTableName: true});

    return prestamo;
  };