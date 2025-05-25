// Proyecto: PageMark
// Archivo: resena.interface.ts
// Descripción: Representa una reseña de un usuario sobre un libro.
// Autor: Richard Chadwick Plaza - 2º DAM

export interface Resena {
  id?: string;
  idLibro: string;
  googleBookId?: string;
  idUsuario: string;
  username: string;
  comentario: string;
  puntuacion: number; // entre 1 y 5
  fecha: string;      // ISO string
}
