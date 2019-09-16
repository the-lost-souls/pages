import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterComponent } from './master.component';
import { SystemJsNgModuleLoader } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MasterComponent', () => {
  let component: MasterComponent;
  let fixture: ComponentFixture<MasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterComponent ],
      // tslint:disable-next-line: deprecation
      providers: [SystemJsNgModuleLoader],
      imports: [NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
