const fs = require("fs");
const path = require("path");
let gameMaster;
let names;
let overrides;
let activePokemon;

try {
  gameMaster = require("./GAME_MASTER.json");
} catch (err) {
  console.error(
    "GAME_MASTER.json not found. Download a copy from the web and put it in this folder"
  );
  process.exit();
}

try {
  names = require("./names.json");
} catch (err) {
  names = {};
  console.log("names.json not found. Going to create one.");
}

try {
  overrides = require("./overrides.json");
} catch (err) {
  overrides = {};
}

try {
  activePokemon = require("./activePokemon.json");
} catch (err) {
  activePokemon = {};
  console.log("activePokemon.json not found. Going to create one.");
}

const pokemonEntries = {};
const gendersEntries = {};
const formsEntries = {};

const genderMap = {
  malePercent: "male",
  femalePercent: "female",
  genderlessPercent: "genderless"
};

const templateIdRegex = /V(\d+)_POKEMON_.+/;

gameMaster.itemTemplates.forEach(template => {
  if (template.pokemonSettings) {
    const {
      pokemonId,
      encounter,
      familyId,
      evolutionBranch,
      rarity
    } = template.pokemonSettings;

    if (!names[pokemonId]) {
      // Make a reasonable guess at formatting the name
      names[pokemonId] = pokemonId.charAt(0) + pokemonId.slice(1).toLowerCase();
    }

    if (!activePokemon.hasOwnProperty(pokemonId)) {
      activePokemon[pokemonId] = true;
    }

    pokemonEntries[pokemonId] = {
      number: parseInt(template.templateId.match(templateIdRegex)[1], 10),
      name: names[pokemonId],
      familyId,
      evolutionBranch: evolutionBranch || null,
      rarity: rarity || null,
      isRegional: false,
      active: activePokemon[pokemonId]
    };
  }

  if (template.genderSettings) {
    const { pokemon, gender } = template.genderSettings;
    const entry = {};
    Object.keys(gender).forEach(key => {
      entry[genderMap[key]] = true;
    });
    gendersEntries[pokemon] = entry;
  }

  if (template.formSettings) {
    const { pokemon, forms } = template.formSettings;
    if (forms) {
      const entry = {};
      forms.forEach(f => {
        entry[f.form] = true;
      });
      formsEntries[pokemon] = entry;
    }
  }
});

const pokemon = {};
Object.keys(pokemonEntries).forEach(id => {
  pokemon[id] = {
    ...pokemonEntries[id],
    genders: gendersEntries[id],
    forms: formsEntries[id] || null,
    ...overrides[id]
  };
});

fs.writeFile(
  path.join(__dirname, "pokemon.json"),
  JSON.stringify(pokemon),
  err => {
    if (err) {
      throw err;
      console.error("Cannot save pokemon.json:", err);
    }
  }
);

fs.writeFile(path.join(__dirname, "names.json"), JSON.stringify(names), err => {
  if (err) {
    throw err;
    console.error("Cannot save names.json:", err);
  }
});

fs.writeFile(
  path.join(__dirname, "activePokemon.json"),
  JSON.stringify(activePokemon),
  err => {
    if (err) {
      throw err;
      console.error("Cannot save activePokemon.json:", err);
    }
  }
);
