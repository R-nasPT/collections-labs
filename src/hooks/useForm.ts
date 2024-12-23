import { useState, ChangeEvent, FormEvent } from 'react';

// Generic type parameter T extends object to ensure values are object type
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  callback: (values: T) => void
) => {
  const [values, setValues] = useState<T>(initialValues);

  // Handle changes for different input types
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Type-safe form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    callback(values);
  };

  // Reset form to initial values
  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    handleSubmit,
    resetForm,
  } as const; // Use const assertion for better type inference
};

// --------------- expample ----------------------

import React from 'react';
import { useForm } from './useForm';

const MyForm = () => {
  // กำหนดค่าตั้งต้นสำหรับฟอร์ม
  const initialValues = {
    username: '',
    email: '',
  };

  // Callback ที่จะเรียกใช้เมื่อฟอร์มถูก submit
  const onSubmit = () => {
    console.log('Form Submitted:', values);
  };

  // เรียกใช้งาน useForm
  const { values, handleChange, handleSubmit } = useForm(initialValues, onSubmit);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={values.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
