import React from 'react';
import { useAuth } from './hooks/useAuth';
import { useFetch } from './hooks/useFetch';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useForm } from './hooks/useForm';

const MyComponent = () => {
  const { authenticated, login, logout } = useAuth();
  const { data, loading, error } = useFetch('https://api.example.com/data');
  const [user, setUser] = useLocalStorage('user', null);
  const { values, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    () => {
      login(values.email, values.password);
    }
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {authenticated ? <button onClick={logout}>Logout</button> : null}
      {loading ? <p>Loading...</p> : <p>Data: {JSON.stringify(data)}</p>}
      {error && <p>Error: {error}</p>}
      <p>User: {JSON.stringify(user)}</p>
    </div>
  );
};

export default MyComponent;
