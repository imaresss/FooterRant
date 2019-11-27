import { BooleanResponse } from "src/app/BooleanResponse";
import { ResponseError } from "src/app/ResponseError";

export class PostCommentResponse
{
    error: ResponseError;
    data: BooleanResponse;   
}