import React, { useState } from 'react';

type NewsType = {
  title: string;
  link: string;
};

const EditNews = () => {
  const [news, setNews] = useState<NewsType>({
    title: '',
    link: ''
  });

  // Função handleInputChange para lidar com alterações nos inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNews({
      ...news,
      [name]: value
    });
  };

  return (
    <div>
      <h2>Editar Notícia</h2>
      <form>
        <div>
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={news.title}
            onChange={handleInputChange}  // Chama a função quando o valor muda
          />
        </div>
        <div>
          <label>Link</label>
          <textarea
            name="link"
            value={news.link}
            onChange={handleInputChange}  // Chama a função quando o valor muda
          />
        </div>
      </form>
    </div>
  );
};

export default EditNews;
