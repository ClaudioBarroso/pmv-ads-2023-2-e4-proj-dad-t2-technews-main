import { useTheme } from "styled-components";
import { InputContainer } from "./styled";

const Input = ({...rest}) => {
  const { COLORS } = useTheme();

  return(
    <InputContainer placeholder={COLORS.GRAY_300}{...rest}/>
  )
};

export default Input;