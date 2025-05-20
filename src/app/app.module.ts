import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { InicioComponent } from './pages/inicio/inicio.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { MisLibrosComponent } from './pages/mis-libros/mis-libros.component';
import { DetallesLibroComponent } from './pages/detalles-libro/detalles-libro.component';
import { ResenasComponent } from './pages/resenas/resenas.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { HttpClientModule } from '@angular/common/http';


import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { SearchBarComponent } from './pages/buscar-libros/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    BuscarComponent,
    MisLibrosComponent,
    DetallesLibroComponent,
    ResenasComponent,
    NoticiasComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
