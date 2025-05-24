import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';

import { BuscarLibrosComponent } from './buscar-libros/buscar-libros/buscar-libros.component';
import { SearchBarComponent } from './buscar-libros/search-bar/search-bar.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { LibrosPopularesComponent } from './buscar-libros/libros-populares/libros-populares.component';


@NgModule({
  declarations: [
    BuscarLibrosComponent,
    SearchBarComponent,
    NoticiasComponent,
    LibrosPopularesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
  exports: []
})
export class PagesModule { }
