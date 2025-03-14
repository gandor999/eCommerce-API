var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import * as dotenv from 'dotenv';
import { Database } from './database/Database.js';
import { ErrorHandler } from './error_handling/ErrorHandler.js';
import { initServer } from './util/util.js';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        ErrorHandler.getInstance().listenToUnhandledErrors();
        const app = express();
        dotenv.config();
        initServer(app);
        // Connect to database
        Database.getInstance().connectToDatabase(process.env.DB, process.env.PORT || 4000, app);
        console.log(app._router.stack.map(layer => layer.name));
    });
}
main();
