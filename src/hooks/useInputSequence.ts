import { RefObject, useCallback, useRef } from 'react';

// Ensure input fields are provided as tuple/array of strings
type InputFieldsTuple<T extends readonly string[]> = T extends readonly [] 
  ? never 
  : T;

// Type-safe input refs mapping
type InputRefs<T extends readonly string[]> = {
  readonly [K in T[number]]: RefObject<HTMLInputElement>;
};

interface UseInputSequenceProps<T extends readonly string[]> {
  inputFields: InputFieldsTuple<T>;
}

function useInputSequence<T extends readonly string[]>({ 
  inputFields 
}: UseInputSequenceProps<T>) {
  // Create refs with proper typing
  const inputRefs = useRef<InputRefs<T>>(
    inputFields.reduce((refs, fieldName) => {
      // Type assertion to ensure fieldName is a valid key
      return {
        ...refs,
        [fieldName as T[number]]: { current: null }
      };
    }, {} as InputRefs<T>)
  );

  const focusNextInput = useCallback(
    (currentInput: T[number]) => {
      const currentIndex = inputFields.indexOf(currentInput);
      const nextInput = inputFields[currentIndex + 1] as T[number] | undefined;

      if (nextInput) {
        const nextInputRef = inputRefs.current[nextInput];
        nextInputRef?.current?.focus();
      }
    },
    [inputFields]
  );

  return { 
    focusNextInput,
    inputRefs: inputRefs.current
  } as const;
};

export default useInputSequence;

// --------- example -------------

import React from 'react';
import useInputSequence from './useInputSequence'; // Adjust the import path

const MyForm = () => {
  const inputFieldNames = ['firstName', 'lastName', 'email'] as const;

  const { focusNextInput, inputRefs } = useInputSequence({
    inputFields: inputFieldNames
  });

  return (
    <form>
      <input
        name="firstName"
        ref={inputRefs.firstName}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            focusNextInput('firstName');
          }
        }}
        placeholder="First Name"
      />
      <input
        name="lastName"
        ref={inputRefs.lastName}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            focusNextInput('lastName');
          }
        }}
        placeholder="Last Name"
      />
      <input
        name="email"
        ref={inputRefs.email}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            focusNextInput('email');
          }
        }}
        placeholder="Email"
      />
    </form>
  );
};
