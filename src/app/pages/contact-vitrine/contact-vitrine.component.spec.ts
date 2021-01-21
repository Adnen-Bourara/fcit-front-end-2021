import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactVitrineComponent } from './contact-vitrine.component';

describe('ContactVitrineComponent', () => {
  let component: ContactVitrineComponent;
  let fixture: ComponentFixture<ContactVitrineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactVitrineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactVitrineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
