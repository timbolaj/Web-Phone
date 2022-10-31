import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallerFormComponent } from './caller-form.component';

describe('CallerFormComponent', () => {
  let component: CallerFormComponent;
  let fixture: ComponentFixture<CallerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
