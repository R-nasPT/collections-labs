// ------------ function ------------
const CryptoJS = require('crypto-js');

// ฟังก์ชันสำหรับเข้ารหัสข้อมูล
function encryptData(message, key) {
    const ciphertext = CryptoJS.AES.encrypt(message, key).toString();
    return ciphertext;
}

// ฟังก์ชันสำหรับถอดรหัสข้อมูล
function decryptData(ciphertext, key) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
}

// ------------ advance -------------
import CryptoJS from 'crypto-js';

// กำหนดข้อความที่ต้องการเข้ารหัส
const message = 'Hello, World!';

// กำหนด key และ IV (Initialization Vector) สำหรับ AES
const key = CryptoJS.enc.Utf8.parse('1234567890123456');  // ใช้ key ขนาด 16 bytes (128 bits)
const iv = CryptoJS.enc.Utf8.parse('1234567890123456');   // ใช้ IV ขนาด 16 bytes (128 bits)

// Encrypt
const encrypted = CryptoJS.AES.encrypt(message, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
console.log('Encrypted:', encrypted.toString());

// Decrypt
const decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
console.log('Decrypted:', decrypted.toString(CryptoJS.enc.Utf8));


// ------------ simple --------------
import CryptoJS from 'crypto-js';

// Encrypt
const ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

// Decrypt
const bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
const originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText); // Output: my message


// ----------- Object encryption ----------
const CryptoJS = require("crypto-js");

const data = [{id: 1}, {id: 2}]

// Encrypt
const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();

// Decrypt
const bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

console.log(decryptedData); // [{id: 1}, {id: 2}]
