import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
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
