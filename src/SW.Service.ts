import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const URL = 'https://swapi.co/api/';

@Injectable()
export class SWService {

    constructor(private http: HttpClient) { }

    getCharacterList() {

        return (
            // http://something?q=<city>&appid=abc123
            this.http.get(URL + 'people')
                .toPromise() //Convert the result to a promise
                .then(result => {
                    console.log(result['results'])
                    return ({
                        CharacterList: result['results'],                      
                    })
                })
        )
    }

}
