import mongoose, { Schema } from 'mongoose';
import dbconn from '../../../lib/serverless/dbconn';
import restHandler from '../../../lib/serverless/rest_api_handler';

export const noteSchema = new Schema(
    {
        fromUserId: String,
        title: { type: String, trim: true, minlength: 1 },
        text: { type: String, trim: true, minlength: 1 },
    },
    { timestamps: true }
);

export default async (req, res) => {
    const { query, method, body } = req;
    const queryHandler = connection => {
        const Note = connection.model('Note', noteSchema);
        switch (method) {
            case 'GET':
                return Note.find({})
                    .sort('-updated')
                    .limit(10)
                    .select('title fromUserId updatedAt')
                    .exec();
            case 'POST':
                if (body.id) {
                    return Note.findByIdAndUpdate(
                        body.id,
                        { ...body },
                        { new: true }
                    ).exec();
                } else {
                    return Note.create(body);
                }
            default:
                return null;
        }
    };

    restHandler(req, res, queryHandler);
};
