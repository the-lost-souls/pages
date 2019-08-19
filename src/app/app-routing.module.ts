import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { Main2Component } from './main2/main2.component';

const routes: Routes = [
  {path: '1', component: MainComponent},
  {path: '2', component: Main2Component},
  {path: '', component: MainComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
