const sodium = require('libsodium-wrappers');

(async() => {
    // รอจนกว่าจะโหลด Libsodium เสร็จสิ้น
    await sodium.ready;

    // สร้างคีย์สำหรับการเข้ารหัส
    const key = sodium.randombytes_buf(sodium.crypto_secretbox_KEYBYTES);

    // ข้อความที่ต้องการเข้ารหัส
    const message = "นี่คือข้อความที่ต้องการเข้ารหัส";
    
    // สร้าง nonce (ค่าไม่ซ้ำ) สำหรับการเข้ารหัส
    const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

    // เข้ารหัสข้อความ
    const encryptedMessage = sodium.crypto_secretbox_easy(message, nonce, key);

    console.log("ข้อความที่เข้ารหัส:", sodium.to_base64(encryptedMessage));
    console.log("Nonce:", sodium.to_base64(nonce));
    console.log("Key:", sodium.to_base64(key));

    // ถอดรหัสข้อความ
    const decryptedMessage = sodium.crypto_secretbox_open_easy(encryptedMessage, nonce, key);

    console.log("ข้อความที่ถอดรหัส:", sodium.to_string(decryptedMessage));
})();



// -------------- function -------------
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
