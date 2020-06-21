import mongoose, { Schema } from 'mongoose';
import dbconn from '../../../lib/serverless/dbconn';
import restHandler from '../../../lib/serverless/rest_api_handler';

export const commentSchema = new Schema(
    {
        fromUserId: { type: String, default: 'anonymous' },
        text: String,
    },
    { timestamps: true }
);

export const paragraphSchema = new Schema({
    text: String,
    trans: String,
    comments: [commentSchema],
    images: [String], //urls
});

export const noteSchema = new Schema(
    {
        fromUserId: String,
        book: String,
        title: { type: String, trim: true, minlength: 1 },
        paragraphs: [paragraphSchema],
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
                    .select('book title fromUserId updatedAt')
                    .sort('-updated')
                    .exec();
            case 'POST':
                const { book, title, fromUserId, text, transText } = body;

                const paragraphs = text
                    ?.replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
                    .split('|')
                    ?.map(text => {
                        return { text };
                    });
                return Note.create({
                    paragraphs,
                    title,
                    book,
                    fromUserId,
                });

            // if (body.id) {
            //     const
            //     return Note.findByIdAndUpdate(
            //         body.id,
            //         { paragraphs, title, book, fromUserId },
            //         { new: true }
            //     ).exec();
            // } else {
            //     const paragraphTextArr =
            //         text
            //             ?.replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
            //             .split('|') ?? [];
            //     const paragraphs = paragraphTextArr.map(t => ({ text: t }));
            //     return Note.create({ paragraphs, title, book, fromUserId });
            // }
            default:
                return null;
        }
    };

    restHandler(req, res, queryHandler);
};
