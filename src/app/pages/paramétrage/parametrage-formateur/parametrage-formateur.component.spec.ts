import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrageFormateurComponent } from './parametrage-formateur.component';

describe('ParametrageFormateurComponent', () => {
  let component: ParametrageFormateurComponent;
  let fixture: ComponentFixture<ParametrageFormateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametrageFormateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrageFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
