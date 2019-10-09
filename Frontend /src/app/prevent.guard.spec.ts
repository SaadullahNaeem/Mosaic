import { TestBed, async, inject } from '@angular/core/testing';

import { PreventGuard } from './prevent.guard';

describe('PreventGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreventGuard]
    });
  });

  it('should ...', inject([PreventGuard], (guard: PreventGuard) => {
    expect(guard).toBeTruthy();
  }));
});
