// นำเข้า libsodium
const sodium = require('libsodium-wrappers');

// ฟังก์ชันสำหรับเข้ารหัสข้อมูล
async function encryptData(message, key) {
    await sodium.ready;
    const nonce = sodium.crypto_secretbox_noncegen();
    const ciphertext = sodium.crypto_secretbox_easy(message, nonce, key);
    return { nonce, ciphertext };
}

// ฟังก์ชันสำหรับถอดรหัสข้อมูล
async function decryptData(ciphertext, nonce, key) {
    await sodium.ready;
    const decryptedMessage = sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);
    return decryptedMessage;
}


// ตัวอย่างการใช้งาน
(async () => {
    await sodium.ready;
    
    // สร้างคีย์สำหรับการเข้ารหัสและถอดรหัส
    const key = sodium.crypto_secretbox_keygen();

    // เข้ารหัสข้อความ
    const message = 'Hello, world!';
    const { nonce, ciphertext } = await encryptData(message, key);

    // ถอดรหัสข้อความ
    const decryptedMessage = await decryptData(ciphertext, nonce, key);
    console.log('Decrypted message:', decryptedMessage.toString());
})();
