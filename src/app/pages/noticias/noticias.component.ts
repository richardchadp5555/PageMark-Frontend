import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Noticia } from 'src/app/interfaces/noticia.interface';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];

  constructor(private noticiasService: NoticiasService) {}

 ngOnInit(): void {
  this.noticiasService.probarZenda().subscribe({
    next: (respuesta) => console.log('✅ RESPUESTA BACKEND:', respuesta),
    error: (err) => console.error('❌ ERROR:', err)
  });
}

}
