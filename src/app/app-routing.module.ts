import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MasterComponent } from './master/master.component';

const routes: Routes = [
  {path: '', component: MasterComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
