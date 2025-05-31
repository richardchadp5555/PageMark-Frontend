import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  esAdmin: boolean = false;
  username: string = '';

  ngOnInit() {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const userData = JSON.parse(usuario);
      this.esAdmin = userData.rol === 'ADMIN';
      this.username = userData.username;
    }
  }
  
}
