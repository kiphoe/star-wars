import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button'

import { AppRouteModule } from './approute.module';
import { CategoryListComponent } from './components/category-list.component';
import { CharacterListComponent } from './components/character/character-list.component';
import { CharacterDetailsComponent } from './components/character/character-details.component';
import { SWService } from 'src/SW.Service';
import { FilmListComponent } from './components/films/film-list.component';
import { FilmDetailsComponent } from './components/films/film-details.component';
import { SpeciesListComponent } from './components/species/species-list.component';
import { AddCommentComponent } from './components/comment/add-comment.component';
import { ListCommentComponent } from './components/comment/list-comment.component';
import { CommentService } from './comment.services';


@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    CharacterListComponent,
    CharacterDetailsComponent,
    FilmListComponent,
    FilmDetailsComponent,
    SpeciesListComponent,
    AddCommentComponent,
    ListCommentComponent,
 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AppRouteModule,
    MatButtonModule
  ],
  providers: [SWService, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
