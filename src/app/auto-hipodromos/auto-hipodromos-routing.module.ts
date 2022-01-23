import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoHipodromosPage } from './auto-hipodromos.page';

const routes: Routes = [
  {
    path: '',
    component: AutoHipodromosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoHipodromosPageRoutingModule {}
