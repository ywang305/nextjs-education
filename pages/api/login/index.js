import { Schema } from 'mongoose';
import restHandler from '../../../lib/serverless/rest_api_handler';

export const userSchema = new Schema({
    userId: String,
    password: String,
});

export default async (req, res) => {
    const { query, method, body } = req;

    const queryHandler = async connection => {
        const User = connection.model('User', userSchema);
        switch (method) {
            case 'POST':
                const { userId, password } = body;
                const foundUser = await User.findOne({
                    userId,
                    password,
                }).exec();
                return foundUser;
        }
    };
    restHandler(req, res, queryHandler);
};
