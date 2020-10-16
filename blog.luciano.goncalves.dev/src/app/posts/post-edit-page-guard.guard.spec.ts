import { TestBed, async, inject } from '@angular/core/testing';

import { PostEditPageGuardGuard } from './post-edit-page-guard.guard';

describe('PostEditPageGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostEditPageGuardGuard]
    });
  });

  it('should ...', inject([PostEditPageGuardGuard], (guard: PostEditPageGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
