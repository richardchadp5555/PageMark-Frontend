// Proyecto: PageMark
// Archivo: inicio.component.ts
// Descripción: Página de inicio con saludo personalizado.
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  username: string = '';
  saludo: string = '';

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.username = JSON.parse(usuario).username;
    }

    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) {
      this.saludo = 'Buenos días';
    } else if (hora >= 12 && hora < 20) {
      this.saludo = 'Buenas tardes';
    } else {
      this.saludo = 'Buenas noches';
    }
  }
}
