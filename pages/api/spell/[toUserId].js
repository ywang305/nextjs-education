import dbconn from '../../../lib/api/dbconn';
import { spellSchema } from './index';

export default async (req, res) => {
    const connection = await dbconn();
    try {
        const Spell = connection.model('Spell', spellSchema);
        const { query, method, body } = req;
        switch (method) {
            case 'GET':
                const { toUserId } = query;
                Spell.find({ toUserId }, (err, docs) => {
                    if (err) {
                        connection.close();
                        res.status(500).json({ err });
                    } else {
                        res.status(200).json(docs);
                        connection.close();
                    }
                });
                break;
            default:
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (e) {
        connection.close();
        res.status(500).json({ error: e.message || 'something went wrong' });
    }
};
