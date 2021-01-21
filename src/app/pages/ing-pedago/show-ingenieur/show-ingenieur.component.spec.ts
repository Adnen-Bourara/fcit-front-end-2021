import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIngenieurComponent } from './show-ingenieur.component';

describe('ShowIngenieurComponent', () => {
  let component: ShowIngenieurComponent;
  let fixture: ComponentFixture<ShowIngenieurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowIngenieurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIngenieurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
