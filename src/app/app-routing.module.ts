import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './shared/layout/layout.component';
import { Error404PageComponent } from './shared/error404-page/error404-page.component';

import { InicioComponent } from './pages/inicio/inicio.component';
import { BuscarLibrosComponent } from './pages/buscar-libros/buscar-libros/buscar-libros.component';
import { DetallesLibroComponent } from './pages/detalles-libro/detalles-libro.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { PerfilUserComponent } from './pages/perfil-user/perfil-user.component';

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
      { path: 'buscar-libros', component: BuscarLibrosComponent },
      { path: 'detalles-libro/:id', component: DetallesLibroComponent },
      { path: 'noticias', component: NoticiasComponent },
      { path: 'perfil-user/:username', component: PerfilUserComponent,  runGuardsAndResolvers: 'always' },
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] }
    ]
  },

  // 👉 Página 404
  {
    path: '**',
    component: Error404PageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
