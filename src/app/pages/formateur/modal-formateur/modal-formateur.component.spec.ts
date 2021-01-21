import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormateurComponent } from './modal-formateur.component';

describe('ModalFormateurComponent', () => {
  let component: ModalFormateurComponent;
  let fixture: ComponentFixture<ModalFormateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFormateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
