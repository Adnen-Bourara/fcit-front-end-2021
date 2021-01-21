import { TestBed } from '@angular/core/testing';

import { IngenieurService } from './ingenieur.service';

describe('IngenieurService', () => {
  let service: IngenieurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngenieurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
