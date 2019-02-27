import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SWService } from 'src/SW.Service';
import { charDetails, FilmDetails, Character } from 'src/app/model';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  // Variable for model
  character: charDetails
  film: FilmDetails

  // Common Variable
  id: number

  // Variable for link to another page
  // Film Variable
  charList: Character
  charLink: any[] = []

  constructor(private swService: SWService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

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

      // Set film link array
      this.film.characters.forEach(charUrl => {
        this.swService.getCharLink(charUrl).then(result => {
          this.charList = {
            name: result.name,
            id: parseInt(this.getIdFromUrl(charUrl))
          }
          this.charLink.push(this.charList);
        })
      });

      // Set character.film with new film array
      this.film.characters = this.charLink;
      console.log(this.film.characters)

    })
      .catch(error => {
        console.log("An error occured");
        console.error(error);
        this.character = null
      })
  }

  // Get Id to pass as the query string
  getIdFromUrl = function (value) {
    var id = value.match(/([0-9])+/g);
    id = id[0];
    return id;
  }

}
