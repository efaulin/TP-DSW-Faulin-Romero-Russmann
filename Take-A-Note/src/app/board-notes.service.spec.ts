import { TestBed } from '@angular/core/testing';

import { BoardNotesService } from './board-notes.service';

describe('BoardNotesService', () => {
  let service: BoardNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
