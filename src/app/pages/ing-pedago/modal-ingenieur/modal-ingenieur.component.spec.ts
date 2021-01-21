import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIngenieurComponent } from './modal-ingenieur.component';

describe('ModalIngenieurComponent', () => {
  let component: ModalIngenieurComponent;
  let fixture: ComponentFixture<ModalIngenieurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalIngenieurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIngenieurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
