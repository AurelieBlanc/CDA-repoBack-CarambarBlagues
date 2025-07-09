// Imports des modules nécessaires : --------------------------------------- //
const express = require("express");  
const router = require ("./app/router"); 
const dotenv = require("dotenv"); // pour lire les variables d'environnement du fichier .env et pouvoir les utiliser dans le code 
const cors = require("cors"); // pour autoruiser toutes les origines en developpement
const morgan = require("morgan"); // Pour logguer les requêtes dans le terminal
const sequelize = require ("./app/db"); // on appelle l'instance sequelize 




// Chargement des variables d'environnement depuis le fichie .env :
dotenv.config() 


// On charge le port de notre .env grâce à dotenv : 
const PORT = process.env.PORT; 


// Initialisation de l'application Express : 
const app = express(); 


// Pour autoriser toutes les origines (domaines) des requests, à restreindre en prod :
app.use(cors("*")) 


// Pour parser le JSON des requêtes POST : 
app.use(express.json()) 



// Midlleware de logging des requêtes HTTP : 
app.use(morgan("dev")); 


// Test : 
app.get("/", (req, res) => {
  res.send("Bienvenue sur mon API de blagues !");
});


// Déclaration  des routes : 
app.use(router);




// Connexion à la base de données : 
sequelize.authenticate()
.then(() => console.log("Connexion DB réussie"))
.catch(err => console.error("Connexion DB échouée : ", err)); 



// Synchronisation des modèles avec la base et démarrage du serveur : 
sequelize.sync()
.then(() => {
    console.log("Base de données synchronisée"); 
    app.listen (PORT, () => {
    console.log(`Listening on port ${PORT}, serveur démarré sur http://localhost:${PORT}`)
    }); 
}).catch(err => console.error("Erreur lors de la synchronisation DB: ", err)); 







