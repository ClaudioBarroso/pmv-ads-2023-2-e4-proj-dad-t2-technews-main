import React from 'react';
import { HeaderContainer, Button, BtnHeader } from './styled';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Cookies from 'js-cookie';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    console.log('Before logout, cookie:', Cookies.get('.AspNetCore.Cookies'));
    Cookies.remove('.AspNetCore.Cookies', { path: '/' });
    console.log('After logout, cookie:', Cookies.get('.AspNetCore.Cookies'));
    logout();
    navigate('/');
  };

  return (
    <HeaderContainer>
      <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        Tech News
        
      </h1>
      <BtnHeader>
      {isLoggedIn ? (
    <>
       <Button onClick={() => navigate('/addNews')}>Adicionar Notícia</Button> {/* Show Add News button if logged in */}
       <Button onClick={handleLogout}>Logout</Button> {/* Show Logout button if logged in */}
    </>
      ) : (
        <Button onClick={() => navigate('/login')}>Login</Button> // Show Login button if logged out
      )}
      </BtnHeader>
    </HeaderContainer>
  );
};

export default Header;
