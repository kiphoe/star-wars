import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SWService } from 'src/SW.Service';
import { charDetails, FilmList } from 'src/app/model';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  private ngNavigatorShareService: NgNavigatorShareService;
  id: number

  character: charDetails

  // Variable for link to another page
  // Film Variable
  filmList: FilmList
  filmLink: any[] = []

  constructor(private swService: SWService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ngNavigatorShareService: NgNavigatorShareService) {
      this.ngNavigatorShareService = ngNavigatorShareService; }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    console.log('test>>', this.id);
    //this.name = this.activatedRoute.snapshot.params.url;
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

      // Set film link array
      this.character.films.forEach(filmUrl => {
        this.swService.getFilmLink(filmUrl).then(result => {
          this.filmList = {
            title: result.title,
            id: parseInt(this.getIdFromUrl(filmUrl))
          }
          this.filmLink.push(this.filmList);
        })
      });
      console.log(this.filmLink)

      // Set character.film with new film array
      this.character.films = this.filmLink;
      console.log(this.character.films)


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

  // Navigate to another page
  goToLink(url: string, id: number) {
    console.log('/' + url + '/' + id);
    this.router.navigate(['/' + url + '/' + id]);
  }
  async shareApi() {
    try{
      const sharedResponse = await this.ngNavigatorShareService.share({
        title:'`Web Articles and Tutorials',
        text: 'Check out my blog — its worth looking.',
        url: 'www.codershood.info'
      });
      console.log(sharedResponse);
    } catch(error) {
      console.log('You app is not shared, reason: ',error);
    }
  }

}
