import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenaDetalleComponent } from './resena-detalle.component';

describe('ResenaDetalleComponent', () => {
  let component: ResenaDetalleComponent;
  let fixture: ComponentFixture<ResenaDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResenaDetalleComponent]
    });
    fixture = TestBed.createComponent(ResenaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
