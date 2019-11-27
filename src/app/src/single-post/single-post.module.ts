import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {SinglePostRoutingModule  } from "./single-post-routing.module";
import { SinglePostComponent } from "./single-post.component";
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

@NgModule({
  imports: [CommonModule, SinglePostRoutingModule,
    
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
    NzAffixModule,
    NzModalModule,
    NzInputModule,
    FormsModule ,
    NzLayoutModule,
    NzPopoverModule,
    NzDropDownModule,
    NzCarouselModule],
  declarations: [SinglePostComponent]
})
export class SinglePostModule {}