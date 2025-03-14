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
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { SDatabase } from './database/SDatabase.js';
import { ErrorHandler } from './error_handling/ErrorHandler.js';
process.on('uncaughtException', error => {
    console.log('Uncaught Exception detected!');
    ErrorHandler.getInstance().handleErrors(error);
});
process.on('unhandledRejection', reason => {
    console.log('Unhandled Promise Rejection detected!');
    ErrorHandler.getInstance().handleErrors(reason);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express();
        dotenv.config();
        app.use(express.json());
        app.use(cors());
        app.use(express.urlencoded({ extended: true }));
        // All users routes
        app.use('/users', userRoutes);
        // All products routes
        app.use('/products', productRoutes);
        ErrorHandler.getInstance().registerMiddlerWareErrorHandler(app);
        // Connect to database
        SDatabase.getInstance().connectToDatabase(process.env.DB, process.env.PORT || 4000, app);
        console.log(app._router.stack.map(layer => layer.name));
    });
}
main();
