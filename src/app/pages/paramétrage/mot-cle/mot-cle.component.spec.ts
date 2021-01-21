import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotCleComponent } from './mot-cle.component';

describe('MotCleComponent', () => {
  let component: MotCleComponent;
  let fixture: ComponentFixture<MotCleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotCleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotCleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
