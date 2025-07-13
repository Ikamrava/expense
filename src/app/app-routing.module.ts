import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { FilterComponent } from './page/filter/filter.component';
import { LoginComponent } from './page/login/login.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  // 1. The login route is public and stands alone.
  { path: "login", component: LoginComponent },

  // 2. All protected routes are grouped as children here.
  //    The guard is applied once to the parent.
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'filter', component: FilterComponent },
      // You can add more protected routes here in the future
    ]
  },
  
  // 3. A catch-all to redirect any unknown URL to the home page.
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }