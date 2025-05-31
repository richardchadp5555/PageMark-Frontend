// Proyecto: PageMark
// Archivo: perfil-user.component.ts
// Descripción: Componente del perfil de usuario. Muestra libros por estado, relaciones y feed de actividad.
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrosService } from 'src/app/services/libros.service';
import { LibroMongo } from 'src/app/interfaces/libro-mongo.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.scss']
})
export class PerfilUserComponent implements OnInit {
  username: string = '';
  usernameLogueado: string = '';
  esMiPerfil: boolean = false;
  avatarUrl: string = '';


  librosQuieroLeer: LibroMongo[] = [];
  librosLeyendo: LibroMongo[] = [];
  librosLeido: LibroMongo[] = [];
  displayedColumns: string[] = ['imagen', 'titulo', 'autor'];

  
  

  constructor(
    private route: ActivatedRoute,
    private librosService: LibrosService,
    private authService: AuthService,
    private usuariosService: UsuariosService
  ) {}

  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') || '';

      const usuario = localStorage.getItem('usuario');
      if (usuario) {
        const { username } = JSON.parse(usuario);
        this.usernameLogueado = username;
        this.esMiPerfil = this.username === this.usernameLogueado;
      }

      this.cargarLibrosPorEstado();

    });

    this.usuariosService.obtenerAvatarUrl(this.username).subscribe({
      next: (resp) => {
        this.avatarUrl = resp.avatarUrl || '';
      },
      error: () => {
        this.avatarUrl = '';
      }
    });
    
  }

  subirImagen(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
  
    const archivo = input.files[0];
    const formData = new FormData();
    formData.append('archivo', archivo);
  
    this.usuariosService.subirAvatar(this.username, formData).subscribe({
      next: (url) => {
        this.avatarUrl = url;
      },
      error: (err) => {
        console.error('Error al subir avatar:', err);
        alert('Error al subir la imagen.');
      }
    });
  }
  

  cargarLibrosPorEstado(): void {
    this.librosService.obtenerLibrosPorEstado(this.username, 'QUIERO_LEER').subscribe({
      next: libros => this.librosQuieroLeer = libros,
      error: () => this.librosQuieroLeer = []
    });

    this.librosService.obtenerLibrosPorEstado(this.username, 'LEYENDO').subscribe({
      next: libros => this.librosLeyendo = libros,
      error: () => this.librosLeyendo = []
    });

    this.librosService.obtenerLibrosPorEstado(this.username, 'LEIDO').subscribe({
      next: libros => this.librosLeido = libros,
      error: () => this.librosLeido = []
    });
  }
}
