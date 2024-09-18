import crypto from "crypto";

const ENCRYPTION_KEY = (process.env.ENCRYPTION_KEY || 'defaultkey'.repeat(4)).slice(0, 32);

const IV_LENGTH = 16;

export function encrypt(text: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return Buffer.concat([iv, encrypted]).toString('base64');
  }
  
  export function decrypt(text: string): string {
    const buf = Buffer.from(text, 'base64');
    const iv = buf.subarray(0, IV_LENGTH);
    const encryptedText = buf.subarray(IV_LENGTH);
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }