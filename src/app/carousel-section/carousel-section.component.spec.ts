import { async, ComponentFixture, TestBed, ComponentFixtureNoNgZone } from '@angular/core/testing';

import { CarouselSectionComponent } from './carousel-section.component';
import { SuffixPipe } from '../suffix.pipe';
import { CarouselSection } from '../carouselsection';
import { CarouselOptions } from '../carouseloptions';
import { Layout } from '../layout';


describe('CarouselContentComponent', () => {
  let component: CarouselSectionComponent;
  let fixture: ComponentFixture<CarouselSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselSectionComponent, SuffixPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselSectionComponent);
    component = fixture.componentInstance;

    const testSection: CarouselSection = {
      image: 'assets/iv.jpg',
      title: 'IV - Racer',
      text: ['The Gathering 2002', '#2 pc demo'],
      youtube: 'https://www.youtube.com/watch?v=mHV_oIYZyEg',
      pouet: 'http://www.pouet.net/prod.php?which=5555',
      github: 'https://github.com/the-lost-souls/IV'
    };

    const testLayout = new Layout();

    component.content = testSection;
    component.options = CarouselOptions.default();
    component.geometry = testLayout;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
