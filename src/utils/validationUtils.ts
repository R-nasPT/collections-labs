// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const isValidPassword = (password) => {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Validate if a value is a number
export const isNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

// Validate if a value is not empty
export const isNotEmpty = (value) => {
  return value !== null && value !== undefined && value.trim().length > 0;
};
