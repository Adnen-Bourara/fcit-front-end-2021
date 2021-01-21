import { TestBed } from '@angular/core/testing';

import { ActualiteServiceService } from './actualite-service.service';

describe('ActualiteServiceService', () => {
  let service: ActualiteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualiteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
