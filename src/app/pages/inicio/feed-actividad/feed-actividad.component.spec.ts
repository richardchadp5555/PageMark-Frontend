import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedActividadComponent } from './feed-actividad.component';

describe('FeedActividadComponent', () => {
  let component: FeedActividadComponent;
  let fixture: ComponentFixture<FeedActividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedActividadComponent]
    });
    fixture = TestBed.createComponent(FeedActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
