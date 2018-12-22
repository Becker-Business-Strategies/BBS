import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlankHomeComponent } from './plank-home.component';

describe('PlankHomeComponent', () => {
  let component: PlankHomeComponent;
  let fixture: ComponentFixture<PlankHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlankHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlankHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
