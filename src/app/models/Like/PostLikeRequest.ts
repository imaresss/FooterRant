import { BaseRequest } from "src/app/BaseRequest";

export class PostLikeRequest extends BaseRequest
{

    like : boolean;
    videoId : string;
    commentId : string;
    

}