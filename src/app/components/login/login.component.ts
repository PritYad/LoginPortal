import { Component, OnInit, effect } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
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

  errorMessage: string | null = null;
  showSuccessMsg = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    effect(() => {
      if (this.authService.user().user) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.showSuccessMsg = params['success'];
    });
  }

  login() {
    this.errorMessage = '';
    if (this.form.invalid) {
      this.showErrors(this.form);
      return;
    }
    this.isLoading = true;
    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  authWithGoogle() {
    this.errorMessage = '';
    this.authService.loginInWithGoogle().then(
      (response) => {
        console.log('Signed in successfully', response);
        this.router.navigateByUrl('/dashboard');
        // maybe store the token or navigate to another page
      },
      (error) => {
        this.errorMessage = error.message;
        console.error('Sign in error', error);
      }
    );
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
