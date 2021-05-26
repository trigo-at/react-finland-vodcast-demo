import React from 'react';
import {Heading, Text} from '@chakra-ui/react';

export const AccessDenied = () => (
    <>
        <Heading as="h1">Access Denied</Heading>
        <Text mt={2}>You must be signed in to view this page</Text>
    </>
);

export default AccessDenied;
