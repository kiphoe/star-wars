export interface Comment {
  comment: string;
}

export interface charDetails {
  url: string,
  name: string,
  height: string,
  mass: string,
  hairColour: string,
  skinColour: string,
  eyeColour: string,
  birthYear: string,
  gender: string,
  homeWorld: string[],
  films: string[],
  species: string[],
  vehicles: string[],
  starships: string[],
  image: string
  comments: string
}

export interface Character {
  name: string,
  id: number
}

export interface FilmList {
  title: string,
  id: number
}

export interface FilmDetails {
  title: string,
  episode_id: string,
  opening_crawl: string,
  director: string,
  producer: string,
  release_date: string,
  characters: string[],
  planets: string[],
  starships: string[],
  vehicles: string[],
  species: string[],
  created: string,
  edited: string
}

export interface SpeciesList {
  name: string,
  id: number
}

export interface SpeciesDetails {
  name: string,
  classification: string,
  designation: string,
  average_height: string,
  skin_colors: string,
  hair_colors: string,
  eye_colors: string,
  average_lifespan: string,
  homeworld: string[],
  language: string,
  people: string[],
  films: string[],
  created: string,
  edited: string
}

export interface StarshipList {
  name: string,
  id: number
}

export interface StarshipDetails {
  name: string,
  model: string,
  manufacturer: string,
  cost_in_credits: string,
  length: string,
  max_atmosphering_speed: string,
  crew: string,
  passengers: string,
  cargo_capacity: string,
  consumables: string,
  hyperdrive_rating: string,
  MGLT: string,
  starship_class: string,
  pilots: string[],
  films: string[],
  created: string,
  edited: string
}

export interface VehicleList {
  name: string,
  id: number
}

export interface VehicleDetails {
  name: string,
  model: string,
  manufacturer: string,
  cost_in_credits: string,
  length: string,
  max_atmosphering_speed: string,
  crew: string,
  passengers: string,
  cargo_capacity: string,
  consumables: string,
  vehicle_class: string,
  pilots: string[],
  films: string[],
  created: string,
  edited: string
}

export interface PlanetList {
  name: string,
  id: number
}

export interface PlanetDetails {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  residents: string[],
  films: string[],
  created: string,
  edited: string
}