import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SWService } from 'src/SW.Service';
import { VehicleDetails } from 'src/app/model';
import { CommonMethod } from 'src/app/common.method';
import { NgNavigatorShareService } from 'ng-navigator-share';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  private href: string = "";
  // Variable for model
  vehicle: VehicleDetails
  private ngNavigatorShareService: NgNavigatorShareService;
  // Common Variable
  id: number

  // Variable for link to another page
  charLink: any[] = []
  filmLink: any[] = []
  //rubbish
  comments: Comment[] = []

  constructor(private swService: SWService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ngNavigatorShareService: NgNavigatorShareService,
    private commonMethod: CommonMethod) {this.ngNavigatorShareService = ngNavigatorShareService; }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getVehicleDetail()
    this.href = this.router.url;
  }

  getVehicleDetail() {
    this.swService.getVehicleDetails(this.id).then(result => {
      this.vehicle = {
        name: result.VehicleDetail['name'],
        model: result.VehicleDetail['model'],
        manufacturer: result.VehicleDetail['manufacturer'],
        cost_in_credits: result.VehicleDetail['cost_in_credits'],
        length: result.VehicleDetail['length'],
        max_atmosphering_speed: result.VehicleDetail['max_atmosphering_speed'],
        crew: result.VehicleDetail['crew'],
        passengers: result.VehicleDetail['passengers'],
        cargo_capacity: result.VehicleDetail['cargo_capacity'],
        consumables: result.VehicleDetail['consumables'],
        vehicle_class: result.VehicleDetail['vehicle_class'],
        pilots: result.VehicleDetail['pilots'],
        films: result.VehicleDetail['films'],
        created: result.VehicleDetail['created'],
        edited: result.VehicleDetail['edited'],
      }

      // Set film link array
      if (this.vehicle.films.length == 0) {
        this.filmLink = [{
          title: '-',
          id: 0
        }]
      }
      else {
        this.vehicle.films.forEach(filmUrl => {
          this.filmLink = this.commonMethod.getUrlWithTitle(filmUrl, this.filmLink)
        });
      }

      // Set character.film with new film array
      this.vehicle.films = this.filmLink;

      // Set character link array
      if (this.vehicle.pilots.length == 0) {
        this.charLink = [{
          name: '-',
          id: 0
        }]
      }
      else {
        this.vehicle.pilots.forEach(characterUrl => {
          this.charLink = this.commonMethod.getUrlWithName(characterUrl, this.charLink)
        });
      }

      // Set character.film with new film array
      this.vehicle.pilots = this.charLink;
    })
      .catch(error => {
        console.log("An error occured");
        console.error(error);
        this.vehicle = null
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
   async shareApi(vechName: string) {
    try {
      const sharedResponse = await this.ngNavigatorShareService.share({
        title: 'Star Wars',
        text: 'Check out: ' + vechName,
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
