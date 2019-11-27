import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {FooterrantFeedRoutingModule  } from "./footerrant-feed-routing.module";
import { FooterrantFeedComponent } from "./footerrant-feed.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "src/app/app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { SocialLoginModule } from "angularx-social-login";
import { StorageServiceModule } from "angular-webstorage-service";
import { MatTabsModule } from "@angular/material/tabs";
import { NgZorroAntdModule, NzButtonModule, NzAffixModule, NzModalModule, NzInputModule, NzLayoutModule, NzPopoverModule, NzDropDownModule, NzCarouselModule } from "ng-zorro-antd";
import { FormsModule } from "@angular/forms";
import { HeaderComponent } from "../header/header.component";

@NgModule({
  imports: [CommonModule, FooterrantFeedRoutingModule,
  
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    
    InfiniteScrollModule,
    MatCardModule,
    MatGridListModule,
    ScrollingModule,
    SocialLoginModule,
    StorageServiceModule,
    MatTabsModule,

    NgZorroAntdModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    FormsModule ,
    NzLayoutModule,
    NzDropDownModule,
    NzCarouselModule],
  declarations: [FooterrantFeedComponent]
})
export class FooterrantFeedModule {}