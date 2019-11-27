import { BooleanResponse } from "src/app/BooleanResponse";
import { ResponseError } from "src/app/ResponseError";

export class PostLikeResponse
{
    error: ResponseError;
    data: BooleanResponse;   
}