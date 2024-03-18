import { Component, OnInit, effect } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Observable, catchError, map, throwError } from "rxjs";
import { Article } from "../../user.interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: `.details {
    padding: 80px;
    width: 600px;
    background: white;
    height: 100vh;
  }
  `,
})
export class DashboardComponent implements OnInit {
  articles$: Observable<string[]> | undefined;

  constructor(private authService: AuthService, private router: Router) {
    effect(() => {
      if (this.authService.user().user === undefined) {
        this.router.navigateByUrl("/login");
      }
    });
  }

  ngOnInit(): void {
    this.getArticleNames();
  }

  signOut() {
    this.authService.signOut();
  }

  getArticleNames() {
    //mock GET api call
    this.articles$ = this.authService.getArticles().pipe(
      map((list: any) =>
        list.articles.map((article: Article) => article.title)
      ),
      catchError((error) => {
        console.error("Error fetching articles:", error);
        return throwError(
          () =>
            new Error(
              "Something went wrong while fetching articles. Please try again later"
            )
        );
      })
    );
  }
}
