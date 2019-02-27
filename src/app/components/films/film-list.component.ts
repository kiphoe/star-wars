import { Component, OnInit } from '@angular/core';
import { SWService } from 'src/SW.Service';
import { Router, ActivatedRoute } from '@angular/router';
import { Character, FilmList } from 'src/app/model';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  // Page variable
  totalCount: number;
  totalPage: number;
  page = [];
  pageNumber: string;

  // Character variable
  characters: Character[] = []

  // Film variable
  films: FilmList[] = []

  // Variable to hold all the array
  items: any[] = []

  // Common variable
  url: string
  title: string
  category: string

  constructor(private swService: SWService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.pageNumber = this.activatedRoute.snapshot.params.pageNumber;
    this.getFilmList();

  }

  // METHOD FOR FILMS:

  getFilmList() {
    // Set the common variable
    this.url = '/films/';
    this.title = 'Films';
    // Populating films
    this.swService.getFilmList(this.pageNumber).then(result => {
      // Get the pages
      this.totalCount = result.Count;
      this.totalPage = Math.ceil(this.totalCount / 10);
      for (let i = 1; i <= this.totalPage; i++) {
        this.page.push(i);
      }

      // Push the items
      for (let i in result.FilmList) {
        this.films.push({
          title: result.FilmList[i].title,
          id: parseInt(this.getIdFromUrl(result.FilmList[i].url))
        })
      }
      // Set the items to populate the database
      this.items = this.films;
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
    console.log('/film/' + id);
    this.router.navigate(['/film/' + id]);
  }

  // Clicking on page number event handler
  pageChange(pageNumber: string) {
    this.router.navigate(['/film/' + 'page/', pageNumber]).then(result => {
      window.location.reload()
    });
    this.ngOnInit();
  }
}
