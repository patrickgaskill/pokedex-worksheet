const fs = require("fs");
const path = require("path");
const merge = require("deepmerge");
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

for (const template of gameMaster.itemTemplates) {
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

    const evolutions = {};
    if (evolutionBranch) {
      for (const ev of evolutionBranch) {
        evolutions[ev.evolution] = {
          candyCost: ev.candyCost,
          evolutionItemRequirement: ev.evolutionItemRequirement
        };
      }
    }

    pokemonEntries[pokemonId] = {
      number: parseInt(template.templateId.match(templateIdRegex)[1], 10),
      name: names[pokemonId],
      familyId,
      evolutions,
      rarity: rarity || null,
      isRegional: false,
      canBeShiny: false,
      variants: {},
      active: activePokemon[pokemonId]
    };
  }

  if (template.genderSettings) {
    const { pokemon, gender } = template.genderSettings;
    const entry = { male: false, female: false, genderless: false };
    for (const key of Object.keys(gender)) {
      entry[genderMap[key]] = true;
    }
    gendersEntries[pokemon] = entry;
  }

  if (template.formSettings) {
    const { pokemon, forms } = template.formSettings;
    const entry = {};
    if (forms) {
      for (const f of forms) {
        entry[f.form] = {
          displayName: f.form
            .split("_")
            .slice(1)
            .map(w => w.charAt(0) + w.slice(1).toLowerCase())
            .join(" "),
          sortOrder: f.assetBundleValue,
          active: true
        };
      }
    }
    formsEntries[pokemon] = entry;
  }
}

let pokemon = {};
for (const id of Object.keys(pokemonEntries)) {
  pokemon[id] = {
    ...pokemonEntries[id],
    genders: gendersEntries[id],
    forms: formsEntries[id] || {}
  };
}
pokemon = merge(pokemon, overrides);

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
