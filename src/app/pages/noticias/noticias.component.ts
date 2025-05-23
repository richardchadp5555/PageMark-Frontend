
import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../interfaces/noticia.interface';
import { NoticiaService } from '../../services/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  isLoading = true;
  error = false;

  constructor(private noticiaService: NoticiaService) {}

  ngOnInit(): void {
    this.noticiaService.obtenerNoticias().subscribe({
      next: (res) => {
        this.noticias = res;
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