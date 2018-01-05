// @flow
export type Evolutions = {
  [string]: {
    candyCost: number,
    evolutionItemRequirement?: string
  }
};

export type Forms = {
  [string]: {
    active: boolean,
    displayName: string,
    sortOrder: number
  }
};

export type Genders = {
  male?: boolean,
  female?: boolean,
  genderless?: boolean
};

export type Variants = {
  ash?: boolean,
  party?: boolean,
  santa?: boolean,
  witch?: boolean
};

export type Pokemon = {
  id: string,
  active: boolean,
  canBeShiny: boolean,
  evolutions: Evolutions,
  familyId: string,
  forms: Forms,
  genders: Genders,
  isRegional: boolean,
  name: string,
  number: number,
  rarity: ?string,
  variants: Variants
};
