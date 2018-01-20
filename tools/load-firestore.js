const path = require("path");
const Firestore = require("@google-cloud/firestore");
const pokedex = require("./pokedex.json");

const firestore = new Firestore({
  projectId: "pokedex-worksheet",
  keyFilename: path.join(__dirname, "../serviceAccountKey.json")
});

firestore.doc("pokedex/pokedex").set(pokedex);
