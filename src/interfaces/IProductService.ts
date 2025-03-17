import { Request } from "express";
import { SuccessDto } from "../dto/success/SuccessDto.js";

export interface IProductService {
    createProduct(req: Request): Promise<SuccessDto>
    getAllActive(): Promise<SuccessDto>
    getOneProduct(req: Request): Promise<SuccessDto>
    updateProduct(req: Request): Promise<SuccessDto>
    archiveProduct(req: Request): Promise<SuccessDto>
}