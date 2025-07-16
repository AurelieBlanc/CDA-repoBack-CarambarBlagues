// Import des modules nécessaires : -------------------------------------- //
const express = require("express"); 
const BlagueController = require("./controllers/blagueController"); 

const router = express.Router(); 




// Routes : --------------------------------------------------------------- //

// Route pour récupérer toutes les blagues : 
/**
* @swagger
 * /api/v1/jokes:
 *   get:
 *     summary: Récupère toutes les blagues
 *     description: Retourne toutes les blagues enregistrées dans la base de données
 *     tags:
 *       - Blagues
 *     responses:
 *       200:
 *         description: Succès - retour de toutes les blagues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   question:
 *                     type: string
 *                     example: "Quelle est la femelle du hamster ?"
 *                   answer:
 *                     type: string
 *                     example: "L'Amsterdam"
 *       404:
 *         description: Aucune blague trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/api/v1/jokes", BlagueController.getAllJokes);



// Route pour récupérer une seule blague de manière aléatoire :
/**
 * @swagger
 * /api/v1/jokes/random:
 *   get:
 *     summary: Récupère une blague de manière aléatoire
 *     tags:
 *       - Blagues
 *     responses:
 *       "200":
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 question:
 *                   type: string
 *                   example: "Quelle est la femelle du hamster ?"
 *                 answer:
 *                   type: string
 *                   example: "L'Amsterdam"
 *       "404":
 *         description: Aucune blague n'a été trouvée
 *       "500":
 *         description: Erreur interne
 */
router.get("/api/v1/jokes/random", BlagueController.getOneJokeRandomly);



// Route pour récupérer une seule blague par ID : 
/**
 * @swagger
 * /api/v1/jokes/:id:
 *   get:
 *     summary: Récupère une blague par son ID (identifiant)
 *     tags:
 *       - Blagues
 *     responses:
 *       "200":
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 question:
 *                   type: string
 *                   example: "Quelle est la femelle du hamster ?"
 *                 answer:
 *                   type: string
 *                   example: "L'Amsterdam"
 *       "404":
 *         description: Aucune blague n'a été trouvée
 *       "500":
 *         description: Erreur interne
 */
router.get("/api/v1/jokes/:id", BlagueController.getOneJoke);



// Route pour ajouter une nouvelle blague en BDD:
/**
 * @swagger
 * /api/v1/jokes:
 *   post:
 *     summary: Rajoute une blague en base de données
 *     tags:
 *       - Blagues
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: "Quel est le sport préféré des insectes ?"
 *               answer:
 *                 type: string
 *                 example: "Le cricket"
 *     responses:
 *       "200":
 *         description: Blague ajoutée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 42
 *                 question:
 *                   type: string
 *                   example: "Quel est le sport préféré des insectes ?"
 *                 answer:
 *                   type: string
 *                   example: "Le cricket"
 *       "500":
 *         description: Erreur interne
 */
router.post("/api/v1/jokes", BlagueController.createNewJoke);





module.exports = router; 