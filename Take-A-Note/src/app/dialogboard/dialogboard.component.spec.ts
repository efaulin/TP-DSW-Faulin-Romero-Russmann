import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogboardComponent } from './dialogboard.component';

describe('DialogboardComponent', () => {
  let component: DialogboardComponent;
  let fixture: ComponentFixture<DialogboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogboardComponent]
    });
    fixture = TestBed.createComponent(DialogboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
