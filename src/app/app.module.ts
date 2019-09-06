import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { CarouselSectionComponent } from './carousel-section/carousel-section.component';
import { SuffixPipe } from './suffix.pipe';
import { LensflareComponent } from './lensflare/lensflare.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CarouselSectionComponent,
    SuffixPipe,
    LensflareComponent,
    SplashScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
