import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SWService } from 'src/SW.Service';
import { StarshipDetails } from 'src/app/model';
import { CommonMethod } from 'src/app/common.method';

@Component({
  selector: 'app-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.css']
})
export class StarshipDetailsComponent implements OnInit {

  // Variable for model
  starship: StarshipDetails

  // Common Variable
  id: number

  // Variable for link to another page
  charLink: any[] = []
  filmLink: any[] = []

  constructor(private swService: SWService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonMethod: CommonMethod) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getStarshipDetail()
  }

  getStarshipDetail() {
    this.swService.getStarshipDetails(this.id).then(result => {
      this.starship = {
        name: result.StarshipDetail['name'],
        model: result.StarshipDetail['model'],
        manufacturer: result.StarshipDetail['manufacturer'],
        cost_in_credits: result.StarshipDetail['cost_in_credits'],
        length: result.StarshipDetail['length'],
        max_atmosphering_speed: result.StarshipDetail['max_atmosphering_speed'],
        crew: result.StarshipDetail['crew'],
        passengers: result.StarshipDetail['passengers'],
        cargo_capacity: result.StarshipDetail['cargo_capacity'],
        consumables: result.StarshipDetail['consumables'],
        hyperdrive_rating: result.StarshipDetail['hyperdrive_rating'],
        MGLT: result.StarshipDetail['MGLT'],
        starship_class: result.StarshipDetail['starship_class'],
        pilots: result.StarshipDetail['pilots'],
        films: result.StarshipDetail['films'],
        created: result.StarshipDetail['created'],
        edited: result.StarshipDetail['edited'],
      }

      // Set film link array
      if (this.starship.films.length == 0) {
        this.filmLink = [{
          title: '-',
          id: 0
        }]
      }
      else {
        this.starship.films.forEach(filmUrl => {
          this.filmLink = this.commonMethod.getUrlWithTitle(filmUrl, this.filmLink)
        });
      }

      // Set character.film with new film array
      this.starship.films = this.filmLink;

      if (this.starship.pilots.length == 0) {
        this.charLink = [{
          name: '-',
          id: 0
        }]
      }
      else {
        this.starship.pilots.forEach(characterUrl => {
          this.charLink = this.commonMethod.getUrlWithName(characterUrl, this.charLink)
        });
      }

      // Set character.film with new film array
      this.starship.pilots = this.charLink;
    })
      .catch(error => {
        console.log("An error occured");
        console.error(error);
        this.starship = null
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
