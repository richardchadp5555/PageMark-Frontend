// Proyecto: PageMark
// Archivo: libro-detalles.interface.ts
// Descripción: Representa los detalles completos de un libro desde Google Books API
// Autor: Richard Chadwick Plaza - 2º DAM

export interface LibroDetalles {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    pageCount?: number;
  };
}
