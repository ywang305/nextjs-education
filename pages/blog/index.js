import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const uri = 'https://raw.githubusercontent.com/ywang305/blog/main/blogs.md';

async function getBlogMd(onComplete) {
    const resp = await axios.get(uri);
    onComplete?.(resp.data);
}

export default function BlogPage() {
    const [md, setMd] = useState('');
    useEffect(() => {
        getBlogMd(setMd);
    }, []);

    return (
        <div>
            <ReactMarkdown linkTarget='_blank'>{md}</ReactMarkdown>
        </div>
    );
}
