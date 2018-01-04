const path = require("path");
const Firestore = require("@google-cloud/firestore");
const pokemon = require("./pokemon.json");

const firestore = new Firestore();

const batch = firestore.batch();

for (const id of Object.keys(pokemon)) {
  batch.set(firestore.doc(`pokemon/${id}`), pokemon[id]);
}

batch.commit().then(res => {
  console.log("Finished batch commit");
});
