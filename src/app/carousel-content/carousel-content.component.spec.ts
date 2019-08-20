import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselContentComponent } from './carousel-content.component';

describe('CarouselContentComponent', () => {
  let component: CarouselContentComponent;
  let fixture: ComponentFixture<CarouselContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
