import { TestBed } from '@angular/core/testing';

import { FiliereMetierService } from './filiere-metier.service';

describe('FiliereMetierService', () => {
  let service: FiliereMetierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiliereMetierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
