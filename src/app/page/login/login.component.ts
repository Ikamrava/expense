import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api'; // Import MessageService for Toast

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService], // Provide MessageService here
})
export class LoginComponent {
  constructor(
    private auth: Auth,
    private router: Router,
    private messageService: MessageService // Inject MessageService
  ) {}

  async onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const { email, password } = form.value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      if (userCredential.user) {
        this.router.navigate(['/']);
      }
    } catch (error: any) {
      // Use the Toast to show an error message
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Please check your email and password.',
      });
      console.error(error);
    }
  }
}
