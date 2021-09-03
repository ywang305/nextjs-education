import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';

const uri =
    'https://raw.githubusercontent.com/ywang305/nextjs-education/master/pages/blog/blogs.md';

async function getBlogMd(onComplete) {
    const resp = await axios.get(uri);
    onComplete?.(resp?.data);
}

export default function BlogPage() {
    const [md, setMd] = useState(null);
    useEffect(() => {
        getBlogMd(setMd);
    }, []);

    return (
        <div>
            <a href='https://github.com/ywang305/nextjs-education/edit/master/pages/blog/blogs.md'>
                编辑 Markdown
            </a>
            <a href='https://github.com/ywang305/nextjs-education/edit/master/pages/blog/blogs.md'>
                编辑 Markdown ( dev mode )
            </a>
            <br />
            <ReactMarkdown renderers={{ link: Link }}>{md}</ReactMarkdown>
        </div>
    );
}

const Link = props => {
    const {
        node: { children },
        href,
    } = props;
    const { value: title } = children[0];

    return (
        <a href={href} target='_blank'>
            {title}
        </a>
    );
};
