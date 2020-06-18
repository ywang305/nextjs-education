import 'isomorphic-fetch';
import { resolveHookState } from 'react-use/lib/util/resolveHookState';

export default async (req, res) => {
    const { query, method, body } = req;
    const { qword } = query;

    const response = await fetch(
        'https://dict.eudic.net/dicts/prefix/' + qword
    );
    const list = await response.json();
    res.status(200).json({ label: list?.[0]?.label });
};
