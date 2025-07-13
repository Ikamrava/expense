import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { environment } from '../../environment.prod';

import { HomeComponent } from './page/home/home.component';
import { ExpensesListComponent } from './componenets/expenses-list/expenses-list.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { FilterComponent } from './page/filter/filter.component';
import { HeaderComponent } from './componenets/header/header.component'; 
import { MenubarModule } from 'primeng/menubar';
import { LoginComponent } from './page/login/login.component';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

// ✅ 1. Import the necessary Auth providers
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExpensesListComponent,
    FilterComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    TableModule,
    InputGroupModule,
    InputGroupAddonModule,
    DialogModule,
    BrowserAnimationsModule,
    CalendarModule,
    MenubarModule,
    CardModule,
    PasswordModule,
    CheckboxModule,
    InputTextModule,
    ToastModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    // ✅ 2. Add the provider for the Auth service
    provideAuth(() => getAuth())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }