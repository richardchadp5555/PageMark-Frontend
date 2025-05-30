// Proyecto: PageMark
// Archivo: admin.component.ts
// Descripción: Vista de administración para gestionar usuarios, libros y reseñas en formato tabla por estado.
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { LibrosService } from 'src/app/services/libros.service';
import { ResenasService } from 'src/app/services/resenas.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public Math = Math;

  usuarios: any[] = [];
  usuarioSeleccionado: any = null;

  cargando: boolean = true;
  error: string | null = null;

  formularioEdicion: any = {
    username: '',
    email: '',
    password: '',
    rol: ''
  };

  // Libros por estado
  librosQuieroLeer: any[] = [];
  librosLeyendo: any[] = [];
  librosLeido: any[] = [];
  viendoLibros: boolean = false;

  // Reseñas
  resenasUsuario: any[] = [];
  viendoResenas: boolean = false;

  constructor(
    private adminService: AdminService,
    private librosService: LibrosService,
    private resenasService: ResenasService
  ) {}

  ngOnInit(): void {
    this.adminService.obtenerUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar los usuarios';
        this.cargando = false;
      }
    });
  }

  seleccionarUsuario(usuario: any): void {
    this.usuarioSeleccionado = usuario;
    this.formularioEdicion = {
      username: usuario.username,
      email: usuario.email,
      password: '',
      rol: usuario.rol
    };
    this.viendoLibros = false;
    this.viendoResenas = false;
  }

  guardarCambios(): void {
    const id = this.usuarioSeleccionado.id;

    this.adminService.actualizarUsuario(id, this.formularioEdicion).subscribe({
      next: () => {
        alert('Usuario actualizado correctamente');
        this.ngOnInit();
      },
      error: () => {
        alert('Error al actualizar usuario');
      }
    });
  }

  verLibrosGuardados(): void {
    if (!this.usuarioSeleccionado) return;

    this.viendoLibros = true;
    this.viendoResenas = false;

    const username = this.usuarioSeleccionado.username;

    this.librosService.obtenerLibrosPorEstado(username, 'QUIERO_LEER').subscribe({
      next: res => this.librosQuieroLeer = res,
      error: () => this.librosQuieroLeer = []
    });

    this.librosService.obtenerLibrosPorEstado(username, 'LEYENDO').subscribe({
      next: res => this.librosLeyendo = res,
      error: () => this.librosLeyendo = []
    });

    this.librosService.obtenerLibrosPorEstado(username, 'LEIDO').subscribe({
      next: res => this.librosLeido = res,
      error: () => this.librosLeido = []
    });
  }
  
  // Obtener las reseñas de un usuario por su username
  verResenasUsuario(): void {
    if (!this.usuarioSeleccionado) return;
  
    this.viendoResenas = true;
    this.viendoLibros = false;
    this.resenasUsuario = [];
  
    const username = this.usuarioSeleccionado.username;
  
    console.log('🟢 Buscando reseñas por username:', username);
  
    this.resenasService.obtenerResenasPorUsername(username).subscribe({
      next: (resenas) => {
        console.log('📦 Reseñas recibidas:', resenas);
  
        resenas.forEach(resena => {
          this.librosService.obtenerDetallesDesdeGoogle(resena.googleBookId!).subscribe({
            next: (detalleLibro: any) => {
              const titulo = detalleLibro.volumeInfo?.title || 'Título desconocido';
              const imagen = detalleLibro.volumeInfo?.imageLinks?.thumbnail || '';
  
              this.resenasUsuario.push({
                ...resena,
                titulo,
                imagen
              });
            },
            error: () => {
              this.resenasUsuario.push({
                ...resena,
                titulo: 'Error al cargar título',
                imagen: ''
              });
            }
          });
        });
      },
      error: (err) => {
        console.error('❌ Error al obtener reseñas:', err);
      }
    });
  }  

  
  
  
}
