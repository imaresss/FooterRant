import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import {  HashtagFeedComponent} from './hashtag-feed.component'


const routes: Routes = [
    { path: "", component: HashtagFeedComponent},

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class HashtagFeedRoutingModule { }