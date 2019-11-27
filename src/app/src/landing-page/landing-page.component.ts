import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { CookieService } from 'ngx-cookie-service';
import { AuthCheckService } from 'src/app/services/auth-check.service';
declare function homePage(page: string): any;
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
  ,
  encapsulation: ViewEncapsulation.None,
})
export class LandingPageComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService
    , private router: Router, private cookieService: CookieService, private authCheckService: AuthCheckService) { }

  ngOnInit() {

    if (this.storage.get("authToken") != null) {
      this.router.navigate(['/feed'])
    }

    homePage('web_screen_landing_page');
  }

  check(): void {
    if (this.cookieService.get('logged') == 'false') {
      this.router.navigate(['/feed'])
      this.authCheckService.checkLoggedIn();

    }
  }

  insta(): void {
    window.open("https://www.instagram.com/footerrant/", "_blank");
  }

  fb(): void {
    window.open("https://www.facebook.com/FooterRant-101562401275423/", "_blank");
  }

  twitter(): void {
    window.open("https://twitter.com/FooterRant", "_blank");
  }

  youtube(): void {
    window.open("https://www.youtube.com/channel/UCG58Xg8WqTaBTPlfFWAGCOQ/", "_blank");
  }

}
