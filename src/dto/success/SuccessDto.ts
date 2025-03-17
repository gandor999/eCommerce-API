import { ProductDto } from "../ProductDto.js";
import { BearerTokenDto } from "./BearerTokenDto.js";
import { MessageDto } from "./MessageDto.js";

export class SuccessDto {
    constructor(public payload: MessageDto | BearerTokenDto | ProductDto | ProductDto[] | (MessageDto & ProductDto), public statusCode: number) { }
}