import { TestBed } from '@angular/core/testing';

import { IplistService } from './iplist.service';

describe('IplistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IplistService = TestBed.get(IplistService);
    expect(service).toBeTruthy();
  });
});
