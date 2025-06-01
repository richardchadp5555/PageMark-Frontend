// Proyecto: PageMark
// Archivo: actividad.interface.ts
// Descripción: Estructura de una entrada del feed de actividad
// Autor: Richard Chadwick Plaza - 2º DAM

export interface Actividad {
  _id?: string;
  username: string;
  tipo: 'GUARDADO' | 'CAMBIO_ESTADO' | 'RESEÑA';
  mensaje: string;
  libroId?: string;
  googleBookId?: string;
  imagen?: string;
  fecha: Date;
  titulo?: string;
  autor?: string;
}
