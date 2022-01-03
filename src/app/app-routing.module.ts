import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auto-principal',
    loadChildren: () => import('./auto-principal/auto-principal.module').then( m => m.AutoPrincipalPageModule)
  },
  {
    path: 'auto-hipodromos',
    loadChildren: () => import('./auto-hipodromos/auto-hipodromos.module').then( m => m.AutoHipodromosPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'prod-hipo-admin',
    loadChildren: () => import('./prod-hipo-admin/prod-hipo-admin.module').then( m => m.ProdHipoAdminPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
