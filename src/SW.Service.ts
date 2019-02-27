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
        if (pageNum == "1"|| pageNum==null) {
            return (
                // http://something?q=<city>&appid=abc123
                this.http.get(URL + 'people')
                    .toPromise() //Convert the result to a promise
                    .then(result => {
                        console.log(result['results'])
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
        console.log(URL + 'people/' + id)
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
        if (pageNum == "1"|| pageNum==null) {
            return (
                // http://something?q=<city>&appid=abc123
                this.http.get(URL + 'films')
                    .toPromise() //Convert the result to a promise
                    .then(result => {
                        console.log(result['results'])
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
        console.log(URL + 'films/' + id)
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

    // Link method
    getFilmLink(urlLink: string){
        return(
            this.http.get(urlLink)
            .toPromise()
            .then(result=>{
                return({
                    title:result['title']
                })
            })
        )
    }

    getCharLink(urlLink: string){
        return(
            this.http.get(urlLink)
            .toPromise()
            .then(result=>{
                return({
                    name:result['name']
                })
            })
        )
    }

}
