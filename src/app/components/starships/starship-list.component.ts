import { Component, OnInit } from '@angular/core';
import { SWService } from 'src/SW.Service';
import { Router, ActivatedRoute } from '@angular/router';
import { StarshipList } from 'src/app/model';

@Component({
  selector: 'app-starship-list',
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.css']
})
export class StarshipListComponent implements OnInit {

  // Page variable
  totalCount: number;
  totalPage: number;
  page = [];
  pageNumber: string;

  // Starship variable
  starships: StarshipList[] = []

  // Variable to hold all the array
  items: any[] = []

  constructor(private swService: SWService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.pageNumber = this.activatedRoute.snapshot.params.pageNumber;
    this.getStarshipList();
  }

  // METHOD FOR STARSHIPS:

  getStarshipList() {
    // Populating starships
    this.swService.getStarshipList(this.pageNumber).then(result => {
      // Get the pages
      this.totalCount = result.Count;
      this.totalPage = Math.ceil(this.totalCount / 10);
      for (let i = 1; i <= this.totalPage; i++) {
        this.page.push(i);
      }

      // Push the items
      for (let i in result.StarshipList) {
        this.starships.push({
          name: result.StarshipList[i].name,
          id: parseInt(this.getIdFromUrl(result.StarshipList[i].url))
        })
      }
      // Set the items to populate the database
      this.items = this.starships;
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
    this.router.navigate(['/starships/' + id]);
  }

  // Clicking on page number event handler
  pageChange(pageNumber: string) {
    this.router.navigate(['/starships/' + 'page/', pageNumber]).then(result => {
      window.location.reload()
    });
    this.ngOnInit();
  }

}
