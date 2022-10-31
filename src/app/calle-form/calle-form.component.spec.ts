import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalleFormComponent } from './calle-form.component';

describe('CalleFormComponent', () => {
  let component: CalleFormComponent;
  let fixture: ComponentFixture<CalleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
