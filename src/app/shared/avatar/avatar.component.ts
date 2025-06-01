// Proyecto: PageMark
// Archivo: avatar.component.ts
// Descripción: Componente que obtiene y muestra la imagen del avatar del usuario.
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnChanges, OnDestroy {

  // Nombre del usuario del cual se mostrará el avatar (recibido por @Input)
  @Input() username: string = '';

  // URL temporal de la imagen del avatar generada a partir de un blob
  avatarUrl: string = '';

  // Referencia para revocar la URL anterior cuando se actualice
  private objectUrl: string | null = null;

  constructor(private usuariosService: UsuariosService) {}

  // Se ejecuta cada vez que cambia algún @Input() (como el username)
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['username'] && this.username) {
      this.cargarAvatar(this.username);
    }
  }

  // Método reutilizable para cargar el avatar desde el backend
  public cargarAvatar(username: string): void {
    this.usuariosService.obtenerAvatarUrl(username).subscribe({
      next: (resp) => {
        const nombreArchivo = resp.avatarUrl?.split('/').pop();

        if (nombreArchivo) {
          this.usuariosService.obtenerImagenAvatar(nombreArchivo).subscribe({
            next: (blob) => {
              // Revocamos la URL anterior si existía
              if (this.objectUrl) {
                URL.revokeObjectURL(this.objectUrl);
              }

              // Creamos nueva URL temporal
              this.objectUrl = URL.createObjectURL(blob);
              this.avatarUrl = this.objectUrl;
            },
            error: () => {
              this.avatarUrl = '';
            }
          });
        }
      },
      error: () => {
        this.avatarUrl = '';
      }
    });
  }

  // Limpieza al destruir el componente
  ngOnDestroy(): void {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
    }
  }
}
