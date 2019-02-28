import { Component, OnInit } from '@angular/core';
import { SWService } from 'src/SW.Service';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleList } from 'src/app/model'

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  // Page variable
  totalCount: number;
  totalPage: number;
  page = [];
  pageNumber: string;

  // Vehicle variable
  vehicles: VehicleList[] = []

  // Variable to hold all the array
  items: any[] = []

  constructor(private swService: SWService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.pageNumber = this.activatedRoute.snapshot.params.pageNumber;
    this.getVehicleList();
  }

  // METHOD FOR VEHICLES:

  getVehicleList() {
    // Populating vehicles
    this.swService.getVehicleList(this.pageNumber).then(result => {
      // Get the pages
      this.totalCount = result.Count;
      this.totalPage = Math.ceil(this.totalCount / 10);
      for (let i = 1; i <= this.totalPage; i++) {
        this.page.push(i);
      }

      // Push the items
      for (let i in result.VehicleList) {
        this.vehicles.push({
          name: result.VehicleList[i].name,
          id: parseInt(this.getIdFromUrl(result.VehicleList[i].url))
        })
      }
      // Set the items to populate the database
      this.items = this.vehicles;
    })
  }

   // COMMON METHODS:

  // Get Id to pass as the query string
  getIdFromUrl = function (value) {
    var id = value.match(/([0-9])+/g);
    id = id[0];
    return id;
  }

  // Navigate to details page
  goToDetails(id: number) {
    this.router.navigate(['/vehicles/' + id]);
  }

  // Clicking on page number event handler
  pageChange(pageNumber: string) {
    this.router.navigate(['/vehicles/' + 'page/', pageNumber]).then(result => {
      window.location.reload()
    });
    this.ngOnInit();
  }


}
