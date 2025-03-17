import { Router } from "express"

export interface IUserController {
    getUserRoutes(): Router
}