import 'isomorphic-fetch';
import FormData from 'form-data';
import { resolveHookState } from 'react-use/lib/util/resolveHookState';

export default async (req, res) => {
    const { query, method, body } = req;
    const { qword } = query;

    // jinshan_ciba
    const response = await fetch(
        'https://dict.iciba.com/dictionary/word/suggestion?word=' +
            qword +
            '&nums=1&is_need_mean=1'
    );
    const { message } = await response.json();

    let label = message?.[0]?.means
        ?.map(({ part, means }) => {
            return part + ' ' + means.join(', ');
        })
        .join('; ');

    if (!label) {
        // eudic
        const resp = await fetch(
            'https://dict.eudic.net/dicts/prefix/' + qword
        );
        const list = await resp.json();
        label = list?.[0]?.label;
    }

    res.status(200).json({ label });
};
