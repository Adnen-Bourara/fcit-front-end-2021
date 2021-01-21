import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngPedagoComponent } from './ing-pedago.component';

describe('IngPedagoComponent', () => {
  let component: IngPedagoComponent;
  let fixture: ComponentFixture<IngPedagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngPedagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngPedagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
