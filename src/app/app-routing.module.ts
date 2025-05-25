import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './shared/layout/layout.component';
import { Error404PageComponent } from './shared/error404-page/error404-page.component';

import { InicioComponent } from './pages/inicio/inicio.component';
import { BuscarLibrosComponent } from './pages/buscar-libros/buscar-libros/buscar-libros.component';
import { MisLibrosComponent } from './pages/mis-libros/mis-libros.component';
import { DetallesLibroComponent } from './pages/detalles-libro/detalles-libro.component';
import { ResenasComponent } from './pages/resenas/resenas.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';

const routes: Routes = [
  // 👉 Ruta raíz redirige al login
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  // 👉 Rutas del módulo de autenticación
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule)
  },

  // 👉 Rutas protegidas con Layout
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'buscar', component: BuscarLibrosComponent },
      { path: 'mis-libros', component: MisLibrosComponent },
      { path: 'detalles-libro/:id', component: DetallesLibroComponent },
      { path: 'resenas', component: ResenasComponent },
      { path: 'noticias', component: NoticiasComponent }
    ]
  },

  // 👉 Página 404
  {
    path: '**',
    component: Error404PageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
