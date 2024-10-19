import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpContainer, Form, ErrorMessage } from './styled';
import { signUpData } from '../../lib/axios';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await signUpData(name, email, password);

      // Check if signup was successful
      if (response.status === 201) {
        console.log('Signup successful');
        navigate('/');
      }
    } catch (err) {
      console.error('Signup failed:', err);
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
    <SignUpContainer>
      <Header />
      <h2>Cadastro</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="name"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setName(e.target.value)
          }
          required
        />

        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setEmail(e.target.value)
          }
          required
        />

        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setPassword(e.target.value)
          }
          required
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button title="Cadastrar" />
      </Form>
    </SignUpContainer>
  );
};

export default SignUp;
