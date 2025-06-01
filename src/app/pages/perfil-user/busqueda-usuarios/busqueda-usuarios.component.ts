// Proyecto: PageMark
// Archivo: busqueda-usuarios.component.ts
// Descripción: Componente para buscar usuarios por nombre (barra + resultados)
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busqueda-usuarios',
  templateUrl: './busqueda-usuarios.component.html',
  styleUrls: ['./busqueda-usuarios.component.scss']
})
export class BusquedaUsuariosComponent {
  searchInput = new FormControl('');
  usuarios: any[] = [];
  buscado = false;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  onSearch(): void {
    const query = this.searchInput.value?.trim();
    if (!query) return;

    this.usuariosService.buscarUsuarios(query).subscribe({
      next: (data) => {
        this.usuarios = data;
        this.buscado = true;
      },
      error: () => {
        this.usuarios = [];
        this.buscado = true;
      }
    });
  }

  verPerfil(username: string): void {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/perfil-user', username]);
  });
}



}
