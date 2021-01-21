import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActualiteComponent } from './modal-actualite.component';

describe('ModalActualiteComponent', () => {
  let component: ModalActualiteComponent;
  let fixture: ComponentFixture<ModalActualiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalActualiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
