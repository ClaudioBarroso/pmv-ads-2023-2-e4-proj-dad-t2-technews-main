import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  background-color: #282c34;
  padding: 20px;
  color: white;
`;

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  h1 {
    font-size: 1.5rem;
    margin: 0;
  }
`;

export const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 15px;
`;

export const NavLink = styled.li`
  a {
    color: white;
    text-decoration: none;
    font-size: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Button = styled.button`
  padding: 5px, 10px;
  color: white;
  background-color: #0056b3;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
  &:hover {
    background-color: #004494;
  }
`
export const BtnHeader = styled.div`
  margin-left: auto; 
  display: flex;
`
;