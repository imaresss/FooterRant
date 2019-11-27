import { ResponseError } from "src/app/ResponseError";
import { NewAuthResponse } from "./NewAuthResponse";

export class NewAuthResponseData
{

    error: ResponseError;
    data : NewAuthResponse;    
}