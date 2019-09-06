import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MainComponent } from './main/main.component';
import { SuffixPipe } from './suffix.pipe';
import { CarouselSectionComponent } from './carousel-section/carousel-section.component';
import { LensflareComponent } from './lensflare/lensflare.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { GoodbyeComponentComponent } from './goodbye-component/goodbye-component.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: '', component: MainComponent }]
        )
      ],
      declarations: [
        AppComponent,
        MainComponent,
        SuffixPipe,
        CarouselSectionComponent,
        LensflareComponent,
        SplashScreenComponent,
        GoodbyeComponentComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
