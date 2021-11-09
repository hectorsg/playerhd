import { TestBed } from '@angular/core/testing';

import { PushnotficacionsService } from './pushnotficacions.service';

describe('PushnotficacionsService', () => {
  let service: PushnotficacionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PushnotficacionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
