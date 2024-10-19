import styled from 'styled-components';

export const LoginContainer = styled.div`
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  /* height: 100vh; */
  /* background-color: #f4f4f4; */
`;

export const LoginForm = styled.form`
  background-color: white;
  /* padding: 40px; */
  border-radius: 10px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  display: flex;
  flex-direction: column;
  /* width: 300px; */
`;

export const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 15px;
`;
