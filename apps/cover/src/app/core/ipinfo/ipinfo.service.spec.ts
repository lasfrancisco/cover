import { TestBed } from '@angular/core/testing';

import { IpinfoService } from './ipinfo.service';

describe('IpinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpinfoService = TestBed.get(IpinfoService);
    expect(service).toBeTruthy();
  });
});
