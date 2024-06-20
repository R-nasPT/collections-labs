import CryptoJS from 'crypto-js';

const secretKey = process.env.CRYPTO_KEY;

// กำหนดการตั้งค่าทั่วไป
const keySize = 256;
const iterations = 1000;

function generateKeyAndIV() {
  const salt = CryptoJS.lib.WordArray.random(128 / 8);
  const key = CryptoJS.PBKDF2(secretKey, salt, { keySize: keySize / 32, iterations: iterations });
  const iv = CryptoJS.lib.WordArray.random(128 / 8);
  return { key, iv, salt };
}

function generateHMAC(ciphertext, key) {
  return CryptoJS.HmacSHA256(ciphertext, key).toString();
}

export function encrypt(message) {
  const { key, iv, salt } = generateKeyAndIV();
  const encrypted = CryptoJS.AES.encrypt(message, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  const ciphertext = encrypted.toString();
  const hmac = generateHMAC(ciphertext, key);

  // เราจำเป็นต้องเก็บ salt, iv และ hmac ไว้เพื่อใช้ในการถอดรหัส
  const result = {
    ciphertext: ciphertext,
    salt: salt.toString(),
    iv: iv.toString(),
    hmac: hmac
  };
  return JSON.stringify(result);
}

export function decrypt(encryptedMessage) {
  const jsonData = JSON.parse(encryptedMessage);
  const salt = CryptoJS.enc.Hex.parse(jsonData.salt);
  const iv = CryptoJS.enc.Hex.parse(jsonData.iv);
  const ciphertext = jsonData.ciphertext;
  const hmac = jsonData.hmac;

  const key = CryptoJS.PBKDF2(secretKey, salt, { keySize: keySize / 32, iterations: iterations });
  
  // ตรวจสอบความถูกต้องของ HMAC
  const newHmac = generateHMAC(ciphertext, key);
  if (newHmac !== hmac) {
    throw new Error('HMAC verification failed');
  }

  const decrypted = CryptoJS.AES.decrypt(ciphertext, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
  return decrypted.toString(CryptoJS.enc.Utf8);
}


// --- วิธีใช้งาน ---
import { encrypt, decrypt } from './crypto.js';

// ข้อความที่ต้องการเข้ารหัส
const message = 'Hello, World!';

// เข้ารหัส
const encryptedMessage = encrypt(message);
console.log('Encrypted:', encryptedMessage);

// ถอดรหัส
try {
  const decryptedMessage = decrypt(encryptedMessage);
  console.log('Decrypted:', decryptedMessage);
} catch (error) {
  console.error('Decryption failed:', error.message);
}
