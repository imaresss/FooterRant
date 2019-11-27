import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Constants } from '../Constants';
import { BaseRequest } from '../BaseRequest';
import { TokenCheckData } from '../models/AuthCheck/TokenCheckData';
import { ErrorHandler } from '../ErrorHandler';
import { NewAuthResponseData } from '../models/AuthCheck/NewAuthResponseData';
import { NewAuthRequest } from '../models/AuthCheck/NewAuthRequest';
import { LoginModalComponent } from '../src/login-modal/login-modal.component';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthCheckService {

  private validate = Constants.BASE_URL + '/user-management/api/rs/v1/service/validate';
  private newAuthToken = Constants.BASE_URL + '/user-management/api/rs/v1/service/newrefreshsession/app';

  request : BaseRequest;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService ,private http: HttpClient ,private modalService: NzModalService 
    ,   private router: Router  , private loginService : LoginService,private cookieService: CookieService
  ) { }


  public validateToken(payload: BaseRequest): Observable<TokenCheckData>{

      
      return this.http.post<TokenCheckData>(this.validate, payload ).pipe(
        catchError(new ErrorHandler().handleError('uploadContent Article', null))
      );
    }

    public newAuth(payload: NewAuthRequest): Observable<NewAuthResponseData>{
        return this.http.post<NewAuthResponseData>(this.newAuthToken, payload ).pipe(
          catchError(new ErrorHandler().handleError('uploadContent Article', null))
        );
      }



    public checkLoggedIn():void
    {
      this.checkCookieExists();
      if(this.storage.get("authToken") == null)
    {
      this.cookieService.set('logged','false')
      this.modalService.create({
        
        nzContent: LoginModalComponent,
        nzFooter : null
      });
    }

    else
    {
      this.checkAuthValidity();
    }
    }

    public logout():void
    {
      console.log("clearing storage")
      this.storage.remove('nonLoginAuth');
      this.storage.remove('authToken');
      this.storage.remove('refreshToken');
      this.storage.remove('infoBean');
      this.cookieService.set('logged', 'false');
      this.router.navigate([''])
      window.location.reload();
    }


     checkIfLoginNonLogin():void
    {
      this.checkCookieExists();
      if(this.storage.get("authToken") == null)
      {
        console.log("auth is null")
        this.cookieService.set('logged','false')

      }
      else
      {
        this.request = new BaseRequest();
        this.request.authToken = this.storage.get("authToken");
        this.validateToken(this.request).subscribe(response =>{

          if(response.error != null)
          {
            console.log("error logout please")
             this.logout();
            this.cookieService.set('logged', 'false')
            return;
          }
          this.cookieService.set('logged','true')
          console.log("error logout please cdcdsc")
       
          return;
        });

      }

    }

    public checkAuthValidity():void
    {
      this.checkCookieExists();
      if(this.storage.get("authToken") == "" || this.storage.get("authToken") == null)
      {
        this.logout();
      }

      else
      {
        this.request = new BaseRequest();
        this.request.authToken = this.storage.get("authToken");
        this.validateToken(this.request).subscribe(response =>{

          if(response.error != null)
          {
            this.logout();
            return;
          }
          this.cookieService.set('logged','true');
          return;
        });
        
      }
    }


    public checkCookieExists() : void
    {
      if(!this.cookieService.get('logged'))
      {
        console.log("cookie service");
        //  this.logout();
          this.cookieService.set('logged', 'false');
      }
    }
}
