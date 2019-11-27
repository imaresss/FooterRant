import { Component, OnInit, Inject } from '@angular/core';
import { GoogleLoginRequest } from 'src/app/models/GoogleLogin/GoogleLoginRequest';
import { GoogleLoginProvider, AuthService, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
import { PublishService } from 'src/app/publish.service';
import { LoginService } from 'src/app/login.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NzModalRef } from 'ng-zorro-antd';
import { AuthCheckService } from 'src/app/services/auth-check.service';
import { CookieService } from 'ngx-cookie-service';
import { FbLoginRequest } from 'src/app/models/FbLogin/FbLoginRequest';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  googleLoginRequest : GoogleLoginRequest;
  fbLoginRequest : FbLoginRequest;
  private user: SocialUser;
  loggedIn : boolean;
  constructor(private authService: AuthService,private cookieService : CookieService,  private publishService : PublishService, private loginService: LoginService, @Inject(LOCAL_STORAGE) private storage: WebStorageService,private modal: NzModalRef) { }

  ngOnInit() {
  }


  signInWithGoogle(platform : string): void {
    platform = GoogleLoginProvider.PROVIDER_ID;

    this.authService.signIn(platform).then(
      (response) => {
        //console.log(platform + " logged in user data is= " , response);
        this.user = response;
        //console.log(this.user.name)
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
      if(contentResponse.error!=null){
       // alert(contentResponse.error.errorMsg);
        return;
        
      }
      
     // console.log(" permanant authtoken is "+ contentResponse.data.authToken);
      this.storage.set("authToken" ,contentResponse.data.authToken);
      this.storage.set("refreshToken" ,contentResponse.data.refreshToken);
      this.storage.remove('nonLoginAuth');
     this.cookieService.set('logged','true');
    //  this.router.navigate([''])
      window.location.reload();
      
      // this.dataSource = new MatTableDataSource( this.unPubLishedContentList);
      // this.dataSource.paginator = this.paginator;
     
    });

      }
    );


    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }


  signInWithFacebook(platform : string): void {

    platform = FacebookLoginProvider.PROVIDER_ID;

    this.authService.signIn(platform).then(response =>{
      
      this.fbLoginRequest = new FbLoginRequest();
      this.fbLoginRequest.email = response.email;
      this.fbLoginRequest.firstName = response.firstName;
      this.fbLoginRequest.lastName = response.lastName;
      this.fbLoginRequest.nonLoginAuthToken = this.storage.get('nonLoginAuth');
      this.fbLoginRequest.profilepicUrl = response.photoUrl;
      this.fbLoginRequest.countryCode = '+91'
      this.fbLoginRequest.fbAuthToken = response.authToken;
      this.fbLoginRequest.fbUserId = response.id;
      this.fbLoginRequest.infoBean = JSON.parse(this.storage.get('infoBean'));
        

     // console.log(response);


      this.publishService.fbLogin(this.fbLoginRequest).subscribe(contentResponse => {
        if(contentResponse.error!=null){
         // alert(contentResponse.error.errorMsg);
          return;
          
        }
        
      //  console.log(" permanant authtoken is "+ contentResponse.data.authToken);
        this.storage.set("authToken" ,contentResponse.data.authToken);
        this.storage.set("refreshToken" ,contentResponse.data.refreshToken);
        this.storage.remove('nonLoginAuth');
       this.cookieService.set('logged','true');
      //  this.router.navigate([''])
        window.location.reload();
        
        // this.dataSource = new MatTableDataSource( this.unPubLishedContentList);
        // this.dataSource.paginator = this.paginator;
       
      });

    }


    )


  }

  destroyModal(): void {
    this.modal.destroy();
  }

}
