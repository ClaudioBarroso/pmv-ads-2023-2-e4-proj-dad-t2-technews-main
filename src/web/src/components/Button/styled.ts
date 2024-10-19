import { styled } from "styled-components";

export const ButtonContainer = styled.button`
  padding: 10px;
  background-color: #007bff;
  margin-left: 10px;
  margin-right: 10px;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ButtonTitle = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  color: ${({ theme }) => theme.WHITE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
