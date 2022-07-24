import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoretrackerComponent } from './scoretracker.component';

describe('ScoretrackerComponent', () => {
  let component: ScoretrackerComponent;
  let fixture: ComponentFixture<ScoretrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoretrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoretrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
