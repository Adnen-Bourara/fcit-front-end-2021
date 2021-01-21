import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowValidationComponent } from './show-validation.component';

describe('ShowValidationComponent', () => {
  let component: ShowValidationComponent;
  let fixture: ComponentFixture<ShowValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
