import { GoogleLoginResponse } from "./GoogleLoginResponse";
import { ResponseError } from "src/app/ResponseError";

export class GoogleLoginResponseParent
{
    error: ResponseError;
    data: GoogleLoginResponse;
}