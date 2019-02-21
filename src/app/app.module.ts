import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';

import { AppRouteModule } from './approute.module';
import { CategoryListComponent } from './components/category-list.component';
import { CharacterListComponent } from './components/character-list.component';
import { CharacterDetailsComponent } from './components/character-details.component';
import { SWService } from 'src/SW.Service';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    CharacterListComponent,
    CharacterDetailsComponent,
 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AppRouteModule
  ],
  providers: [SWService],
  bootstrap: [AppComponent]
})
export class AppModule { }
