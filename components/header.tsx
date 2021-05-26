import React from 'react';
import Link from 'next/link';
import {signIn, signOut, useSession} from 'next-auth/client';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Button,
    UnorderedList,
    ListItem,
    Box,
} from '@chakra-ui/react';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
    const [session, loading] = useSession();

    console.log(session);

    return (
        <header>
            <div>
                <p>
                    {!session && (
                        <Alert status="info">
                            <AlertIcon />
                            <AlertTitle>You are not signed in</AlertTitle>

                            <Button
                                position="absolute"
                                isLoading={loading}
                                right="4px"
                                top="4px"
                                onClick={() => signIn()}>
                                Sign in
                            </Button>
                        </Alert>
                    )}
                    {session && (
                        <Alert status="success">
                            <AlertIcon />
                            <AlertTitle mr={2}>Signed in as</AlertTitle>
                            <AlertDescription>
                                {session.user.email || session.user.name}
                            </AlertDescription>
                            <Button
                                position="absolute"
                                isLoading={loading}
                                right="4px"
                                top="4px"
                                onClick={() => signOut()}>
                                Sign out
                            </Button>
                        </Alert>
                    )}
                </p>
            </div>
            <Box as="nav" py={6}>
                <UnorderedList>
                    <ListItem>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href="/protected">
                            <a>Protected</a>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href="/api-example">
                            <a>API Example</a>
                        </Link>
                    </ListItem>

                    <ListItem>
                        <Link href="/server">
                            <a>SSR Example</a>
                        </Link>
                    </ListItem>
                </UnorderedList>
            </Box>
        </header>
    );
}
