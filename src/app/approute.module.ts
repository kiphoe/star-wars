import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list.component';
import { CharacterListComponent } from './components/character-list.component';
import { CharacterDetailsComponent } from './components/character-details.component';


const ROUTES: Routes = [
  { path: "", component: CategoryListComponent },
  { path: "category", component: CategoryListComponent },
  { path: "people", component: CharacterListComponent },
  { path: "people/:id", component: CharacterDetailsComponent },
  { path: "**", redirectTo: "/", pathMatch: 'full' }
]

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [ RouterModule ]

})
export class AppRouteModule { }