import { Injectable, computed, signal } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider, updateProfile } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Observable, from } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserCredential, User } from "@firebase/auth-types";

interface AuthState {
  user: User | undefined;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private mockGetApi = "https://api.realworld.io/api/articles";
  private user$ = this.fireauth.user;
  private state = signal<AuthState>({
    user: undefined,
  });

  user = computed(() => this.state());
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private http: HttpClient
  ) {
    this.user$.subscribe((user) => {
      console.log(user);
      if (user) {
        this.state.update((state) => ({
          ...state,
          user,
        }));
      }
    });
  }

  registerUser(
    email: string,
    userName: string,
    password: string
  ): Observable<void> {
    const promise = this.fireauth
      .createUserWithEmailAndPassword(email, password)
      .then((response: any) => {
        updateProfile(response.user, { displayName: userName });
        console.log({
          text: "Login success",
          response: response,
        });
      });
    return from(promise);
  }

  login(email: string, password: string) {
    return from(
      this.fireauth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log(userCredential);
        })
    );
  }

  loginInWithGoogle(): Promise<UserCredential> {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider());
  }

  signOut(): void {
    this.fireauth.signOut();
    this.state.update((state) => ({
      ...state,
      user: undefined,
    }));
    this.router.navigateByUrl("/login");
  }

  getArticles() {
    return this.http.get(this.mockGetApi);
  }
}
