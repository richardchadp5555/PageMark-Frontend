import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaUsuariosComponent } from './busqueda-usuarios.component';

describe('BusquedaUsuariosComponent', () => {
  let component: BusquedaUsuariosComponent;
  let fixture: ComponentFixture<BusquedaUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaUsuariosComponent]
    });
    fixture = TestBed.createComponent(BusquedaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
