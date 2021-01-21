import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliereMetierComponent } from './filiere-metier.component';

describe('FiliereMetierComponent', () => {
  let component: FiliereMetierComponent;
  let fixture: ComponentFixture<FiliereMetierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiliereMetierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiliereMetierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
