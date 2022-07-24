import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyScoringComponent } from './weekly-scoring.component';

describe('WeeklyScoringComponent', () => {
  let component: WeeklyScoringComponent;
  let fixture: ComponentFixture<WeeklyScoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyScoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyScoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
