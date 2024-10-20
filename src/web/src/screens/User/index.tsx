import React, { useEffect, useState } from 'react';

interface UserType {
  name: string;
  email: string;
  // Adicione outras propriedades conforme necessário
}

const User = () => {
  const [user, setUser] = useState<UserType | null>(null); // Define o tipo do estado

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5195/api/user/'); // Trocar pela sua API real
        const data: UserType = await response.json(); // Especifica o tipo dos dados recebidos
        setUser(data); // Atualiza o estado com os dados do usuário
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };
    fetchUserData();
  }, []);

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      <p><strong>Nome:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Adicione mais informações do usuário conforme necessário */}
    </div>
  );
};

export default User;
