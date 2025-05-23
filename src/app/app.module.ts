import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'; // ← SOLUCIÓN PRINCIPAL

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InicioComponent } from './pages/inicio/inicio.component';
import { MisLibrosComponent } from './pages/mis-libros/mis-libros.component';
import { DetallesLibroComponent } from './pages/detalles-libro/detalles-libro.component';
import { ResenasComponent } from './pages/resenas/resenas.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';

import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MisLibrosComponent,
    DetallesLibroComponent,
    ResenasComponent,
    // ❌ No declares SearchBarComponent ni BuscarLibrosComponent aquí si están en PagesModule
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,          // ← NECESARIO para que <router-outlet> funcione
    AppRoutingModule,
    SharedModule,
    PagesModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
