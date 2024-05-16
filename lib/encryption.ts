import crypto from 'crypto';

const encryptionAlgorithm = 'aes-256-cbc';

// Retrieve encryption key from environment variable
const encryptionKey = process.env.ENCRYPTION_KEY;

if (!encryptionKey) {
    throw new Error('Encryption key is not provided in environment variables.');
}

export function encryptMessage(message: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(encryptionAlgorithm, Buffer.from(encryptionKey as string, 'base64'), iv);
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

export function decryptMessage(encryptedMessage: string): string {
    const [ivHex, encryptedHex] = encryptedMessage.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(encryptionAlgorithm, Buffer.from(encryptionKey as string, 'base64'), iv);
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
