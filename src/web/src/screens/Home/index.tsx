import { useEffect, useState } from 'react';
import { fetchData, sendData } from '../../lib/axios';
import Header from '../../components/Header';
import './home.css'
import Button from '../../components/Button';

function Home() {
  const [data, setData] = useState<any[]>([]);  // Alterei para um array, pois a resposta é uma lista de posts

  useEffect(() => {
    fetchData()
      .then((response) => setData(response))
      .catch((error) => console.log(error));
  }, []);

  const handleSendData = () => {
    const dataToSend = { exempleField: `exampleValue` };

    sendData(dataToSend)
      .then((response) => setData(response))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <Header />
      <h1>Últimas Notícias</h1>
      {data.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        data.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <Button title="Leia a Notícia" link={post.link} />
            <p>Likes: {post.likes}</p>
          </div>
        ))
      )}
      <button onClick={handleSendData}>Enviar Dados</button>
    </div>
  );
}

export default Home;
