// Import des modules nécessaires : -------------------------------------- //
const express = require("express"); 
const BlagueController = require("./controllers/blagueController"); 

const router = express.Router(); 




// Routes : --------------------------------------------------------------- //

// Route pour récupérer toutes les blagues : 
router.get("/api/v1/jokes", BlagueController.getAllJokes ); 

// Route pour récupérer une seule blague par ID : 
router.get("/api/v1/jokes/:id", BlagueController.getOneJoke);

// Route pour créer une nouvelle blague :
router.post("/api/v1/jokes", BlagueController.createNewJoke);






module.exports = router; 