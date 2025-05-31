import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSeguidoresComponent } from './lista-seguidores.component';

describe('ListaSeguidoresComponent', () => {
  let component: ListaSeguidoresComponent;
  let fixture: ComponentFixture<ListaSeguidoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaSeguidoresComponent]
    });
    fixture = TestBed.createComponent(ListaSeguidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
