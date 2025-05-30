// Proyecto: PageMark
// Archivo: libro-mongo.interface.ts
// Descripción: Define la estructura de un libro guardado en MongoDB.
// Autor: Richard Chadwick Plaza - 2º DAM

export interface LibroMongo {
  id: string;
  googleBookId: string;
  titulo: string;
  autor: string;
  imagen: string;
  estado: 'QUIERO_LEER' | 'LEYENDO' | 'LEIDO';
  pagina?: number;
  totalPaginas?: number;
  username: string;
}
