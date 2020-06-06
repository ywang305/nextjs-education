import mongoose, { Schema } from 'mongoose';
import dbconn from '../../../lib/api/dbconn';

export const spellSchema = new mongoose.Schema({
    fromUserId: String,
    toUserId: String,
    words: { type: String, trim: true, minlength: 1 },
    createdAt: { type: Date, default: Date.now, expires: 7200 },
});

export default async (req, res) => {
    const connection = await dbconn();
    try {
        const Spell = connection.model('Spell', spellSchema);
        const { query, method, body } = req;
        switch (method) {
            case 'POST':
                Spell.create({ ...body }, (error, doc) => {
                    if (error) {
                        connection.close();
                        res.status(500).json({ error });
                    } else {
                        res.status(200).json(doc);
                        connection.close();
                    }
                });
                break;
            case 'GET':
                Spell.find({})
                    .sort('-updated')
                    .limit(10)
                    .exec((err, docs) => {
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
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (e) {
        connection.close();
        res.status(500).json({ error: e.message || 'something went wrong' });
    }
};
