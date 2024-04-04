require("dotenv").config(); // Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`

// import des packages
const express = require("express");
const cors = require("cors");

// creation du serveur express
const app = express();
// utilisation de cors qui est une securitee activée permettant à un serveur d'empecher dautres sites d'utiliser ses ressources
app.use(cors());
//recup parametre de type body
app.use(express.json());

app.get("/", (req, res) => {
  try {
    return res.status(200).json("Welcome to Marvel's server !!!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// import des routes - CRUD
const charactersRoutes = require("./routes/characters");
const characterIdRoutes = require("./routes/characterId");
const comicsRoutes = require("./routes/comics");
const comicsCharacterRoutes = require("./routes/comicsCharacter");
const comicIdRoutes = require("./routes/comicId");

app.use(charactersRoutes);
app.use(characterIdRoutes);
app.use(comicsRoutes);
app.use(comicsCharacterRoutes);
app.use(comicIdRoutes);

// gérer les requêtes à une route qui n'existe pas dans le serveur
app.all("*", (req, res) => {
  return res.status(404).json({ message: "The route doesn't exist" });
});

// server va ecouter le port
app.listen(process.env.PORT, () => {
  console.log("Server has started 🔥🔥🔥");
});
