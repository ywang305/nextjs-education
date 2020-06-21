import { Schema } from 'mongoose';
import restHandler from '../../../lib/serverless/rest_api_handler';
import { userSchema } from './index';

export default async (req, res) => {
    const { query, method, body } = req;

    const queryHandler = async connection => {
        const User = connection.model('User', userSchema);
        switch (method) {
            case 'POST':
                const { userId, password } = body;
                const foundUser = await User.findOne({
                    userId,
                }).exec();
                if (userId === foundUser?.userId) {
                    return {
                        error: `The username ${userId} has already existed`,
                    };
                }
                const user = await User.create({ userId, password });
                return user;
        }
    };
    restHandler(req, res, queryHandler);
};
