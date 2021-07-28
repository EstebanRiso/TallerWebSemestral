module.exports = (sequelize, Sequelize) => {
  
  

  const libro = sequelize.define("libro", {
    
    autor: {
      type: Sequelize.STRING
    },
    titulo: {
      type: Sequelize.STRING
    },
    anio: {
      type: Sequelize.INTEGER
    }
  });

  return libro;
};
