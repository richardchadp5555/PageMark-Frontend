// Proyecto: PageMark
// Archivo: avatar.component.ts
// Descripción: Componente que muestra el nombre de usuario y gestiona el logout.
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const usuario = this.authService.getUsuarioActual();
    if (usuario) {
      this.username = usuario.username;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
