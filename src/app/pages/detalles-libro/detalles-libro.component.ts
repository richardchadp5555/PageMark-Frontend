// Proyecto: PageMark
// Archivo: detalles-libro.component.ts
// Descripción: Vista de detalles de un libro consultando directamente a Google Books API
//              Permite al usuario guardar el libro en su lista personal con estado "QUIERO_LEER", "LEYENDO" o "LEIDO"
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrosService } from 'src/app/services/libros.service';
import { ResenasService } from 'src/app/services/resenas.service';
import { Resena } from 'src/app/interfaces/resena.interface';

@Component({
  selector: 'app-detalles-libro',
  templateUrl: './detalles-libro.component.html',
  styleUrls: ['./detalles-libro.component.scss']
})
export class DetallesLibroComponent implements OnInit {
  libro: any = null;
  paginaInput: number = 0;
  totalPaginas: number | null = null;
  libroGuardado: any = null;
  mensaje: string = '';
  isLoading = true;
  error = '';
  resenasLibro: Resena[] = [];

  resenaExistente: Resena | null = null;
  idUsuario: string = '';
  username: string = '';

  constructor(
    private route: ActivatedRoute,
    private librosService: LibrosService,
    private resenasService: ResenasService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.librosService.obtenerDetallesDesdeGoogle(id).subscribe({
        next: (data) => {
          this.libro = data;
          this.isLoading = false;

          const usuario = localStorage.getItem('usuario');
          if (usuario) {
            const user = JSON.parse(usuario);
            this.username = user.username;
            this.idUsuario = user.idUsuario;

            // Cargar libro guardado (si existe)
            this.librosService.obtenerLibroGuardado(this.username, this.libro.id).subscribe({
              next: (guardado) => {
                this.libroGuardado = guardado;
                this.paginaInput = guardado?.pagina || 0;
                this.totalPaginas = data.volumeInfo?.pageCount || null;

                // Comprobar si ya tiene reseña
                this.resenasService.obtenerResenasPorUsuario(this.idUsuario).subscribe(resenas => {
                  const yaTiene = resenas.find(r => r.googleBookId === this.libro.id);
                  this.resenaExistente = yaTiene || null;
                });
              },
              error: () => {
                this.libroGuardado = null;
              }
            });
          }

          // Cargar reseñas públicas del libro por googleBookId
          this.resenasService.obtenerResenasPorGoogleBookId(this.libro.id).subscribe(resenas => {
            this.resenasLibro = resenas;
          });
        },
        error: () => {
          this.error = 'Error al cargar los detalles del libro.';
          this.isLoading = false;
        }
      });
    }
  }

  guardarLibro(estado: string): void {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      this.mensaje = 'Debes iniciar sesión para guardar libros.';
      return;
    }

    const { username } = JSON.parse(usuario);

    const nuevoLibro = {
      googleBookId: this.libro.id,
      titulo: this.libro.volumeInfo?.title || '',
      autor: this.libro.volumeInfo?.authors?.join(', ') || 'Autor desconocido',
      imagen: this.libro.volumeInfo?.imageLinks?.thumbnail || '',
      descripcion: this.libro.volumeInfo?.description || '',
      username: username,
      estado: estado
    };

    this.librosService.guardarLibro(nuevoLibro).subscribe({
      next: () => {
        this.mensaje = `Libro añadido a tu lista de ${estado.toLowerCase().replace('_', ' ')}.`;
        this.recargarLibroGuardado();
      },
      error: (err) => {
        this.mensaje = err.status === 409
          ? 'Este libro ya está guardado en tu lista.'
          : 'Error al guardar el libro.';
      }
    });
  }

  eliminarLibro(): void {
    if (!this.libroGuardado?.id) {
      this.mensaje = 'No se puede eliminar el libro. ID no disponible.';
      return;
    }

    this.librosService.eliminarLibro(this.libroGuardado.id).subscribe({
      next: () => {
        this.mensaje = 'Libro eliminado de tu lista.';
        this.libroGuardado = null;
        this.paginaInput = 0;
      },
      error: () => {
        this.mensaje = 'Error al eliminar el libro.';
      }
    });
  }

  cambiarEstado(nuevoEstado: string): void {
    if (!this.libroGuardado?.id) {
      this.mensaje = 'No se puede cambiar el estado. ID no disponible.';
      return;
    }

    this.librosService.actualizarEstadoLibro(this.libroGuardado.id, nuevoEstado).subscribe({
      next: () => {
        this.mensaje = `Estado actualizado a ${nuevoEstado.toLowerCase().replace('_', ' ')}.`;
        this.recargarLibroGuardado();
      },
      error: () => {
        this.mensaje = 'Error al actualizar el estado.';
      }
    });
  }

  actualizarPagina(pagina: number): void {
    if (!this.libroGuardado?.id) {
      this.mensaje = 'No se puede actualizar la página. ID no disponible.';
      return;
    }

    this.librosService.actualizarPagina(this.libroGuardado.id, pagina).subscribe({
      next: () => {
        this.mensaje = `Página actualizada a ${pagina}.`;
        this.recargarLibroGuardado();
      },
      error: () => {
        this.mensaje = 'Error al actualizar la página.';
      }
    });
  }

  private recargarLibroGuardado(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario && this.libro?.id) {
      const { username } = JSON.parse(usuario);
      this.librosService.obtenerLibroGuardado(username, this.libro.id).subscribe({
        next: (guardado) => {
          this.libroGuardado = guardado;
          this.paginaInput = guardado?.pagina || 0;
        }
      });
    }
  }


  refrescarResenas(): void {
  // Actualizar lista de reseñas públicas
  this.resenasService.obtenerResenasPorGoogleBookId(this.libro.id).subscribe(resenas => {
    this.resenasLibro = resenas;
  });

  // Volver a comprobar si el usuario tiene ya una reseña (oculta el form)
  this.resenasService.obtenerResenasPorUsuario(this.idUsuario).subscribe(resenas => {
    const yaTiene = resenas.find(r => r.googleBookId === this.libro.id);
    this.resenaExistente = yaTiene || null;
  });
}

}
