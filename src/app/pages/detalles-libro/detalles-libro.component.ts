// Proyecto: PageMark
// Archivo: detalles-libro.component.ts
// Descripción: Vista de detalles de un libro consultando directamente a Google Books API
//              Permite al usuario guardar el libro en su lista personal con estado "QUIERO_LEER", "LEYENDO" o "LEIDO"
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrosService } from 'src/app/services/libros.service';

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

  constructor(
    private route: ActivatedRoute,
    private librosService: LibrosService
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
          const { username } = JSON.parse(usuario);

          this.librosService.obtenerLibroGuardado(username, this.libro.id).subscribe({
            next: (guardado) => {
              this.libroGuardado = guardado;
              this.paginaInput = guardado?.pagina || 0;
              this.totalPaginas = data.volumeInfo?.pageCount || null;


            },
            error: () => {
              this.libroGuardado = null;
            }
          });
        }
      },
      error: () => {
        this.error = 'Error al cargar los detalles del libro.';
        this.isLoading = false;
      }
    });
  }
}



  //Guarda el libro actual en la base de datos con el estado indicado ("QUIERO_LEER", "LEYENDO" o "LEIDO. Se utiliza el usuario del localStorage y se envían todos los datos relevantes del libro al backend.
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
        if (err.status === 409) {
          this.mensaje = 'Este libro ya está guardado en tu lista.';
        } else {
          this.mensaje = 'Error al guardar el libro.';
        }
      }
    });
  }

  // Método para eliminar un libro guardado por el usuario
  eliminarLibro(): void {
  if (!this.libroGuardado || !this.libroGuardado.id) {
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

// Método para cambiar el estado del libro guardado (QUIERO_LEER, LEYENDO, LEIDO)
cambiarEstado(nuevoEstado: string): void {
  if (!this.libroGuardado || !this.libroGuardado.id) {
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

// Método para actualizar la página del libro guardado
actualizarPagina(pagina: number): void {
  if (!this.libroGuardado || !this.libroGuardado.id) {
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


// Vuelve a cargar el libro guardado desde la base de datos
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
