import mongoose from 'mongoose';
export class SDatabase {
    constructor() {
        this.timeoutTime = 20000;
        this.timeoutCount = 0;
    }
    static getInstance() {
        return this.instance;
    }
    connectToDatabase(connectionString, port, server) {
        mongoose.connect(connectionString);
        const interval = setInterval(() => {
            this.timeoutCount += 1000;
            console.log("Connecting to mongodb database | Timeout count: " + this.timeoutCount / 1000);
            if (this.timeoutCount >= this.timeoutTime) {
                clearInterval(interval);
                console.log("Reached timeout");
            }
        }, 1000);
        mongoose.connection.once('open', () => {
            clearInterval(interval);
            console.log('\nNow connected to MongoDB Atlas');
            server.listen(port, () => {
                console.log(`API is now online on port ${port}`);
            });
        });
    }
}
SDatabase.instance = new SDatabase();
