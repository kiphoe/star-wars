import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SWService } from 'src/SW.Service';
import { SpeciesDetails } from 'src/app/model';
import { CommonMethod } from 'src/app/common.method';
import { NgNavigatorShareService } from 'ng-navigator-share';

@Component({
  selector: 'app-species-details',
  templateUrl: './species-details.component.html',
  styleUrls: ['./species-details.component.css']
})
export class SpeciesDetailsComponent implements OnInit {
  // Variable for model
  species: SpeciesDetails
//link variable
private href: string = "";
  //rubbish
  comments: Comment[] = []
  // Common Variable
  id: number
  private ngNavigatorShareService: NgNavigatorShareService;
  // Variable for link to another page
  charLink: any[] = []
  filmLink: any[] = []
  planetLink: any[] = []

  constructor(private swService: SWService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ngNavigatorShareService: NgNavigatorShareService,
    private commonMethod: CommonMethod) {this.ngNavigatorShareService = ngNavigatorShareService; }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getSpeciesDetail();
    this.href = this.router.url;
  }

  getSpeciesDetail() {
    this.swService.getSpeciesDetails(this.id).then(result => {
      this.species = {
        name: result.SpeciesDetail['name'],
        classification: result.SpeciesDetail['classification'],
        designation: result.SpeciesDetail['designation'],
        average_height: result.SpeciesDetail['average_height'],
        skin_colors: result.SpeciesDetail['skin_colors'],
        hair_colors: result.SpeciesDetail['hair_colors'],
        eye_colors: result.SpeciesDetail['eye_colors'],
        average_lifespan: result.SpeciesDetail['average_lifespan'],
        homeworld: result.SpeciesDetail['homeworld'],
        language: result.SpeciesDetail['language'],
        people: result.SpeciesDetail['people'],
        films: result.SpeciesDetail['films'],
        created: result.SpeciesDetail['created'],
        edited: result.SpeciesDetail['edited']
      }

      // Set film link array
      if (this.species.films.length == 0) {
        this.filmLink = [{
          title: '-',
          id: 0
        }]
      }
      else {
        this.species.films.forEach(filmUrl => {
          this.filmLink = this.commonMethod.getUrlWithTitle(filmUrl, this.filmLink)
        });
      }

      // Set character.film with new film array
      this.species.films = this.filmLink;

      // Set character link array
      if (this.species.people == null) {
        this.charLink[0] = '-'
        return;
      }
      else {
        this.species.people.forEach(characterUrl => {
          this.charLink = this.commonMethod.getUrlWithName(characterUrl, this.charLink)
        });
      }

      // Set character.film with new film array
      this.species.people = this.charLink;

      // Set homeworld link array
      if (result.SpeciesDetail['homeworld'] == null) {
        this.planetLink = [{ name: 'null', id: 0 }]
      }
      else {
        this.planetLink = this.commonMethod.getUrlWithName(result.SpeciesDetail['homeworld'], this.planetLink)
      }
      // Set character.homeworld with new homeworld
      this.species.homeworld = this.planetLink
    })
      .catch(error => {
        console.log("An error occured");
        console.error(error);
        this.species = null
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
  async shareApi(specName: string) {
    try {
      const sharedResponse = await this.ngNavigatorShareService.share({
        title: 'Star Wars',
        text: 'Check out: ' + specName,
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
