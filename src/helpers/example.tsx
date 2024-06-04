import { isAuthenticated, login, logout } from './helpers/authHelper';
import { saveToLocalStorage, getFromLocalStorage } from './helpers/storageHelper';
import { isEmailValid, isPasswordStrong } from './helpers/validationHelper';
import { getAuthHeaders, handleApiResponse } from './helpers/apiHelper';

const MyComponent = () => {
  const handleLogin = async (email: string, password: string) => {
    if (!isEmailValid(email)) {
      console.error('Invalid email');
      return;
    }
    if (!isPasswordStrong(password)) {
      console.error('Weak password');
      return;
    }

    try {
      const response = await fetch('https://api.example.com/login', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ email, password }),
      });

      const data = await handleApiResponse(response);
      login(data.token);
      saveToLocalStorage('user', JSON.stringify(data.user));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <button onClick={() => handleLogin('test@example.com', 'Password123!')}>Login</button>
      {isAuthenticated() ? <button onClick={logout}>Logout</button> : null}
    </div>
  );
};

export default MyComponent;
