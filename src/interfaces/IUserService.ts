import { Request } from "express";
import { SuccessDto } from "../dto/success/SuccessDto.js";
import { UserDto } from "../dto/UserDto.js";

export interface IUserService {
    registerUser(reqBody: UserDto): Promise<SuccessDto>
    loginUser(reqBody: UserDto): Promise<SuccessDto>
    setAdmin(req: Request): Promise<SuccessDto>
}