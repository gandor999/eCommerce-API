import mongoose from 'mongoose'
import { Application } from 'express';

export class Database {
    private static instance: Database = new Database();
    private timeoutTime = 60000
    private timeoutCount = 0;

    public static getInstance(): Database {
        return this.instance
    }

    public connectToDatabase(
        connectionString: string,
        port: string | number,
        server: Application
    ) {
        console.log("connectionString: " + connectionString)
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

            // ;(async () => {
            //     server.listen(port, () => {
            //         console.log(`API is now online on port ${port}`)
            //     })
            // })()

            server.listen(port, () => {
                console.log(`API is now online on port ${port}`)
            })
        })
    }
}