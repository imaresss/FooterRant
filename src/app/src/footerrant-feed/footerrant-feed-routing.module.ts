import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import {  FooterrantFeedComponent} from './footerrant-feed.component'


const routes: Routes = [
    { path: "", component: FooterrantFeedComponent},

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class FooterrantFeedRoutingModule { }