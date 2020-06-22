import { noteSchema } from './index';
import restHandler from '../../../lib/serverless/rest_api_handler';

export default async (req, res) => {
    const { query, method, body } = req;
    // const { _id } = query;

    const queryHandler = async connection => {
        const Note = connection.model('Note', noteSchema);

        switch (method) {
            case 'POST':
                const { note_id, parag_id, trans } = body;
                const note = await Note.findById(note_id).exec();
                const parag = note?.paragraphs.id(parag_id);

                if (parag) {
                    parag.trans = trans;
                    const savedDoc = await note.save();
                    return { trans: savedDoc.paragraphs.id(parag_id).trans };
                }
        }
    };
    restHandler(req, res, queryHandler);
};
