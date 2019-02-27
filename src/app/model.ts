export interface Comment {
  comment: string;
}

export interface charDetails{
  url: string,
  name: string,
  height: string,
  mass: string,
  hairColour: string,
  skinColour: string,
  eyeColour: string,
  birthYear:string,
  gender: string,
  homeWorld: string,
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
  
  export interface Planet {
    latitude: number,
    longitude: number
  }

  export interface FilmList{
    title: string,
    id: number
  }

  export interface FilmDetails{
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