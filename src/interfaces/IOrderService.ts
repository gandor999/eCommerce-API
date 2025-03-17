import { Request } from "express"
import { SuccessDto } from "../dto/success/SuccessDto.js"

export interface IOrderService {
    getMyOrders(req: Request): Promise<SuccessDto>
    getAllOrders(req: Request): Promise<SuccessDto>
    checkout(req: Request): Promise<SuccessDto>
}