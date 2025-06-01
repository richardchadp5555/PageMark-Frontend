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
  usuarioActual: string = '';
  esMiPerfil: boolean = false;

  librosQuieroLeer: LibroMongo[] = [];
  librosLeyendo: LibroMongo[] = [];
  librosLeido: LibroMongo[] = [];

  avatarVisible = true; // ⚡ bandera para forzar recreación del avatar

  displayedColumns: string[] = ['imagen', 'titulo', 'autor'];

  get mensajeMotivacional(): string {
    const cantidad = this.librosLeido.length;
    if (cantidad === 0) return '';
    if (cantidad === 1) return '📘 ¡Bravo! Has leído un libro. Ya eres más culto que el 70% de internet.';
    if (cantidad < 5) return `📚 ¡Bien hecho! Ya llevas ${cantidad} libros... El camino hacia la Torre de Marfil ha comenzado.`;
    if (cantidad < 10) return `📖 ${cantidad} libros leídos. Si esto fuera Hogwarts, ya tendrías puntos extra para Ravenclaw.`;
    if (cantidad < 20) return `🏅 ${cantidad} libros leídos... Estás tan cerca de convertirte en un sabio errante del Cosmere.`;
    return `🧙‍♂️ ${cantidad} libros leídos. Eres oficialmente un archivero legendario de la Biblioteca de Babel.`;
  }

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
      this.cargarPerfil();
    });
  }

  cargarPerfil(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const { username } = JSON.parse(usuario);
      this.usuarioActual = username;
      this.esMiPerfil = this.username === this.usuarioActual;
    }

    this.cargarLibrosPorEstado();

    //  Forzar recreación del avatar para que se actualice al cambiar de perfil
    this.avatarVisible = false;
    setTimeout(() => {
      this.avatarVisible = true;
    }, 0);
  }

  subirImagen(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const archivo = input.files[0];
    const formData = new FormData();
    formData.append('archivo', archivo);

    this.usuariosService.subirAvatar(this.username, formData).subscribe({
      next: () => window.location.reload(),
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

  abrirSelectorImagen(input: HTMLInputElement): void {
  input.click(); // 🟢 Fuerza la apertura del input file
}

}
