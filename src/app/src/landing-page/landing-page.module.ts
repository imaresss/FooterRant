import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {LandingPageRoutingModule  } from "./landing-page-routing.module";
import { LandingPageComponent } from "./landing-page.component";

import { NzGridModule, NzButtonModule, NzAffixModule, NzModalModule, NzInputModule, NzLayoutModule, NzPopoverModule, NzDropDownModule, NzCarouselModule } from "ng-zorro-antd";

@NgModule({
  imports: [CommonModule, LandingPageRoutingModule,
  
    
    
    NzGridModule
   ],
  declarations: [LandingPageComponent]
})
export class LandingPageModule {}