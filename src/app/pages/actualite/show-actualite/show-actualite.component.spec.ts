import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowActualiteComponent } from './show-actualite.component';

describe('ShowActualiteComponent', () => {
  let component: ShowActualiteComponent;
  let fixture: ComponentFixture<ShowActualiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowActualiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
