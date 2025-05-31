// Proyecto: PageMark
// Archivo: usuario-resumen.interface.ts
// Descripción: Interfaz para representar un usuario básico (para búsqueda, seguidores, etc.)
// Autor: Richard Chadwick Plaza - 2º DAM

export interface UsuarioResumen {
    id: string;
    username: string;
    email?: string;
    avatarUrl?: string; // opcional, por si se quiere mostrar un avatar más adelante
  }
  