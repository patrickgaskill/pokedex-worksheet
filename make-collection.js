var fs = require("fs");
var oldPokedex = require("./src/pokedex.json");

var newPokedex = {};
var collection = {};

var genderMap = {
  male: "MALE",
  maleShiny: "MALE_SHINY",
  female: "FEMALE",
  femaleShiny: "FEMALE_SHINY",
  genderless: "GENDERLESS",
  genderlessShiny: "GENDERLESS_SHINY"
};

var variantMap = {
  party: "PARTY_HAT",
  santa: "SANTA_HAT",
  witch: "WITCH_HAT",
  ash: "ASH_HAT"
};

var itemMap = {
  "Sun Stone": "SUN_STONE",
  "King's Rock": "KINGS_ROCK",
  "Metal Coat": "METAL_COAT",
  "Dragon Scale": "DRAGON_SCALE",
  "Up-Grade": "UP-GRADE"
};

oldPokedex.forEach(entry => {
  var genders = [];
  if (entry.genders) {
    genders = Object.keys(entry.genders).map(
      g => genderMap[g] || "UNOWN_" + g.toUpperCase()
    );
  }

  var variants = [];
  if (entry.variants) {
    variants = Object.keys(entry.variants).map(v => variantMap[v]);
  }

  var evolutions = {};
  if (entry.evolvesInto) {
    entry.evolvesInto.forEach(ev => {
      evolutions[ev.id] = {
        candy: ev.candy,
        item: ev.item ? itemMap[ev.item] : null
      };
    });
  }

  newPokedex[entry.id] = {
    name: entry.name,
    genders: genders,
    variants: variants,
    evolutions: evolutions,
    candyType: entry.usesCandy,
    isLegendary: entry.legendary || false,
    isRegional: entry.regional || false
  };

  collection[entry.id] = {
    isSeen: false,
    hasAmazing: false,
    gendersCaught: {},
    variantsCaught: {}
  };
});

fs.writeFile("src/new-pokedex.json", JSON.stringify(newPokedex), err => {
  if (err) throw err;
  console.log("Can't create new-pokedex.json");
});
fs.writeFile("src/collection.json", JSON.stringify(collection), err => {
  if (err) throw err;
  console.log("Can't create collection.json");
});
