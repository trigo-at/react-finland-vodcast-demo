import React from 'react';
import {useSession, getSession} from 'next-auth/client';
import {Heading, Text, Code} from '@chakra-ui/react';
import Layout from '../components/layout';

export default function Server() {
    // As this page uses Server Side Rendering, the `session` will be already
    // populated on render without needing to go through a loading stage.
    // This is possible because of the shared context configured in `_app.js` that
    // is used by `useSession()`.
    const [session] = useSession();

    return (
        <Layout>
            <Heading as="h1">Server Side Rendering</Heading>
            <Text mt={2}>
                This page uses the universal <strong>getSession()</strong>{' '}
                method in <strong>getServerSideProps()</strong>.
            </Text>
            <Text>
                Using <strong>getSession()</strong> in{' '}
                <strong>getServerSideProps()</strong> is the recommended
                approach if you need to support Server Side Rendering with
                authentication.
            </Text>
            <Heading as="h2">Session</Heading>
            <Code mt={2}>{JSON.stringify(session, null, 2)}</Code>
        </Layout>
    );
}

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context) {
    return {
        props: {
            session: await getSession(context),
        },
    };
}
