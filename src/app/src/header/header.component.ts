import { Component, OnInit, Inject, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { PublishService } from 'src/app/publish.service';
import { RegisterRequest } from 'src/app/models/RegisterRequest';
import { InfoBean } from 'src/app/models/infobean';
import { GoogleLoginRequest } from 'src/app/models/GoogleLogin/GoogleLoginRequest';
import * as uuid from 'uuid';
import { AuthCheckService } from 'src/app/services/auth-check.service';
import { UserRequest } from 'src/app/models/User/UserRequest';
import { User } from 'src/app/User';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  ,
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  // @Output() valueChange = new EventEmitter();
  private user: SocialUser;
  loggedIn: boolean;
  request: RegisterRequest;
  infoBean: InfoBean;
  googleLoginRequest: GoogleLoginRequest;
  userRequest: UserRequest;
  userInfo: User;
  executeNext: Boolean;
  constructor(private authService: AuthService, private authCheckService: AuthCheckService, private publishService: PublishService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.loggedIn = false;

    // console.log("error login here")
    this.authCheckService.checkIfLoginNonLogin();
    if (this.cookieService.get('logged') == 'true' || this.storage.get('authToken') != null) {
      //console.log("error login here")
      this.userRequest = new UserRequest();
      this.loggedIn = true;
      this.userRequest.authToken = this.storage.get("authToken");
      this.publishService.getUserInfo(this.userRequest).subscribe(response => {

        if (response.error != null) {
          //  console.log("error login here" + response.error.errorMsg)
          this.authCheckService.logout()
          return;
        }

        this.userInfo = new User();
        this.userInfo.firstName = response.data.firstName;
        this.userInfo.lastName = response.data.lastName;
        this.userInfo.id = response.data.id;
        this.userInfo.profileUrl = response.data.profileUrl;

        //    this.valueChange.emit('child1');
      });

    }
    else {
      this.nonLoginUser();

    }
    // console.log(this.storage.get('socialusers'));
    // if(this.storage.get('socialusers') != null)
    // {
    //   this.loggedIn = true;
    //   this.user = this.storage.get('socialusers');
    // }
    // else
    // {
    // this.loggedIn = false;
    // }
  }

  signInWithGoogle(platform: string): void {


    platform = GoogleLoginProvider.PROVIDER_ID;
    this.authService.signIn(platform).then(
      (response) => {
        //console.log(platform + " logged in user data is= " , response);
        this.user = response;
        // console.log(this.user.name)
        this.loggedIn = true;
        //localStorage.setItem('socialusers', JSON.stringify( response)); 

        this.googleLoginRequest = new GoogleLoginRequest();
        this.googleLoginRequest.email = response.email;
        this.googleLoginRequest.firstName = response.firstName;
        this.googleLoginRequest.lastName = response.lastName;
        this.googleLoginRequest.nonLoginAuthToken = this.storage.get('nonLoginAuth');
        this.googleLoginRequest.profilepicUrl = response.photoUrl;
        this.googleLoginRequest.countryCode = '+91'
        this.googleLoginRequest.googleAuthToken = response.idToken;
        this.googleLoginRequest.googleUserId = response.id;


        this.googleLoginRequest.infoBean = JSON.parse(this.storage.get('infoBean'));


        this.publishService.googleLogin(this.googleLoginRequest).subscribe(contentResponse => {
          if (contentResponse.error != null) {
            //  alert(contentResponse.error.errorMsg);
            this.authCheckService.logout()
            return;

          }

          // console.log(" permanant authtoken is "+ contentResponse.data.authToken);
          this.storage.set("authToken", contentResponse.data.authToken);
          this.storage.remove('nonLoginAuth');
          this.cookieService.set('logged', 'true');
          this.executeNext = true;
          this.router.navigate([''])
          window.location.reload();

          // this.dataSource = new MatTableDataSource( this.unPubLishedContentList);
          // this.dataSource.paginator = this.paginator;

        });

      }
    );


    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.authService.signOut();
  }


  nonLoginUser(): void {
    //  console.log("the storage is lkdv  " + this.storage.get('nonLoginAuth'));
    if (this.storage.get('nonLoginAuth') == null && this.storage.get('authToken') == null) {
      this.request = new RegisterRequest();

      this.request.browserName = "CHROME"
      this.request.androidUniqueId = uuid.v4();

      this.infoBean = new InfoBean();
      this.infoBean.appName = "Footerrant"
      this.infoBean.appVersion = "1.0"
      this.infoBean.androidId = "dddadad"
      this.infoBean.androidVersion = "23"
      this.infoBean.appSignature = "eee"
      this.infoBean.deviceModel = ""
      this.infoBean.fcmId = ""
      this.infoBean.platform = ""
      this.infoBean.userAgent = ""
      this.infoBean.platform = ""
      this.infoBean.manufacturer = ""
      this.request.infoBean = this.infoBean

      this.publishService.registerUUid(this.request).subscribe(contentResponse => {
        if (contentResponse.error != null) {
          //  alert(contentResponse.error.errorMsg);
          this.authCheckService.logout()
          return;
        }

        //   console.log("authtoken is "+ contentResponse.data.authToken);
        this.storage.set('nonLoginAuth', contentResponse.data.authToken);
        this.storage.set('infoBean', JSON.stringify(this.infoBean));
        this.executeNext = true;

        //  this.valueChange.emit('child1');

        // this.dataSource = new MatTableDataSource( this.unPubLishedContentList);
        // this.dataSource.paginator = this.paginator;

      });

    }
    else {

      // this.valueChange.emit('child1');
    }

  }

  check(): void {
    if (this.cookieService.get('logged') == 'false') {

      console.log('current url is ' + this.router.url)
      if (this.router.url === '/') {
        this.router.navigate(['/feed'])
      }
      this.authCheckService.checkLoggedIn();

    }
  }

}
