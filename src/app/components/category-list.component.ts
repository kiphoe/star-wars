import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
 
  Categories: string[] = ['Characters', 'Films', 'Species', 'Starship', 'Vehicles', 'Planets'];

  constructor(private router: Router) { }

  ngOnInit() {
  }
  getCategory(category: string){
    console.log(category);
    if(category=='Characters'){
      this.router.navigate(['/people']);
    }
    else if(category=='Films'){
      this.router.navigate(['/film']);
    }
    else if(category=='Species'){
      this.router.navigate(['/species']);
    }
    else if(category=='Vehicles'){
      this.router.navigate(['/vehicles']);
    }
    else if(category=='Starship'){
      this.router.navigate(['/starships']);
    }
    else if(category=='Planets'){
      this.router.navigate(['/planets']);
    }
  }

}
