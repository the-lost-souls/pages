import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LensflareComponent } from './lensflare.component';

describe('LensflareComponent', () => {
  let component: LensflareComponent;
  let fixture: ComponentFixture<LensflareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LensflareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LensflareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
