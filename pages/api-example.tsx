import React from 'react';
import {Heading, Text, Box} from '@chakra-ui/react';
import Layout from '../components/layout';

const ApiExample = () => (
    <Layout>
        <Heading as="h1">API Example</Heading>
        <Text mt={2}>
            The examples below show responses from the example API endpoints.
        </Text>
        <Text fontStyle="italic">You must be signed in to see responses.</Text>
        <Heading as="h2">Session</Heading>
        <Text mt={2}>/api/examples/session</Text>
        <Box
            py={6}
            border="1px"
            as="iframe"
            title="session"
            src="/api/examples/session"
        />
    </Layout>
);

export default ApiExample;
