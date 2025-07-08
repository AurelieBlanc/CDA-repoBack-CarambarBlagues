// Import des modules nécessaires  : --------------------------------- //
const { DataTypes, Model } = require ("sequelize"); 
const sequelize = require('../db'); 



// Définition de la classe Blague : ---------------------------------- //
class Blague extends Model {} 



// Initialisation du modèle Blague : --------------------------------- //
Blague.init({
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    }, 
    question: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    answer: {
        type: DataTypes.STRING, 
        allowNull: false
    }
    }, {
        sequelize,  // ce modèle Blague utilise l'instance sequelize définie dans db.js
        tableName: "blagues", 
        timestamps: false
    }); 



// Export du modèle Blague : ----------------------------------------- //
    module.exports = Blague; 
