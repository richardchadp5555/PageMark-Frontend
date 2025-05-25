import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenaFormComponent } from './resena-form.component';

describe('ResenaFormComponent', () => {
  let component: ResenaFormComponent;
  let fixture: ComponentFixture<ResenaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResenaFormComponent]
    });
    fixture = TestBed.createComponent(ResenaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
