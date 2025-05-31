// Proyecto: PageMark
// Archivo: avatar.component.ts
// Descripción: Muestra el avatar del usuario (si lo tiene) y redirige a su perfil
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  username: string = '';
  avatarUrl: string = '';

  constructor(
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.getUsuarioActual();
    if (usuario) {
      this.username = usuario.username;

      // Petición al backend para obtener avatar URL
      this.usuariosService.obtenerAvatarUrl(this.username).subscribe({
        next: (resp: { avatarUrl: string }) => {
          this.avatarUrl = resp.avatarUrl || '';
        },
        error: () => {
          this.avatarUrl = '';
        }
      });
      
    }
  }

  irAlPerfil(): void {
    this.router.navigate(['/perfil-user', this.username]);
  }
}
