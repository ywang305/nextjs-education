import mongoose from 'mongoose';

export default async () => {
    const connection = await mongoose.createConnection(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-1iam7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            bufferCommands: false,
            bufferMaxEntries: 0,
            useUnifiedTopology: true,
        }
    );
    return connection;
};
