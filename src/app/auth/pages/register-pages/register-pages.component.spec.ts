import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPagesComponent } from './register-pages.component';

describe('RegisterPagesComponent', () => {
  let component: RegisterPagesComponent;
  let fixture: ComponentFixture<RegisterPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPagesComponent]
    });
    fixture = TestBed.createComponent(RegisterPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
