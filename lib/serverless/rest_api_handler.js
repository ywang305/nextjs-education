import mongoose, { Schema } from 'mongoose';
import dbconn from './dbconn';

export default async (req, res, queryHandler) => {
    const { query, method, body } = req;

    let connection;
    try {
        connection = await dbconn();

        switch (method) {
            case 'GET':
            case 'POST':
                const queryResult = await queryHandler(connection);
                res.status(200).json(
                    queryResult ?? { error: 'invalid username/password' }
                );
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (err) {
        res.status(500).json({
            error: err.message || 'something went wrong',
        });
    } finally {
        connection?.close();
    }
};
