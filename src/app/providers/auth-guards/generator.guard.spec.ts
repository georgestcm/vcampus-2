import { TestBed, async, inject } from '@angular/core/testing';

import { GeneratorGuard } from './generator.guard';

describe('GeneratorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneratorGuard]
    });
  });

  it('should ...', inject([GeneratorGuard], (guard: GeneratorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
