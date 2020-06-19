import { noteSchema } from './index';
import restHandler from '../../../lib/serverless/rest_api_handler';

export default async (req, res) => {
    const { query, method, body } = req;

    const queryHandler = async connection => {
        const Note = connection.model('Note', noteSchema);

        switch (method) {
            case 'POST':
                const { note_id, parag_id, urls } = body;
                const note = await Note.findById(note_id).exec();

                if (note) {
                    if (!urls?.length)
                        return note.paragraphs.id(parag_id)?.images;
                    const images = note.paragraphs.id(parag_id).images;
                    images.push(...urls);
                    note.paragraphs.id(parag_id).images = images.slice(-3);
                    const savedDoc = await note.save();
                    return savedDoc.paragraphs.id(parag_id)?.images;
                }
        }
    };
    restHandler(req, res, queryHandler);
};
