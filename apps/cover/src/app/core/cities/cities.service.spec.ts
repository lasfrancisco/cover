import { TestBed } from '@angular/core/testing';

import { Cities } from './cities.service';

describe('Cities', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Cities = TestBed.get(Cities);
    expect(service).toBeTruthy();
  });
});
