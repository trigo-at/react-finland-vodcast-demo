import React, {useState, useEffect} from 'react';
import {useSession} from 'next-auth/client';
import {Heading, Text} from '@chakra-ui/react';
import Layout from '../components/layout';
import {AccessDenied} from '../components/access-denied';

const Protected = () => {
    const [session, loading] = useSession();
    const [content, setContent] = useState();

    // Fetch content from protected route
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/examples/protected');
            const json = await res.json();
            if (json.content) {
                setContent(json.content);
            }
        };
        fetchData();
    }, [session]);

    // When rendering client side don't display anything until loading is complete
    if (typeof window !== 'undefined' && loading) return null;

    // If no session exists, display access denied message
    if (!session) {
        return (
            <Layout>
                <AccessDenied />
            </Layout>
        );
    }

    // If session exists, display content
    return (
        <Layout>
            <Heading as="h1">Protected Page</Heading>
            <Text mt={2}>
                <strong>{content || '\u00a0'}</strong>
            </Text>
        </Layout>
    );
};

export default Protected;
