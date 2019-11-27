import {RegisterResponse} from "./RegisterResponse";
import { ResponseError } from "../ResponseError";

export class RegisteResponseParent
{
    error: ResponseError;
    data: RegisterResponse;
}