import { Injectable } from "@angular/core";
import { SWService } from "src/SW.Service"
import { FilmList, PlanetList } from './model';
import { template } from '@angular/core/src/render3';

@Injectable() //making this service able to inject into other components
export class CommonMethod {

    // Set a model that retrieve title
    ListForTitle: FilmList

    // Set a model that retrieve name
    ListForName: PlanetList

    LinkList: any[] = []

    constructor(private swService: SWService) {
    }

    getUrlWithTitle(url: string, Link: any[]) {
        this.swService.getLinkWithTitle(url).then(result => {
            this.ListForTitle = {
                title: result.title,
                id: parseInt(this.getIdFromUrl(url))
            }
            Link.push(this.ListForTitle);
        })
        return Link;
    }

    getUrlWithName(url: string, Link: any[]) {
        this.swService.getLinkWithName(url).then(result => {
            this.ListForName = {
                name: result.name,
                id: parseInt(this.getIdFromUrl(url))
            }
            Link.push(this.ListForName);
        })
        return Link;
    }


    getUrlWithNameForObject(url: string) {
        this.swService.getLinkWithName(url).then(result => {
            this.ListForName = {
                name: result.name,
                id: parseInt(this.getIdFromUrl(url))
            }
        })
        return this.ListForName

    }

    // Get Id to pass as the query string
    getIdFromUrl(value) {
        var id = value.match(/([0-9])+/g);
        id = id[0];
        return id;
    }
}