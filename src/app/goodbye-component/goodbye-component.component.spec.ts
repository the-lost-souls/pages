import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodbyeComponentComponent } from './goodbye-component.component';

describe('GoodbyeComponentComponent', () => {
  let component: GoodbyeComponentComponent;
  let fixture: ComponentFixture<GoodbyeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodbyeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodbyeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
