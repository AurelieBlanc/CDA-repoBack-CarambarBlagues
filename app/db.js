// Import des modules nécéssaires : --------------------------------------- //
const { Sequelize } = require ("sequelize"); 



// Initialisation de Sequelize avec SQLite : ------------------------------ //
const sequelize = new Sequelize ({
    dialect: "sqlite", 
    storage: "./database.sqlite", 
    logging: false
}); 
  


// Export de l'instance Sequelize : --------------------------------------- //
module.exports = sequelize; 