import { BaseRequest } from "./BaseRequest";

export class GetContentRequest extends BaseRequest {
    publishType: String;
    userId : number;
    type : string;
    tag: string;
}