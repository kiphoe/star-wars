import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SWService } from 'src/SW.Service';
import { FilmDetails } from 'src/app/model';
import { CommonMethod } from 'src/app/common.method';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  // Variable for model
  film: FilmDetails

  // Common Variable
  id: number

  // Variable for link to another page
  charLink: any[] = []
  speciesLink: any[] = []
  vehiclesLink: any[] = []
  starshipsLink: any[] = []
  planetLink: any[] = []

  constructor(private swService: SWService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonMethod: CommonMethod) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getFilmDetail();

  }

  getFilmDetail() {
    this.swService.getFilmDetails(this.id).then(result => {
      this.film = {
        title: result.FilmDetail['title'],
        episode_id: result.FilmDetail['episode_id'],
        opening_crawl: result.FilmDetail['opening_crawl'],
        director: result.FilmDetail['director'],
        producer: result.FilmDetail['producer'],
        release_date: result.FilmDetail['release_date'],
        characters: result.FilmDetail['characters'],
        planets: result.FilmDetail['planets'],
        starships: result.FilmDetail['starships'],
        vehicles: result.FilmDetail['vehicles'],
        species: result.FilmDetail['species'],
        created: result.FilmDetail['created'],
        edited: result.FilmDetail['edited']
      }

      // Set character link array
      if (this.film.characters == null) {
        this.charLink[0] = '-'
        return;
      }
      else {
        this.film.characters.forEach(characterUrl => {
          this.charLink = this.commonMethod.getUrlWithName(characterUrl, this.charLink)
        });
      }

      // Set character.film with new film array
      this.film.characters = this.charLink;

      // Set planets link array
      if (this.film.planets == null) {
        this.planetLink[0] = '-'
        return;
      }
      else {
        this.film.planets.forEach(planetUrl => {
          this.planetLink = this.commonMethod.getUrlWithName(planetUrl, this.planetLink)
        });
      }

      // Set character.homeworld with new homeworld
      this.film.planets = this.planetLink

      // Set species link array
      if (this.film.species == null) {
        this.speciesLink[0] = '-'
        return;
      }
      else {
        this.film.species.forEach(speciesUrl => {
          if (speciesUrl == null) {
            this.speciesLink[0] = 'empty'
            return;
          }
          this.speciesLink = this.commonMethod.getUrlWithName(speciesUrl, this.speciesLink)
        });
      }

      // Set character.species with new species array
      this.film.species = this.speciesLink

      // Set vehicles link array
      if (this.film.vehicles == null) {
        this.vehiclesLink[0] = '-'
        return;
      }
      else {
        this.film.vehicles.forEach(vehiclesUrl => {
          this.vehiclesLink = this.commonMethod.getUrlWithName(vehiclesUrl, this.vehiclesLink)
        });
      }

      // Set character.film with new film array
      this.film.vehicles = this.vehiclesLink

      if (this.film.starships == null) {
        this.starshipsLink[0] = '-'
        return;
      }
      else {
        // Set starships link array
        this.film.starships.forEach(starshipsUrl => {
          this.starshipsLink = this.commonMethod.getUrlWithName(starshipsUrl, this.starshipsLink)
        });
      }

      // Set character.starships with new starships array
      this.film.starships = this.starshipsLink
    })
      .catch(error => {
        console.log("An error occured");
        console.error(error);
        this.film = null
      })
  }

  // Navigate to another page
  goToLink(url: string, id: number) {
    if (id == 0) {
      return;
    }
    this.router.navigate(['/' + url + '/' + id]);
  }

}
