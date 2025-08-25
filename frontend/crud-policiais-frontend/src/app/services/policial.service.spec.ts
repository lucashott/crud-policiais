import { TestBed } from '@angular/core/testing';

import { PolicialService } from './policial.service';

describe('PolicialService', () => {
  let service: PolicialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
