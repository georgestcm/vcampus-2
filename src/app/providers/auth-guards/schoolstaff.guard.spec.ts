import { TestBed, async, inject } from '@angular/core/testing';

import { SchoolstaffGuard } from './schoolstaff.guard';

describe('SchoolstaffGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolstaffGuard]
    });
  });

  it('should ...', inject([SchoolstaffGuard], (guard: SchoolstaffGuard) => {
    expect(guard).toBeTruthy();
  }));
});
