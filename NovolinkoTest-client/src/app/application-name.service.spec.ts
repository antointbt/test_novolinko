import { TestBed } from '@angular/core/testing';

import { ApplicationNameService } from './application-name.service';

describe('ApplicationNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationNameService = TestBed.get(ApplicationNameService);
    expect(service).toBeTruthy();
  });
});
