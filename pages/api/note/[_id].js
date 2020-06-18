import { noteSchema } from './index';
import restHandler from '../../../lib/serverless/rest_api_handler';

export default async (req, res) => {
    const { query, method, body } = req;
    const { _id } = query;

    const queryHandler = connection => {
        const Note = connection.model('Note', noteSchema);

        switch (method) {
            case 'GET':
                return Note.findById(_id).exec();
            case 'POST':
                const { book, title, fromUserId, paragraphs } = body;

                return Note.findByIdAndUpdate(
                    _id,
                    { paragraphs, title, book, fromUserId },
                    { new: true }
                ).exec();
        }
    };
    restHandler(req, res, queryHandler);
};
