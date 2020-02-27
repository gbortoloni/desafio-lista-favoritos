import mongoose from 'mongoose';

class Database {
    constructor() {
        this.mongo();
    }

    mongo() {
        this.mongoConnection = mongoose.connect(process.env.MONGO_TESTE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: true,
        });
    }
}

export default new Database();
