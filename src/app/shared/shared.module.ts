import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';

const PRIME_NG_MODULES = [
  AutoCompleteModule,
  ButtonModule,
  CalendarModule,
  CardModule,
  CheckboxModule,
  DialogModule,
  InputGroupModule,
  InputGroupAddonModule,
  InputTextModule,
  PasswordModule,
  TableModule,
  ToastModule,
  MenubarModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ...PRIME_NG_MODULES],
  exports: [CommonModule, FormsModule, ...PRIME_NG_MODULES],
})
export class SharedModule {}
