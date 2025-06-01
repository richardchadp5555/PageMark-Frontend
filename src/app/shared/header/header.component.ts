import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Nombre del usuario autenticado
  username: string = '';

  // Indica si el usuario está autenticado
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Obtenemos el usuario actual al iniciar el componente
    const usuario = this.authService.getUsuarioActual();
    if (usuario) {
      this.username = usuario.username;
      this.isAuthenticated = true;
    }
  }



}
