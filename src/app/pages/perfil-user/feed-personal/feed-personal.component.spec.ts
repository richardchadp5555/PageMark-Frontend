import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedPersonalComponent } from './feed-personal.component';

describe('FeedPersonalComponent', () => {
  let component: FeedPersonalComponent;
  let fixture: ComponentFixture<FeedPersonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedPersonalComponent]
    });
    fixture = TestBed.createComponent(FeedPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
