import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SWService } from 'src/SW.Service';
import { PlanetDetails } from 'src/app/model';
import { CommonMethod } from 'src/app/common.method';
import { NgNavigatorShareService } from 'ng-navigator-share';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit {

  // Variable for model
  planet: PlanetDetails

  // Common Variable
  id: number
  private ngNavigatorShareService: NgNavigatorShareService;
  private href: string = "";
  // Variable for link to another page
  filmLink: any[] = []
  planetLink: any[] = []


  constructor(private swService: SWService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ngNavigatorShareService: NgNavigatorShareService,
    private commonMethod: CommonMethod) {this.ngNavigatorShareService = ngNavigatorShareService; }

  ngOnInit() {
    this.href = this.router.url;
    this.id = this.activatedRoute.snapshot.params.id;
    this.getPlanetDetail()
  }

  getPlanetDetail() {
    this.swService.getPlanetDetails(this.id).then(result => {
      this.planet = {
        name: result.PlanetDetail['name'],
        rotation_period: result.PlanetDetail['rotation_period'],
        orbital_period: result.PlanetDetail['orbital_period'],
        diameter: result.PlanetDetail['diameter'],
        climate: result.PlanetDetail['climate'],
        gravity: result.PlanetDetail['gravity'],
        terrain: result.PlanetDetail['terrain'],
        surface_water: result.PlanetDetail['surface_water'],
        population: result.PlanetDetail['population'],
        residents: result.PlanetDetail['residents'],
        films: result.PlanetDetail['films'],
        created: result.PlanetDetail['created'],
        edited: result.PlanetDetail['edited'],
      }

      // Set film link array
      if (this.planet.films.length == 0) {
        this.filmLink = [{
          title: '-',
          id: 0
        }]
      }
      else {
        this.planet.films.forEach(filmUrl => {
          this.filmLink = this.commonMethod.getUrlWithTitle(filmUrl, this.filmLink)
        });
      }

      // Set character.film with new film array
      this.planet.films = this.filmLink;

      // Set character link array
      if (this.planet.residents == null) {
        this.planetLink[0] = '-'
        return;
      }
      else {
        this.planet.residents.forEach(characterUrl => {
          this.planetLink = this.commonMethod.getUrlWithName(characterUrl, this.planetLink)
        });
      }

      // Set character.film with new film array
      this.planet.residents = this.planetLink;
    })
      .catch(error => {
        console.log("An error occured");
        console.error(error);
        this.planet = null
      })
  }

  // Navigate to another page
  goToLink(url: string, id: number) {
    try {
      if (id == 0) {
        return;
      }
      this.router.navigate(['/' + url + '/' + id]);
    } catch (error) {
      console.log(error)
    }

  }

  //share function
  async shareApi(planetName: string) {
    try {
      const sharedResponse = await this.ngNavigatorShareService.share({
        title: 'Star Wars',
        text: 'Check out: ' + planetName,
        url: 'https://kiphoe.github.io/star-wars' + this.href
      });
      console.log(sharedResponse);
    } catch (error) {
      console.log('You app is not shared, reason: ', error);
    }
  }
}
