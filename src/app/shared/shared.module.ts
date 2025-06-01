// Proyecto: PageMark
// Archivo: shared.module.ts
// Descripción: Módulo compartido con layout, header, footer, navbar, avatar, error404
// Autor: Richard Chadwick Plaza - 2º DAM

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

// Componentes compartidos
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { Error404PageComponent } from './error404-page/error404-page.component';
import { LayoutComponent } from './layout/layout.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ActividadCardComponent } from './actividad-card/actividad-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    Error404PageComponent,
    LayoutComponent,
    AvatarComponent,
    ActividadCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    Error404PageComponent,
    AvatarComponent,
    LayoutComponent,
    ActividadCardComponent,
  ]
})
export class SharedModule { }
