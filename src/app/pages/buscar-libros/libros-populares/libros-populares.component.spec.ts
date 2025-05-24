import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosPopularesComponent } from './libros-populares.component';

describe('LibrosPopularesComponent', () => {
  let component: LibrosPopularesComponent;
  let fixture: ComponentFixture<LibrosPopularesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibrosPopularesComponent]
    });
    fixture = TestBed.createComponent(LibrosPopularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
