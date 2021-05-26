import React from 'react';
import {Container} from '@chakra-ui/react';
import Header from './header';

export default function Layout({children}) {
    return (
        <Container py={20}>
            <Header />
            <main>{children}</main>
        </Container>
    );
}
