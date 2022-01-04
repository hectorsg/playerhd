import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdHipoAdminPage } from './prod-hipo-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ProdHipoAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdHipoAdminPageRoutingModule {}
