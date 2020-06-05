function fixURL(url) {
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
    const response = await fetch(fixURL(url), {
        method: option.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(option.body),
    });
    return hasJsonContentType(response) ? response.json() : null;
}

export default fetchAsync;
