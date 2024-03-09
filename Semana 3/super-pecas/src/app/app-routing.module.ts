import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrosComponent } from './carros/carros.component';
import { PecasComponent } from './pecas/pecas.component';
import { HomeComponent } from './home/home.component';
import { CarroEditComponent } from './carros/carro-edit.component';
import { PecasEditComponent } from './pecas/pecas-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'carros', component: CarrosComponent },
  { path: 'carros/adicionar', component: CarroEditComponent, data: { type: 'adicionar' } },
  { path: 'carros/editar/:id', component: CarroEditComponent, data: { type: 'editar' }  },
  { path: 'pecas', component: PecasComponent },
  { path: 'pecas/adicionar', component: PecasEditComponent, data: { type: 'adicionar' } },
  { path: 'pecas/editar/:id', component: PecasEditComponent, data: { type: 'editar' }  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
