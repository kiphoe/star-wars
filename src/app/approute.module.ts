import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list.component';
import { CharacterListComponent } from './components/character/character-list.component';
import { CharacterDetailsComponent } from './components/character/character-details.component';
import { FilmListComponent } from './components/films/film-list.component';
import { FilmDetailsComponent } from './components/films/film-details.component';


const ROUTES: Routes = [
  { path: "", component: CategoryListComponent },
  { path: "category", component: CategoryListComponent },
  { path: "people", component: CharacterListComponent },
  { path: "people/page/:pageNumber", component: CharacterListComponent },
  { path: "people/:id", component: CharacterDetailsComponent },
  { path: "film", component: FilmListComponent },
  { path: "film/page/:pageNumber", component: FilmDetailsComponent },
  { path: "film/:id", component: FilmDetailsComponent },
  { path: "**", redirectTo: "/", pathMatch: 'full' }
]

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [ RouterModule ]

})
export class AppRouteModule { }