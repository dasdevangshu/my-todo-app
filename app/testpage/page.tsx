import React from 'react';
import {auth, signIn, signOut} from 'auth';

import { encryptMessage, decryptMessage } from '@/lib/encryption';
import { generateEncryptionKey } from '@/lib/generateKey';

export default async function testpage() {

    const session = await auth();
    if (!session || !session.user) {
        await signIn();
    }

    const testString = 'Apple is a lie'
    // generateEncryptionKey()


    const encrypted = encryptMessage(testString)
    const decrypted = decryptMessage(encrypted)

    return (
        <>
            <div>testing here</div>
            <h1>{testString}</h1>
            <h1>{encrypted}</h1>
            <h1>{decrypted}</h1>
            <form action={async() => {'use server';await signOut()}}>
                <button type='submit'>Log Out</button>
            </form>
        </>
    )
}
