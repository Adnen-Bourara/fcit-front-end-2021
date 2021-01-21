import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDemandeurComponent } from './show-demandeur.component';

describe('ShowDemandeurComponent', () => {
  let component: ShowDemandeurComponent;
  let fixture: ComponentFixture<ShowDemandeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDemandeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDemandeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
