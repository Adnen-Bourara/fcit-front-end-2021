import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFichierComponent } from './show-fichier.component';

describe('ShowFichierComponent', () => {
  let component: ShowFichierComponent;
  let fixture: ComponentFixture<ShowFichierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFichierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFichierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
