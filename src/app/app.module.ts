import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MasterComponent } from './master/master.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  // tslint:disable-next-line: deprecation
  providers: [SystemJsNgModuleLoader],
  bootstrap: [AppComponent]
})
export class AppModule { }
