import styled from 'styled-components';

export const SignUpContainer = styled.div`
  /* max-width: 400px; */
  /* margin: auto; */
  /* padding: 20px; */
  /* border: 1px solid #ccc; */
  /* border-radius: 8px; */
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-top: -12px;
  margin-bottom: 16px;
`;
