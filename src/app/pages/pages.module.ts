// Proyecto: PageMark
// Archivo: pages.module.ts
// Descripción: Módulo de páginas principales (inicio, buscar, mis libros, detalles, reseñas, noticias)
// Autor: Richard Chadwick Plaza - 2º DAM

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

// Componentes de páginas
import { InicioComponent } from './inicio/inicio.component';
import { MisLibrosComponent } from './mis-libros/mis-libros.component';
import { DetallesLibroComponent } from './detalles-libro/detalles-libro.component';
import { ResenaFormComponent } from './detalles-libro/resena-form/resena-form.component';
import { NoticiasComponent } from './noticias/noticias.component';

// Componentes de buscar-libros
import { BuscarLibrosComponent } from './buscar-libros/buscar-libros/buscar-libros.component';
import { SearchBarComponent } from './buscar-libros/search-bar/search-bar.component';
import { LibrosPopularesComponent } from './buscar-libros/libros-populares/libros-populares.component';
import { FeedActividadComponent } from './inicio/feed-actividad/feed-actividad.component';
import { AdminComponent } from './admin/admin.component';
import { SelectorUsuarioComponent } from './admin/selector-usuario/selector-usuario.component';
import { PerfilUserComponent } from './perfil-user/perfil-user.component';
import { BusquedaUsuariosComponent } from './perfil-user/busqueda-usuarios/busqueda-usuarios.component';
import { ListaAmigosComponent } from './perfil-user/lista-amigos/lista-amigos.component';
import { ListaSeguidoresComponent } from './perfil-user/lista-seguidores/lista-seguidores.component';
import { FeedPersonalComponent } from './perfil-user/feed-personal/feed-personal.component';




@NgModule({
  declarations: [
    InicioComponent,
    MisLibrosComponent,
    DetallesLibroComponent,
    ResenaFormComponent,
    NoticiasComponent,
    BuscarLibrosComponent,
    SearchBarComponent,
    LibrosPopularesComponent,
    FeedActividadComponent,
    AdminComponent,
    SelectorUsuarioComponent,
    PerfilUserComponent,
    BusquedaUsuariosComponent,
    ListaAmigosComponent,
    ListaSeguidoresComponent,
    FeedPersonalComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ]
})
export class PagesModule { }
