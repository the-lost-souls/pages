import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { CarouselSectionComponent } from './carousel-section/carousel-section.component';
import { SuffixPipe } from './suffix.pipe';
import { LensflareComponent } from './lensflare/lensflare.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CarouselSectionComponent,
    SuffixPipe,
    LensflareComponent
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
