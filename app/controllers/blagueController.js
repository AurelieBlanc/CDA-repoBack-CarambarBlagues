// Import du modèle Blague : ---------------------------------------------- //
const Blague  = require("../models/Blague"); 


// Controlleur pour interagir avec la BDD : -------------------------------- //
const blagueController = {

// Récupérer toutes les blagues : 
getAllJokes : async(req, res) => {
    try {
        const jokes = await Blague.findAll()

        console.log("fonction getAllJokes appelée via console.log")

        if(!jokes.length === 0) {
            res.status(404).json({ message: "Aucune blague n'a été trouvé"})
        } else {
            res.status(200).json(jokes)
        }

    } catch (error) {
        res.status(500).json({message: "Erreur interne du serveur : ", error})
    }
},


// Récupérer une blague par son ID : 
getOneJoke :   async(req, res) => {
    try {
        const jokeId = req.params.id; 

        console.log("fonction getOneJoke appelée via console.log")


        const jokeById = await Blague.findByPk(jokeId);

        if(!jokeById) {
            res.status(404).json({ message: "Aucune blague n'a été trouvé"})
        } else {
            res.status(200).json(jokeById)
        }

    } catch (error) {
        res.status(500).json({message: "Erreur interne du serveur : ", error})
    }
},

// récuperer une blague de manière aléatoire : 
getOneJokeRandomly : async(req, res) => {
    try {

        const jokes = await Blague.findAll(); 
        const length = jokes.length; 
        const idRandom = Math.floor(Math.random() * length)
        const jokeRandomly = jokes[idRandom]; 

        
        console.log("jokeRandomly : ", jokeRandomly)

         if(!jokeRandomly) {
            res.status(404).json({ message: "Aucune blague n'a été trouvé"})
        } else {
            res.status(200).json(jokeRandomly)
        }


    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur : ", error})
    }

}, 


// Crée une nouvelle blague : 
createNewJoke: async(req, res) => {
    try { 
        const { question, answer } = req.body; 

        if (!question || !answer) {
            return res.status().json({ message: "La question et/ou la réponse sont requises pour créer une nouvelle blague"})
        }

        const newJoke = await Blague.create({
            question, 
            answer
        })

        return res.status(201).json(newJoke); 

    } catch(error) {
        res.status(500).json({message: "Erreur interne du serveur : ", error})
    }
}
}

module.exports = blagueController; 