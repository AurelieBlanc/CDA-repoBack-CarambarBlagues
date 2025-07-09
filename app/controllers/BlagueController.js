// Import du modèle Blague : ---------------------------------------------- //
const Blague  = require("../models/Blague"); 


// Controlleur pour interagir avec la BDD : -------------------------------- //
const BlagueController = {

// Récupérer toutes les blagues : 
getAllJokes : async(req, res) => {
    try {
        const jokes = await Blague.findAll()

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

        const jokeById = await Blague.findByPk({
            where: {
                id: jokeId
            }
        })

        if(!jokeById) {
            res.status(404).json({ message: "Aucune blague n'a été trouvé"})
        } else {
            res.status(200).json(jokeById)
        }

    } catch (error) {
        res.status(500).json({message: "Erreur interne du serveur : ", error})
    }
},


// Crée une nouvelle blague : 
createJoke: async(req, res) => {
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