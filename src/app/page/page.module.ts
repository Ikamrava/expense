import { NgModule } from '@angular/core';
import { LoginComponent } from '../page/login/login.component';
import { HomeComponent } from './home/home.component';
import { FilterComponent } from '../page/filter/filter.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../componenets/components.module';

@NgModule({
  declarations: [LoginComponent, HomeComponent, FilterComponent],
  imports: [SharedModule, ComponentsModule],
})
export class PageModule {}
