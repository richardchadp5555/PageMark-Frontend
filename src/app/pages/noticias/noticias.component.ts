// components/noticias/noticias.component.ts

import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../interfaces/noticia.interface';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  isLoading = true;
  error = false;

  constructor(private noticiaService: NoticiasService) {}

  ngOnInit(): void {
    this.noticiaService.obtenerNoticias().subscribe({
      next: (res) => {
        this.noticias = res.slice(0, 40);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar noticias', err);
        this.error = true;
        this.isLoading = false;
      }
    });
  }
}
