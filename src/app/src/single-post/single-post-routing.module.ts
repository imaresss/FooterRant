import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import {  SinglePostComponent} from './single-post.component'


const routes: Routes = [
    { path: "", component: SinglePostComponent},

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class SinglePostRoutingModule { }