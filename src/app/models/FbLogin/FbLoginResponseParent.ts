import { FbLoginResponse } from "./FbLoginResponse";
import { ResponseError } from "src/app/ResponseError";

export class FbLoginResponseParent
{
    error: ResponseError;
    data: FbLoginResponse;
}