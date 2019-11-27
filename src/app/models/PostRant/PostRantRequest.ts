import { BaseRequest } from "src/app/BaseRequest";


export class PostRantRequest extends BaseRequest
{
    title : string;
    type : string;
    tags : string[];
    originalTitle : string;
    splitTitle : string[];
    shareLink : string;
}