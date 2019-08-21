import { TestBed } from '@angular/core/testing';

import { FlaresService } from './flares.service';

describe('FlaresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlaresService = TestBed.get(FlaresService);
    expect(service).toBeTruthy();
  });
});
