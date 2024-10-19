import React from 'react';
import { ButtonContainer, ButtonTitle } from './styled';

interface Props {
  title: string;
  onClick?: () => void;
  link?: string; // Adicione a prop para o link
}

const Button: React.FC<Props> = ({ title, onClick, link, ...rest }) => {
  const handleClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener noreferrer'); // Abre o link em uma nova aba
    } else if (onClick) {
      onClick(); // Executa a função onClick se houver
    }
  };

  return (
    <ButtonContainer onClick={handleClick} {...rest}>
      <ButtonTitle>{title}</ButtonTitle>
    </ButtonContainer>
  );
};

export default Button;
