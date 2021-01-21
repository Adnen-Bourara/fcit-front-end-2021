import { TestBed } from '@angular/core/testing';

import { IndexationService } from './indexation.service';

describe('IndexationService', () => {
  let service: IndexationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
