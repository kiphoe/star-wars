import { Component, OnInit } from '@angular/core';
import { SWService } from 'src/SW.Service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanetList } from 'src/app/model';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css']
})
export class PlanetListComponent implements OnInit {


  // Page variable
  totalCount: number;
  totalPage: number;
  page = [];
  pageNumber: string;

  // Character variable
  planets: PlanetList[] = []

  constructor(private swService: SWService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.pageNumber = this.activatedRoute.snapshot.params.pageNumber;
    this.getPlanetList();
  }
  // Get the List of character
  getPlanetList() {
    // Set the common variables
    this.swService.getPlanetList(this.pageNumber).then(result => {
      // Get the pages
      this.totalCount = result.Count;
      this.totalPage = Math.ceil(this.totalCount / 10);
      for (let i = 1; i <= this.totalPage; i++) {
        this.page.push(i);
      }

      // Push the items
      for (let i in result.PlanetList) {
        this.planets.push({
          name: result.PlanetList[i].name,
          id: parseInt(this.getIdFromUrl(result.PlanetList[i].url))
        })
      }
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
    this.router.navigate(['/planets/' + id]);
  }

  // Clicking on page number event handler
  pageChange(pageNumber: string) {
    this.router.navigate(['/planets/' + 'page/', pageNumber]).then(result => {
      window.location.reload()
    });
    this.ngOnInit();
  }
}
