import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SWService } from 'src/SW.Service';
import { charDetails, FilmList, Comment, PlanetList } from 'src/app/model';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { CommonMethod } from 'src/app/common.method';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  private ngNavigatorShareService: NgNavigatorShareService;
  id: number

  character: charDetails
  //link variable
  private href: string = "";
  //rubbish
  comments: Comment[] = []

  // Variable for link to another page
  // Film Variable
  filmList: FilmList

  // Home world variable
  homeWorldList: PlanetList

  filmLink: any[] = []
  speciesLink: any[] = []
  vehiclesLink: any[] = []
  starshipsLink: any[] = []
  homeWorldLink: any[] = []


  constructor(private swService: SWService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ngNavigatorShareService: NgNavigatorShareService, private commonMethod: CommonMethod) {
    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  ngOnInit() {
    this.href = this.router.url;
    this.id = this.activatedRoute.snapshot.params.id;
    this.getCharacterDetail();
  }

  getCharacterDetail() {
    this.swService.getCharacterDetails(this.id).then(result => {
      console.log(result.CharacterDetail);
      this.character = {
        url: result.CharacterDetail['url'],
        name: result.CharacterDetail['name'],
        height: result.CharacterDetail['height'],
        mass: result.CharacterDetail['mass'],
        hairColour: result.CharacterDetail['hair_color'],
        skinColour: result.CharacterDetail['skin_color'],
        eyeColour: result.CharacterDetail['hair_color'],
        birthYear: result.CharacterDetail['birth_year'],
        gender: result.CharacterDetail['gender'],
        homeWorld: result.CharacterDetail['homeworld'],
        films: result.CharacterDetail['films'],
        species: result.CharacterDetail['species'],
        vehicles: result.CharacterDetail['vehicles'],
        starships: result.CharacterDetail['starships'],
        image: null,
        comments: null
      }

      // Set Link methods

      // Set film link array
      if (this.character.films.length == 0) {
        this.filmLink = [{
          title: '-',
          id: 0
        }]
      }
      else {
        this.character.films.forEach(filmUrl => {
          this.filmLink = this.commonMethod.getUrlWithTitle(filmUrl, this.filmLink)
        });
      }

      // Set character.film with new film array
      this.character.films = this.filmLink;

      // Set species link array
      if (this.character.species.length == 0) {
        this.speciesLink = [{
          name: '-',
          id: 0
        }]
      }
      else {
        this.character.species.forEach(speciesUrl => {
          this.speciesLink = this.commonMethod.getUrlWithName(speciesUrl, this.speciesLink)
        });
      }

      // Set character.species with new species array
      this.character.species = this.speciesLink

      // Set vehicles link array
      if (this.character.vehicles.length == 0) {
        this.vehiclesLink = [{
          name: '-',
          id: 0
        }]
      }
      else {
        this.character.vehicles.forEach(vehiclesUrl => {
          this.vehiclesLink = this.commonMethod.getUrlWithName(vehiclesUrl, this.vehiclesLink)
        });
      }

      // Set character.film with new film array
      this.character.vehicles = this.vehiclesLink

      // Set starships link array
      if (this.character.starships.length == 0) {
        this.starshipsLink = [{
          name: '-',
          id: 0
        }]
      }
      else {
        this.character.starships.forEach(starshipsUrl => {
          this.starshipsLink = this.commonMethod.getUrlWithName(starshipsUrl, this.starshipsLink)
        });
      }

      // Set character.starships with new starships array
      this.character.starships = this.starshipsLink

      // Set homeworld link array
      this.homeWorldLink = this.commonMethod.getUrlWithName(result.CharacterDetail['homeworld'], this.homeWorldLink)

      // Set character.homeworld with new homeworld
      this.character.homeWorld = this.homeWorldLink
    })
      .catch(error => {
        console.log("An error occured");
        console.error(error);
        this.character = null
      })
  }


  // Navigate to another page
  goToLink(url: string, id: number) {
    if (id == 0) {
      return;
    }
    this.router.navigate(['/' + url + '/' + id]);
  }
  //share function
  async shareApi(charName: string) {
    try {
      const sharedResponse = await this.ngNavigatorShareService.share({
        title: 'Star Wars',
        text: 'Check out: ' + charName,
        url: 'https://kiphoe.github.io/star-wars' + this.href
      });
      console.log(sharedResponse);
    } catch (error) {
      console.log('You app is not shared, reason: ', error);
    }
  }


  addNewComment(comm: Comment) {
    //rubbish
    this.comments.push(comm);
  }
}
