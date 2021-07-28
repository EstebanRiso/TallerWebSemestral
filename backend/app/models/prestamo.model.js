module.exports = (sequelize, Sequelize) => {
    const prestamo= sequelize.define("prestamo", {
  
      id_persona_personas: {
        type: Sequelize.INTEGER,
        references: {
           model: 'personas', // 'autos' refers to table name
           key: 'id', // 'id' refers to column name in marca table
        }
      },
      id_libro_libros: {
        type: Sequelize.INTEGER,
        references: {
           model: 'libros', // 'autos' refers to table name
           key: 'id', // 'id' refers to column name in marca table
        }
      },
      fecha: {
        type: Sequelize.DATE
      },
    },
    {freezeTableName: true});

    return prestamo;
  };