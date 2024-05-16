import crypto from 'crypto';

// Generate a random encryption key
export const generateEncryptionKey = (): string => {
    return crypto.randomBytes(32).toString('base64'); // Generate a 256-bit (32-byte) key
};

// Example usage
const encryptionKey = generateEncryptionKey();
console.log("Encryption Key:", encryptionKey);
