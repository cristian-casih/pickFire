import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PickComponent } from './components/pick/pick.component';
import { LoadComponent } from './components/load/load.component';


const routes: Routes = [
  { path: 'pick', component: PickComponent },
  { path: 'load', component: LoadComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'pick' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
