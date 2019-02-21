import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import{MatToolbarModule, MatButtonModule,
    MatInputModule, MatFormFieldModule,
    MatIconModule, MatListModule} from '@angular/material'

const MODULES = [
  FlexLayoutModule,
  MatToolbarModule, MatButtonModule,
  MatInputModule, MatFormFieldModule,
  MatIconModule, MatListModule
]

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class MaterialModule { }