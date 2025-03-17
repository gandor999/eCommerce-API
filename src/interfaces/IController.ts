import { Router } from "express";

export interface IController {
    getRoute(): Router
}