import { Request } from "express";
import { SuccessDto } from "../dto/success/SuccessDto.js";
import { UserDTO } from "../dto/UserDto.js";

export interface IUserService {
    registerUser(reqBody: UserDTO): Promise<SuccessDto>
    loginUser(reqBody: UserDTO): Promise<SuccessDto>
    setAdmin(req: Request): Promise<SuccessDto>
}