import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list.component';
import { CharacterListComponent } from './components/character/character-list.component';
import { CharacterDetailsComponent } from './components/character/character-details.component';
import { FilmListComponent } from './components/films/film-list.component';
import { FilmDetailsComponent } from './components/films/film-details.component';
import { SpeciesListComponent } from './components/species/species-list.component';
import { SpeciesDetailsComponent } from './components/species/species-details.component';
import { StarshipListComponent } from './components/starships/starship-list.component';
import { StarshipDetailsComponent } from './components/starships/starship-details.component';
import { VehicleListComponent } from './components/vehicles/vehicle-list.component';
import { VehicleDetailsComponent } from './components/vehicles/vehicle-details.component';
import { PlanetListComponent } from './components/planets/planet-list.component';
import { PlanetDetailsComponent } from './components/planets/planet-details.component';


const ROUTES: Routes = [
  { path: "", component: CategoryListComponent },
  { path: "category", component: CategoryListComponent },
  { path: "people", component: CharacterListComponent },
  { path: "people/page/:pageNumber", component: CharacterListComponent },
  { path: "people/:id", component: CharacterDetailsComponent },
  { path: "film", component: FilmListComponent },
  { path: "film/page/:pageNumber", component: FilmDetailsComponent },
  { path: "film/:id", component: FilmDetailsComponent },
  { path: "species", component: SpeciesListComponent },
  { path: "species/page/:pageNumber", component: SpeciesListComponent },
  { path: "species/:id", component: SpeciesDetailsComponent },
  { path: "starships", component: StarshipListComponent },
  { path: "starships/page/:pageNumber", component: StarshipListComponent },
  { path: "starships/:id", component: StarshipDetailsComponent },
  { path: "vehicles", component: VehicleListComponent },
  { path: "vehicles/page/:pageNumber", component: VehicleListComponent },
  { path: "vehicles/:id", component: VehicleDetailsComponent },
  { path: "planets", component: PlanetListComponent },
  { path: "planets/page/:pageNumber", component: PlanetListComponent },
  { path: "planets/:id", component: PlanetDetailsComponent },
  { path: "**", redirectTo: "/", pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]

})
export class AppRouteModule { }