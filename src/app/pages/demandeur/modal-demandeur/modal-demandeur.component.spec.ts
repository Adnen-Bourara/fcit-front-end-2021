import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDemandeurComponent } from './modal-demandeur.component';

describe('ModalDemandeurComponent', () => {
  let component: ModalDemandeurComponent;
  let fixture: ComponentFixture<ModalDemandeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDemandeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDemandeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
