import { noteSchema } from './index';
import restHandler from '../../../lib/serverless/rest_api_handler';

export default async (req, res) => {
    const { query, method, body } = req;
    // const { _id } = query;

    const queryHandler = async connection => {
        const Note = connection.model('Note', noteSchema);

        switch (method) {
            case 'POST': {
                const { note_id, parag_id, comments } = body;
                const note = await Note.findById(note_id).exec();

                if (note) {
                    if (!comments?.length)
                        return note.paragraphs.id(parag_id)?.comments;

                    note.paragraphs.id(parag_id)?.comments.push(...comments);
                    const savedDoc = await note.save();
                    return savedDoc.paragraphs.id(parag_id)?.comments;
                }
            }

            case 'DELETE': {
                const { note_id, parag_id, comment_id } = body;
                const note = await Note.findById(note_id).exec();
                note?.paragraphs
                    ?.id(parag_id)
                    ?.comments?.id(comment_id)
                    ?.remove();
                await note.save();
                return { result: true };
            }
        }
    };
    restHandler(req, res, queryHandler);
};
