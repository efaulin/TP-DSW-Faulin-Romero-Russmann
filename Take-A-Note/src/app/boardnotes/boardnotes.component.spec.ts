import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardnotesComponent } from './boardnotes.component';

describe('BoardnotesComponent', () => {
  let component: BoardnotesComponent;
  let fixture: ComponentFixture<BoardnotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardnotesComponent]
    });
    fixture = TestBed.createComponent(BoardnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
