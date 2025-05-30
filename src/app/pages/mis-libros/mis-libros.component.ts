// Proyecto: PageMark
// Archivo: mis-libros.component.ts
// Descripción: Muestra los libros del usuario agrupados por estado: "QUIERO_LEER", "LEYENDO" y "LEIDO"
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, OnInit } from '@angular/core';
import { LibrosService } from 'src/app/services/libros.service';
import { LibroMongo } from 'src/app/interfaces/libro-mongo.interface';


@Component({
  selector: 'app-mis-libros',
  templateUrl: './mis-libros.component.html',
  styleUrls: ['./mis-libros.component.scss']
})
export class MisLibrosComponent implements OnInit {
  // Listas separadas de libros según su estado de lectura
  quieroLeer: LibroMongo[] = [];
  leyendo: LibroMongo[] = [];
  leido: LibroMongo[] = [];

  // Devuelve un mensaje motivacional en función del número de libros leídos
  get mensajeMotivacional(): string {
    const cantidad = this.leido.length;
  
    if (cantidad === 0) {
      return '';
    } else if (cantidad === 1) {
      return '📘 ¡Bravo! Has leído un libro. Ya eres más culto que el 70% de internet.';
    } else if (cantidad < 5) {
      return `📚 ¡Bien hecho! Ya llevas ${cantidad} libros... El camino hacia la Torre de Marfil ha comenzado.`;
    } else if (cantidad < 10) {
      return `📖 ${cantidad} libros leídos. Si esto fuera Hogwarts, ya tendrías puntos extra para Ravenclaw.`;
    } else if (cantidad < 20) {
      return `🏅 ${cantidad} libros... Estás tan cerca de convertirte en un sabio errante del Cosmere.`;
    } else {
      return `🧙‍♂️ ${cantidad} libros. Eres oficialmente un archivero legendario de la Biblioteca de Babel.`;
    }
  }

  // Indicador de carga mientras se obtienen los libros y mensaje de error por si falla la carga
  isLoading: boolean = true;
  error: string = '';

  constructor(private librosService: LibrosService) {}

  // Al cargar el componente
  ngOnInit(): void {
    // Compruebo que se ha iniciado sesión buscando en el local storage
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      this.error = 'No has iniciado sesión.';
      this.isLoading = false;
      return;
    }

    // Extraemos el username
    const { username } = JSON.parse(usuario);

    // Hacemos tres peticiones a la vez par aobtener los libros por estado
    Promise.all([
      this.librosService.obtenerLibrosPorEstado(username, 'QUIERO_LEER').toPromise(),
      this.librosService.obtenerLibrosPorEstado(username, 'LEYENDO').toPromise(),
      this.librosService.obtenerLibrosPorEstado(username, 'LEIDO').toPromise()
    ])
    //Se asignan los libros a sus listas
    .then(([quieroLeer, leyendo, leido]) => {
      this.quieroLeer = quieroLeer;
      this.leyendo = leyendo;
      this.leido = leido;
      this.isLoading = false;
    })
    .catch(() => {
      this.error = 'Error al cargar tus libros.';
      this.isLoading = false;
    });
  }
}
