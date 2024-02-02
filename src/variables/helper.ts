import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventEmitter from "events";

export const eventEmitter = new EventEmitter();

// export const backend_url = "http://localhost:8080/api/v1/";
export const backend_url = "https://ybt689k9fa.execute-api.ap-south-1.amazonaws.com/development/api/v1/";


export const EncryptionKey = "qwertyuioplkjhgfdsa"

export const handle500Error = (error: string) => {
    if (error.includes("500")) {
        toast.warning('Facing Internet issue', { ...toastCss });
    }
}

export const toastCss = {
    autoClose: 2000,
    draggable: true,
    theme: 'light',
    hideProgressBar: true
}

// Function to convert an object to a string
export function objectToString(obj: any) {
    return JSON.stringify(obj);
}

// Function to convert a string to an object
export function stringToObject(str: string) {
    return JSON.parse(str);
}

// Function to encrypt an object
export async function encryptObject(objectToEncrypt: any) {
    try {
        const stringToEncrypt = objectToString(objectToEncrypt);
        const encoder = new TextEncoder();
        const keyBuffer = await crypto.subtle.importKey('raw', encoder.encode(EncryptionKey), { name: 'AES-GCM', length: 256 }, true, ['encrypt']);
        
        const iv = crypto.getRandomValues(new Uint8Array(12));
        
        const dataBuffer = encoder.encode(stringToEncrypt);
        
        const encryptedBuffer = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            keyBuffer,
            dataBuffer
        );
        const encryptedData = new Uint8Array([...iv, ...new Uint8Array(encryptedBuffer)]);
        return objectToString(encryptedData);
        
    } catch (error) {
        console.error('Encryption error:', error);
        // throw error;
    }
}

// Function to decrypt an object
export async function decryptObject(encryptedData: any) {
    try {
        // Extract the IV from the encrypted data
        const iv = encryptedData.slice(0, 12);

        // Extract the encrypted data (excluding the IV)
        const dataBuffer = encryptedData.slice(12);

        // Convert the key to an ArrayBuffer
        const encoder = new TextEncoder();
        const keyBuffer = await crypto.subtle.importKey('raw', encoder.encode(EncryptionKey), 'AES-GCM', true, ['decrypt']);

        // Decrypt the data
        const decryptedBuffer = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            keyBuffer,
            dataBuffer
        );

        // Convert the decrypted ArrayBuffer to a string
        const decryptedString = new TextDecoder().decode(decryptedBuffer);

        // Convert the string back to an object
        const decryptedObject = stringToObject(decryptedString);

        console.log('Decrypted data:', decryptedObject);
        return decryptedObject;
    } catch (error) {
        console.error('Decryption error:', error);
        throw error;
    }
}



