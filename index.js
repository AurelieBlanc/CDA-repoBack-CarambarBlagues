// Imports des modules nécessaires : --------------------------------------- //
const express = require("express");  
const router = require ("./app/router"); 
const dotenv = require("dotenv"); // pour lire les variables d'environnement du fichier .env et pouvoir les utiliser dans le code 
const cors = require("cors"); // pour autoruiser toutes les origines en developpement
const morgan = require("morgan"); // Pour logguer les requêtes dans le terminal
const sequelize = require ("./app/db"); // on appelle l'instance sequelize 
const swaggerUi = require('swagger-ui-express'); // middleware express qui sert l'interface visuelle Swagger UI à une route
const swaggerJsdoc = require('swagger-jsdoc'); //c'est ce qui génère automatiquement le JSON openAPI à partir des commentaires dans les fichiers .js avec les @swagger au dessus des routes 
const path = require('path'); 

console.log("serveur qui démarre"); 


// Chargement des variables d'environnement depuis le fichie .env :
dotenv.config() 


// On charge le port de notre .env grâce à dotenv : 
const PORT = process.env.PORT; 


// Initialisation de l'application Express : 
const app = express(); 

// Paramètres de configuration pour Swagger : 
const options = {
  definition: {
    openapi: '3.0.0',
    info: { // apparaitre en haut de la doc Swagger dans l'interface web 
      title: 'API de mon projet',
      version: '1.0.0',
      description: 'Documentation de l’API avec Swagger',
    },
  },
  apis: [path.join(__dirname, "app", "router.js")], 
};

// ici on génère la doc Swagger au format JSON à partir des options + des commentaires trouvés dans tes fichiers routes : 
const swaggerSpec = swaggerJsdoc(options); 

// Route Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Pour autoriser toutes les origines (domaines) des requests, à restreindre en prod :
app.use(cors({
  origin: ["http://localhost:5173", "https://aurelieblanc.github.io"]
})); 

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







