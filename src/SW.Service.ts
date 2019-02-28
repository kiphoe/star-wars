import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const URL = 'https://swapi.co/api/';

@Injectable()
export class SWService {

    constructor(private http: HttpClient) { }

    // Character methods:
    getCharacterList(pageNum: string) {
        const queryString = new HttpParams()
            .set('page', pageNum);
        if (pageNum == "1" || pageNum == null) {
            return (
                // http://something?q=<city>&appid=abc123
                this.http.get(URL + 'people')
                    .toPromise() //Convert the result to a promise
                    .then(result => {
                        return ({
                            CharacterList: result['results'],
                            Count: result['count']
                        })
                    })
            )
        }
        else {
            return (
                this.http.get(URL + 'people/?page=' + pageNum)
                    .toPromise()
                    .then(result => {
                        return ({
                            CharacterList: result['results'],
                            Count: result['count']
                        })
                    })
            )
        }
    }

    getCharacterDetails(id: number) {
        return (
            this.http.get(URL + 'people/' + id)
                .toPromise()
                .then(result => {
                    return ({
                        CharacterDetail: result
                    })
                })
        )
    }

    // Films method:

    getFilmList(pageNum: string) {
        const queryString = new HttpParams()
            .set('page', pageNum);
        if (pageNum == "1" || pageNum == null) {
            return (
                // http://something?q=<city>&appid=abc123
                this.http.get(URL + 'films')
                    .toPromise() //Convert the result to a promise
                    .then(result => {

                        return ({
                            FilmList: result['results'],
                            Count: result['count']
                        })
                    })
            )
        }
        else {
            return (
                this.http.get(URL + 'films/?page=' + pageNum)
                    .toPromise()
                    .then(result => {
                        return ({
                            FilmList: result['results'],
                            Count: result['count']
                        })
                    })
            )
        }
    }

    getFilmDetails(id: number) {

        return (
            this.http.get(URL + 'films/' + id)
                .toPromise()
                .then(result => {
                    return ({
                        FilmDetail: result
                    })
                })
        )
    }

    // Species method:

    getSpeciesList(pageNum: string) {
        const queryString = new HttpParams()
            .set('page', pageNum);
        if (pageNum == "1" || pageNum == null) {
            return (
                // http://something?q=<city>&appid=abc123
                this.http.get(URL + 'species')
                    .toPromise() //Convert the result to a promise
                    .then(result => {
                        return ({
                            SpeciesList: result['results'],
                            Count: result['count']
                        })
                    })
            )
        }
        else {
            return (
                this.http.get(URL + 'species/?page=' + pageNum)
                    .toPromise()
                    .then(result => {
                        return ({
                            SpeciesList: result['results'],
                            Count: result['count']
                        })
                    })
            )
        }
    }

    getSpeciesDetails(id: number) {
        return (
            this.http.get(URL + 'species/' + id)
                .toPromise()
                .then(result => {
                    return ({
                        SpeciesDetail: result
                    })
                })
        )
    }

    // Starships method:

    getStarshipList(pageNum: string) {
        const queryString = new HttpParams()
            .set('page', pageNum);
        if (pageNum == "1" || pageNum == null) {
            return (
                // http://something?q=<city>&appid=abc123
                this.http.get(URL + 'starships')
                    .toPromise() //Convert the result to a promise
                    .then(result => {
                        return ({
                            StarshipList: result['results'],
                            Count: result['count']
                        })
                    })
            )
        }
        else {
            return (
                this.http.get(URL + 'starships/?page=' + pageNum)
                    .toPromise()
                    .then(result => {
                        return ({
                            StarshipList: result['results'],
                            Count: result['count']
                        })
                    })
            )
        }
    }

    getStarshipDetails(id: number) {
        return (
            this.http.get(URL + 'starships/' + id)
                .toPromise()
                .then(result => {
                    return ({
                        StarshipDetail: result
                    })
                })
        )
    }

    // Vehicles method:

    getVehicleList(pageNum: string) {
        const queryString = new HttpParams()
            .set('page', pageNum);
        if (pageNum == "1" || pageNum == null) {
            return (
                // http://something?q=<city>&appid=abc123
                this.http.get(URL + 'vehicles')
                    .toPromise() //Convert the result to a promise
                    .then(result => {
                        return ({
                            VehicleList: result['results'],
                            Count: result['count']
                        })
                    })
            )
        }
        else {
            return (
                this.http.get(URL + 'vehicles/?page=' + pageNum)
                    .toPromise()
                    .then(result => {
                        return ({
                            VehicleList: result['results'],
                            Count: result['count']
                        })
                    })
            )
        }
    }

    getVehicleDetails(id: number) {
        return (
            this.http.get(URL + 'vehicles/' + id)
                .toPromise()
                .then(result => {
                    return ({
                        VehicleDetail: result
                    })
                })
        )
    }

     // Planets method:

     getPlanetList(pageNum: string) {
        if (pageNum == "1" || pageNum == null) {
            return (
                // http://something?q=<city>&appid=abc123
                this.http.get(URL + 'planets')
                    .toPromise() //Convert the result to a promise
                    .then(result => {
                        return ({
                            PlanetList: result['results'],
                            Count: result['count']
                        })
                    })
            )
        }
        else {
            return (
                this.http.get(URL + 'planets/?page=' + pageNum)
                    .toPromise()
                    .then(result => {
                        return ({
                            PlanetList: result['results'],
                            Count: result['count']
                        })
                    })
            )
        }
    }

    getPlanetDetails(id: number) {
        return (
            this.http.get(URL + 'planets/' + id)
                .toPromise()
                .then(result => {
                    return ({
                        PlanetDetail: result
                    })
                })
        )
    }

    // Link method
    getLinkWithTitle(urlLink: string) {
        return (
            this.http.get(urlLink)
                .toPromise()
                .then(result => {
                    return ({
                        title: result['title']
                    })
                })
        )
    }

    getLinkWithName(urlLink: string) {
        return (
            this.http.get(urlLink)
                .toPromise()
                .then(result => {
                    return ({
                        name: result['name']
                    })
                })
        )
    }
}
