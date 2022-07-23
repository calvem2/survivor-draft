import { TestBed } from '@angular/core/testing';

import { CastawaysService } from './castaways.service';

describe('CastawaysService', () => {
  let service: CastawaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CastawaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
