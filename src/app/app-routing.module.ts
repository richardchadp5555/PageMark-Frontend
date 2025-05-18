import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './shared/layout/layout.component';
import { Error404PageComponent } from './shared/error404-page/error404-page.component';

import { InicioComponent } from './pages/inicio/inicio.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { MisLibrosComponent } from './pages/mis-libros/mis-libros.component';
import { DetallesLibroComponent } from './pages/detalles-libro/detalles-libro.component';
import { ResenasComponent } from './pages/resenas/resenas.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'buscar', component: BuscarComponent },
      { path: 'mis-libros', component: MisLibrosComponent },
      { path: 'detalles-libro', component: DetallesLibroComponent },
      { path: 'resenas', component: ResenasComponent },
      { path: 'noticias', component: NoticiasComponent }
    ]
  },
  { path: '**', component: Error404PageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
