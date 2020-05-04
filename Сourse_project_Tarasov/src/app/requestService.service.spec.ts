import { TestBed } from '@angular/core/testing';

import { RequestHttpService } from './services/request-http.service';

describe('RequestHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestHttpService = TestBed.get(RequestHttpService);
    expect(service).toBeTruthy();
  });
});
