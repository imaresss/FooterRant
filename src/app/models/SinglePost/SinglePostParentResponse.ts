import { ResponseError } from "src/app/ResponseError";
import { SinglePostDataResponse } from "./SinglePostDataResponse";

export class SinglePostParentResponse
{
    error: ResponseError;
    data: SinglePostDataResponse;
}