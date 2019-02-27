import { Component, OnInit } from '@angular/core';
import { SWService } from 'src/SW.Service';
import { Router, ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})

export class CharacterListComponent implements OnInit {

  // Page variable
  totalCount: number;
  totalPage: number;
  page = [];
  pageNumber: string;

  // Character variable
  characters: Character[] = []

  //x: string[] = []

  constructor(private swService: SWService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.pageNumber = this.activatedRoute.snapshot.params.pageNumber;

    this.getCharacterList();

  }
  // Get the List of character
  getCharacterList() {
    // Set the common variables
    // Populating character
    this.swService.getCharacterList(this.pageNumber).then(result => {
      // Get the pages
      this.totalCount = result.Count;
      this.totalPage = Math.ceil(this.totalCount / 10);
      for (let i = 1; i <= this.totalPage; i++) {
        this.page.push(i);
      }

      // Push the items
      for (let i in result.CharacterList) {
        this.characters.push({
          name: result.CharacterList[i].name,
          id: parseInt(this.getIdFromUrl(result.CharacterList[i].url))
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
    console.log('/people/' + id);
    this.router.navigate(['/people/' + id]);
  }

  // Clicking on page number event handler
  pageChange(pageNumber: string) {
    this.router.navigate(['/people/' + 'page/', pageNumber]).then(result => {
      window.location.reload()
    });
    this.ngOnInit();
  }


}
