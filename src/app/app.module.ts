import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { CarouselSectionComponent } from './carousel-section/carousel-section.component';
import { SuffixPipe } from './suffix.pipe';
import { LensflareComponent } from './lensflare/lensflare.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { GoodbyeComponentComponent } from './goodbye-component/goodbye-component.component';
import { MasterComponent } from './master/master.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CarouselSectionComponent,
    SuffixPipe,
    LensflareComponent,
    SplashScreenComponent,
    GoodbyeComponentComponent,
    MasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function initApp() {
  return () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('In initApp');
        resolve();
      }, 3000);
    });
  };
}
