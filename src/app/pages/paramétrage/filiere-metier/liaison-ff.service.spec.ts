import { TestBed } from '@angular/core/testing';

import { LiaisonFFService } from './liaison-ff.service';

describe('LiaisonFFService', () => {
  let service: LiaisonFFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiaisonFFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
