import { BooleanResponse } from "src/app/BooleanResponse";
import { ResponseError } from "src/app/ResponseError";

export class PostRantResponse
{
    error: ResponseError;
    data: BooleanResponse;   
}