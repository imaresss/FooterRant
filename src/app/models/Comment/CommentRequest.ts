import { BaseRequest } from "src/app/BaseRequest";

export class CommentRequest extends BaseRequest
{
    comment : string;
    videoId : string;
    userId : number;
    originalComment : string;
    splitComment : string[];

}