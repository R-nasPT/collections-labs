import { useState, ChangeEvent } from 'react';

type FormValues = Record<string, string | number | boolean>;

interface UseFormResult<T extends FormValues> {
  formState: T;
  handleFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setFormState: (value: T | ((prev: T) => T)) => void;
  resetForm: () => void;
}

function useForm<T extends FormValues>(initialState: T): UseFormResult<T> {
  const [formState, setFormState] = useState<T>(initialState);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  return {
    formState,
    handleFormChange,
    setFormState,
    resetForm
  };
}

export default useForm;

// ------------------ exaple ---------------------

// ตัวอย่างการใช้งานแบบเดิม
const ProductForm = () => {
  const { formState, handleFormChange } = useForm({
    productBarcode: "",
    boxCode: "",
    totalWeight: ""
  });

  return (
    <form>
      <input
        name="productBarcode"
        value={formState.productBarcode}
        onChange={handleFormChange}
      />
      {/* ... */}
    </form>
  );
};

// ตัวอย่างการใช้งานกับ form อื่น
const UserForm = () => {
  const { formState, handleFormChange, resetForm } = useForm({
    firstName: "",
    lastName: "",
    email: ""
  });

  return (
    <form>
      <input
        name="firstName"
        value={formState.firstName}
        onChange={handleFormChange}
      />
      {/* ... */}
      <button type="button" onClick={resetForm}>Reset</button>
    </form>
  );
};
