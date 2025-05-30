// Proyecto: PageMark
// Archivo: libro-google.interface.ts
// Descripción: Define la estructura de los libros devueltos por Google Books API.
// Autor: Richard Chadwick Plaza - 2º DAM

export interface LibroGoogle {
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      description?: string;
      imageLinks?: {
        thumbnail?: string;
      };
    };
  }
  
  export interface ResultadoBusqueda {
    items: LibroGoogle[];
    totalItems: number;
  }
  