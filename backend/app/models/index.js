const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.libro = require("./libro.model.js")(sequelize, Sequelize);
db.persona = require("./persona.model.js")(sequelize, Sequelize);
db.prestamo = require("./prestamo.model.js")(sequelize, Sequelize);

const Prestamo= db.prestamo;
const Libro= db.libro;
const Persona= db.persona;

Libro.hasMany(Prestamo); // Prestamo tiene la id foranea de Libro
Persona.hasMany(Prestamo); // Prestamo tiene la id foranea de Persona


module.exports = db;
