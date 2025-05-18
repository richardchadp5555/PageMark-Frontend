import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  librosPopulares = [
    { titulo: 'Libro 1', autores: ['Autor 1'], imagen: 'https://via.placeholder.com/150x200' },
    { titulo: 'Libro 2', autores: ['Autor 2'], imagen: 'https://via.placeholder.com/150x200' },
    { titulo: 'Libro 3', autores: ['Autor 3'], imagen: 'https://via.placeholder.com/150x200' },
  ];

  resenasRecientes = [
    { username: 'richard', fecha: new Date(), comentario: 'Muy buen libro, lo recomiendo.' },
    { username: 'belinda', fecha: new Date(), comentario: 'Una historia intensa y conmovedora.' },
  ];
}
