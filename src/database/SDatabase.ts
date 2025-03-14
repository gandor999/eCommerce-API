import mongoose from 'mongoose'
import { DatabaseNotConnectedException } from '../error_handling/error_types/DatabaseNotConnectedException.js';
import { Application } from 'express';
import { ErrorHandler } from '../error_handling/ErrorHandler.js';

export class SDatabase {
    private static instance: SDatabase = new SDatabase();
    private timeoutTime = 20000
    private timeoutCount = 0;

    public static getInstance(): SDatabase {
        return this.instance
    }

    public connectToDatabase(
        connectionString: string,
        port: string | number,
        server: Application
    ) {
        mongoose.connect(connectionString)

        const interval = setInterval(() => {
            this.timeoutCount += 1000
            console.log("Connecting to mongodb database | Timeout count: " + this.timeoutCount / 1000)
            if (this.timeoutCount >= this.timeoutTime) {
                clearInterval(interval)
                console.log("Reached timeout")
            }
        }, 1000)

        mongoose.connection.once('open', () => {
            clearInterval(interval)
            console.log('\nNow connected to MongoDB Atlas')

            server.listen(port, () => {
                console.log(`API is now online on port ${port}`)
            })
        })

    }
}