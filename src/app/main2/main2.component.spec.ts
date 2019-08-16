import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Main2Component } from './main2.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Main2Component', () => {
  let component: Main2Component;
  let fixture: ComponentFixture<Main2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Main2Component ],
      imports: [ NoopAnimationsModule ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Main2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
