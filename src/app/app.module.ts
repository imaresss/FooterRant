import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';

import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import 'hammerjs';
import { PublishService } from './publish.service';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider,FacebookLoginProvider } from "angularx-social-login";
import { HeaderComponent } from './src/header/header.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { NzModalCustomFooterComponent } from './src/footerrant-feed/footerrant-feed.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {  NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';


import { NzModalModule } from 'ng-zorro-antd/modal';
import { LoginModalComponent } from './src/login-modal/login-modal.component';

import { FormsModule }   from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { CookieService } from 'ngx-cookie-service';
import { UserProfileComponent } from './src/user-profile/user-profile.component';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { PrivacyPolicyComponent } from './src/privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { HashtagFeedComponent } from './src/hashtag-feed/hashtag-feed.component';

import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LandingPageComponent } from './src/landing-page/landing-page.component';

registerLocaleData(en);
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('#GoogleKey')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('FaceBookKey')
  }
]);



export function provideConfig() {
  return config;
}



@NgModule({
  declarations: [
    AppComponent,
    LoginModalComponent,
    NzModalCustomFooterComponent,
    LoginModalComponent,
    PrivacyPolicyComponent,
    TermsConditionComponent,
    //HashtagFeedComponent,
    //LandingPageComponent

    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    InfiniteScrollModule,
    SocialLoginModule,
    StorageServiceModule,
    BrowserModule,
    NzGridModule,
    NzModalModule,
    FormsModule ,
    NzLayoutModule,
    NzDropDownModule,
    NzTabsModule,
    NzCardModule,
    NzIconModule
  ],
  entryComponents: [NzModalCustomFooterComponent,LoginModalComponent],
  providers: [PublishService
    ,{ provide: NZ_I18N, useValue: en_US }
  ,CookieService,
  {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }
  ],
  bootstrap: [AppComponent],
  
  
})
export class AppModule { }
