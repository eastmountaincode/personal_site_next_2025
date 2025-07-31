// src/components/MDXContent.tsx
'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '../../mdx-components';

type Props = { source: string };

export default function MDXContent({ source }: Props) {
    const components = useMDXComponents();
    return <MDXRemote source={source} components={components} />;
}
