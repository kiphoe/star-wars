import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeciesList } from 'src/app/model';
import { SWService } from 'src/SW.Service';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.css']
})
export class SpeciesListComponent implements OnInit {

  // Page variable
  totalCount: number;
  totalPage: number;
  page = [];
  pageNumber: string;

  // Species variable
  species: SpeciesList[] = []

  // Variable to hold all the array
  items: any[] = []


  constructor(private swService: SWService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.pageNumber = this.activatedRoute.snapshot.params.pageNumber;
    this.getSpeciesList();
  }

  // METHOD FOR SPECIES:

  getSpeciesList() {
    // Populating species
    this.swService.getSpeciesList(this.pageNumber).then(result => {
      // Get the pages
      this.totalCount = result.Count;
      this.totalPage = Math.ceil(this.totalCount / 10);
      for (let i = 1; i <= this.totalPage; i++) {
        this.page.push(i);
      }

      // Push the items
      for (let i in result.SpeciesList) {
        this.species.push({
          name: result.SpeciesList[i].name,
          id: parseInt(this.getIdFromUrl(result.SpeciesList[i].url))
        })
      }
      // Set the items to populate the database
      this.items = this.species;
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
    this.router.navigate(['/species/' + id]);
  }

  // Clicking on page number event handler
  pageChange(pageNumber: string) {
    this.router.navigate(['/species/' + 'page/', pageNumber]).then(result => {
      window.location.reload()
    });
    this.ngOnInit();
  }
}
