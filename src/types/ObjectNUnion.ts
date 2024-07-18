type StatusTypes = "draft" | "pending" | "printed" | "picked" | "packed" | "dispatched" | "cancelled";

// ใช้ Exclude
type TransportStatus1 = Exclude<StatusTypes, "cancelled" | "draft">;

// ใช้ Omit
type TransportStatus2 = Omit<StatusTypes, "cancelled" | "draft">;

// ทั้งสองวิธีให้ผลลัพธ์เหมือนกันในกรณีนี้ เนื่องจาก StatusTypes เป็น union ของ string literals
// แต่โดยทั่วไป:

// Exclude เหมาะกับ union types
// Omit เหมาะกับ object types

// ในกรณีนี้ Exclude อาจจะเหมาะสมกว่าเล็กน้อย เพราะเรากำลังทำงานกับ union type โดยตรง แต่ทั้งสองวิธีใช้ได้และให้ผลลัพธ์ที่ถูกต้อง
======================================================================================================

  // ตัวอย่าง object type
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

// ใช้ Omit
type PublicUser = Omit<User, "password" | "email">;
// PublicUser จะมี properties: id, name, role

// ใช้ Exclude (ไม่เหมาะสมกับ object types)
type IncorrectAttempt = Exclude<User, "password" | "email">;
// IncorrectAttempt จะเป็น never type เพราะ Exclude ไม่สามารถทำงานกับ object types ได้อย่างที่เราต้องการ

// ตัวอย่างการใช้ Exclude กับ union type ของ property names
type UserKeys = keyof User;
type PublicUserKeys = Exclude<UserKeys, "password" | "email">;
// PublicUserKeys จะเป็น "id" | "name" | "role"
