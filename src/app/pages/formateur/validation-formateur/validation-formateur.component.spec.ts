import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationFormateurComponent } from './validation-formateur.component';

describe('ValidationFormateurComponent', () => {
  let component: ValidationFormateurComponent;
  let fixture: ComponentFixture<ValidationFormateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationFormateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
