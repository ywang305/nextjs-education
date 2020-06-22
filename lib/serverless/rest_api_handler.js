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
            case 'DELETE':
                const queryResult = await queryHandler(connection);
                res.status(200).json(queryResult);
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
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
