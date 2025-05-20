import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';
import { BuscarLibrosComponent } from './buscar-libros/buscar-libros/buscar-libros.component';
import { SearchBarComponent } from './buscar-libros/search-bar/search-bar.component';
BuscarLibrosComponent

@NgModule({
  declarations: [
    BuscarLibrosComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
  ]
})
export class PagesModule { }
