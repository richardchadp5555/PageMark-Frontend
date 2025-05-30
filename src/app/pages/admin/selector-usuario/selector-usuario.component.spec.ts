import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorUsuarioComponent } from './selector-usuario.component';

describe('SelectorUsuarioComponent', () => {
  let component: SelectorUsuarioComponent;
  let fixture: ComponentFixture<SelectorUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectorUsuarioComponent]
    });
    fixture = TestBed.createComponent(SelectorUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
