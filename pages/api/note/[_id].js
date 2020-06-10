import { noteSchema } from './index';
import restHandler from '../../../lib/serverless/rest_api_handler';

export default async (req, res) => {
    const { query, method, body } = req;
    const { _id } = query;
    const queryHandler = connection => {
        const Note = connection.model('Note', noteSchema);
        return Note.findById(_id).exec();
    };
    restHandler(req, res, queryHandler);
};
