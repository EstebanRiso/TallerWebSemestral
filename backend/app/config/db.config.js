module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "credecialidad08",
  DB: "BDD01",
  dialect: "postgres",
  pool: 
  {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
 

  /*HOST: "localhost",
  USER: "postgres",
  PASSWORD: "1234",
  DB: "BDD01",
  dialect: "postgres",
  pool: 
  {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
*/
};
