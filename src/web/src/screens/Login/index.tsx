import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContainer, LoginForm, FormTitle, ErrorMessage } from './styled';
import { useAuth } from '../../context/AuthContext';
import { loginData } from '../../lib/axios';
import Cookies from 'js-cookie';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Header from '../../components/Header';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginData(email, password);

      // console.log('after loggin ,cookie:', document.cookie);
      console.log(
        'after login the cookie is:',
        Cookies.get('.AspNetCore.Cookies')
      );
      login();
      console.log('Login successful!', response);
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <LoginContainer>
      <Header />
      <LoginForm onSubmit={handleSubmit}>
        <FormTitle>Login</FormTitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setEmail(e.target.value)
          }
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setPassword(e.target.value)
          }
          required
        />

        <Button title="Login" />

        <Button onClick={handleSignup} title="Cadastrar" />
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;
