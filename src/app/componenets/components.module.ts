import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { HeaderComponent } from './header/header.component';
import { InputFormComponent } from './input-form/input-form.component';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ExpensesListComponent, HeaderComponent, InputFormComponent],
  imports: [SharedModule],
  exports: [ExpensesListComponent, HeaderComponent, InputFormComponent],
})
export class ComponentsModule {}
