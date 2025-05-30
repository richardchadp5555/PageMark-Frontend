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
  // Información del libro obtenido desde Google Books API
  libro: any = null;

  // Control de página actual y total de páginas (si el libro está en estado "LEYENDO")
  paginaInput: number = 0;
  totalPaginas: number | null = null;

  // Si el libro ya ha sido guardado por el usuario
  libroGuardado: any = null;

  // Mensajes informativos y estado de carga
  mensaje: string = '';
  isLoading = true;
  error = '';

  // Reseñas públicas y del usuario actual
  resenasLibro: Resena[] = [];
  resenaExistente: Resena | null = null;

  // Información del usuario autenticado
  idUsuario: string = '';
  username: string = '';

  constructor(
    private route: ActivatedRoute,
    private librosService: LibrosService,
    private resenasService: ResenasService
  ) {}

  // Al iniciar la vista
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    // Obtener detalles del libro desde Google Books API
    this.librosService.obtenerDetallesDesdeGoogle(id).subscribe({
      next: (data) => {
        this.libro = data;
        this.isLoading = false;

        this.inicializarUsuario();         // 🔐 Extraer usuario del localStorage
        this.cargarLibroGuardado();        // 📖 Cargar información si el libro ya está en la lista
        this.cargarResenasIniciales();     // ⭐ Mostrar reseñas públicas del libro
      },
      error: () => {
        this.error = 'Error al cargar los detalles del libro.';
        this.isLoading = false;
      }
    });
  }

  // Obtiene el usuario actual desde localStorage
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
      error: () => {
        this.libroGuardado = null;
      }
    });
  }

  // Carga las reseñas públicas de otros usuarios sobre este libro
  private cargarResenasIniciales(): void {
    this.resenasService.obtenerResenasPorGoogleBookId(this.libro.id).subscribe(resenas => {
      this.resenasLibro = resenas;
    });
  }

  // Vuelve a cargar las reseñas tras publicar o editar una
  refrescarResenas(): void {
    this.cargarResenasIniciales();

    this.resenasService.obtenerResenasPorUsuario(this.idUsuario).subscribe(resenas => {
      const yaTiene = resenas.find(r => r.googleBookId === this.libro.id);
      this.resenaExistente = yaTiene || null;
    });
  }

  // Añade un libro a la lista del usuario con un estado inicial
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

  // Elimina un libro de la lista del usuario
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

  // Cambia el estado de un libro guardado (por ejemplo de QUIERO_LEER a LEIDO)
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

  // Actualiza la página actual de lectura de un libro en estado "LEYENDO"
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

  // Refresca los datos del libro guardado tras una acción como guardar, cambiar estado o página
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
