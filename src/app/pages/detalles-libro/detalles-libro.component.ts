// Proyecto: PageMark
// Archivo: detalles-libro.component.ts
// Descripción: Vista de detalles de un libro consultando directamente a Google Books API.
//              Permite al usuario guardar libros en su lista, actualizar el estado o página de lectura,
//              y dejar/ver reseñas públicas.
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
  libro: any = null; // Libro desde Google Books API
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
    if (!id) return;

    this.librosService.obtenerDetallesDesdeGoogle(id).subscribe({
      next: (data) => {
        this.libro = data;
        this.isLoading = false;

        this.inicializarUsuario();
        this.cargarLibroGuardado();
        this.cargarResenasIniciales();
      },
      error: () => {
        this.error = 'Error al cargar los detalles del libro.';
        this.isLoading = false;
      }
    });
  }

  // Extrae el usuario del localStorage
  private inicializarUsuario(): void {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) return;

    const user = JSON.parse(usuario);
    this.username = user.username;
    this.idUsuario = user.idUsuario;
  }

 // Carga la información del libro si el usuario ya lo tiene guardado
private cargarLibroGuardado(): void {
  if (!this.username || !this.libro?.id) return;

  this.librosService.obtenerLibroGuardado(this.username, this.libro.id).subscribe({
    next: (guardado) => {
      this.libroGuardado = guardado;
      this.paginaInput = guardado?.pagina || 0;
      this.totalPaginas = this.libro.volumeInfo?.pageCount || null;

      // Verificar si ya ha hecho una reseña sobre este libro
      this.resenasService.obtenerResenasPorUsuario(this.idUsuario).subscribe(resenas => {
        const yaTiene = resenas.find(r => r.googleBookId === this.libro.id);
        this.resenaExistente = yaTiene || null;
      });
    },
    error: (err) => {
      if (err.status === 404) {
        // No pasa nada si el libro aún no está guardado
        this.libroGuardado = null;
      } else {
        console.error('❌ Error real al cargar libro guardado:', err);
      }
    }
  });
}

  // Carga reseñas públicas de otros usuarios
  private cargarResenasIniciales(): void {
    this.resenasService.obtenerResenasPorGoogleBookId(this.libro.id).subscribe(resenas => {
      this.resenasLibro = resenas;
    });
  }

  // Refresca todas las reseñas (tras publicar o editar)
  refrescarResenas(): void {
    this.cargarResenasIniciales();

    this.resenasService.obtenerResenasPorUsuario(this.idUsuario).subscribe(resenas => {
      const yaTiene = resenas.find(r => r.googleBookId === this.libro.id);
      this.resenaExistente = yaTiene || null;
    });
  }

  // Guarda el libro con el estado inicial seleccionado
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
      next: (guardado) => {
        this.mensaje = `Libro añadido a tu lista de ${estado.toLowerCase().replace('_', ' ')}.`;
        this.libroGuardado = guardado;
        this.paginaInput = guardado?.pagina || 0;
        this.totalPaginas = this.libro.volumeInfo?.pageCount || null;

        // Verifica si ya ha hecho una reseña
        this.resenasService.obtenerResenasPorUsuario(this.idUsuario).subscribe(resenas => {
          const yaTiene = resenas.find(r => r.googleBookId === this.libro.id);
          this.resenaExistente = yaTiene || null;
        });
      },
      error: (err) => {
        this.mensaje = err.status === 409
          ? 'Este libro ya está guardado en tu lista.'
          : 'Error al guardar el libro.';
      }
    });
  }

  // Elimina el libro de la lista del usuario
  // Elimina el libro de la lista del usuario usando su ID de Mongo
eliminarLibro(): void {
  if (!this.libroGuardado?.id) {
    this.mensaje = 'No se puede eliminar el libro. ID no disponible.';
    return;
  }

  this.librosService.eliminarLibroPorId(this.libroGuardado.id).subscribe({
    next: () => {
      this.mensaje = '✅ Libro eliminado de tu lista.';
      this.libroGuardado = null;
      this.paginaInput = 0;
    },
    error: (err) => {
      console.error('❌ Error al eliminar el libro:', err);
      alert(`⚠️ Error al eliminar el libro: ${err.error}`);
      this.mensaje = 'Error al eliminar el libro.';
    }
  });
}


  // Cambia el estado del libro guardado
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

  // Actualiza el número de página actual (solo si el estado es LEYENDO)
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

  // Refresca el libro guardado tras un cambio
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
}
