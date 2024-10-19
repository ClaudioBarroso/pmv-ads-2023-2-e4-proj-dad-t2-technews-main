import { styled } from "styled-components";

// export const InputContainer = styled.input`
//   padding: 10px;
//   margin-bottom: 15px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   font-size: 1rem;

//   &:focus {
//     outline: none;
//     border-color: #007bff;
//   }
// `;

export const InputContainer = styled.input`
  flex: 1;

  min-height: 16px;
  max-height: 16px;

  border-radius: 6px;
  padding: 16px;
  margin: 12px 0;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;