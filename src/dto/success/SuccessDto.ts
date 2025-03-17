import { OrderDto } from "../OrderDto.js";
import { ProductDto } from "../ProductDto.js";
import { BearerTokenDto } from "./BearerTokenDto.js";
import { MessageDto } from "./MessageDto.js";

export class SuccessDto {
    constructor(public payload: MessageDto | BearerTokenDto | ProductDto | ProductDto[] | (MessageDto & ProductDto) | OrderDto | OrderDto[] | (MessageDto & OrderDto), public statusCode: number) { }
}