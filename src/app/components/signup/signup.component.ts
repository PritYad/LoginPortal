import { Component, effect } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  errorMessage: string | null = null;
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ],
    ],
  });
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    effect(() => {
      if (this.authService.user().user) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.showErrors(this.form);
      return;
    }
    this.isLoading = true;
    const rawForm = this.form.getRawValue();
    this.authService
      .registerUser(rawForm.email, rawForm.username, rawForm.password)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.isLoading = false;
        },
      });
  }

  showErrors(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      control.updateValueAndValidity();
      if (control instanceof FormGroup) {
        this.showErrors(control);
      }
    });
  }
}
