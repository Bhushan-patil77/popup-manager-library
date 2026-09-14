import { TestBed } from '@angular/core/testing';

import { PopupManager } from './popup-manager';

describe('PopupManager', () => {
  let service: PopupManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
