import 'isomorphic-fetch';

function fixURL(url) {
    if (new RegExp('//').test(url)) {
        return url;
    }
    const { protocol, host } = location;
    const protohost = protocol + '//' + host;
    const locRegex = new RegExp(protohost, 'i');
    return locRegex.test(url) ? url : protohost + url;
}
function hasJsonContentType(response) {
    const contentType = response.headers.get('content-type');
    return (
        contentType &&
        (contentType.includes('application/json') ||
            contentType.includes('text/plain'))
    );
}

export async function fetchAsync(
    url,
    option = { method: 'GET', body: undefined }
) {
    const { method, body } = option;
    try {
        const response = await fetch(fixURL(url), {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return hasJsonContentType(response) ? response.json() : null;
    } catch (err) {
        console.error('fetchAsync: ', err.message);
        return null;
    }
}

export default fetchAsync;
