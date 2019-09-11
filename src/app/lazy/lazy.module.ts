import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../main/main.component';
import { CarouselSectionComponent } from '../carousel-section/carousel-section.component';
import { SuffixPipe } from '../suffix.pipe';
import { LensflareComponent } from '../lensflare/lensflare.component';
import { GoodbyeComponentComponent } from '../goodbye-component/goodbye-component.component';

@NgModule({
  declarations: [
    MainComponent,
    CarouselSectionComponent,
    SuffixPipe,
    LensflareComponent,
    GoodbyeComponentComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [MainComponent]
})
export class LazyModule {
    static entry = MainComponent;
}
