# Arquitetura da Solução

A solução foi arquitetada para atender tanto a aplicações web quanto mobile, utilizando uma API robusta e escalável. A API foi desenvolvida em C# com .NET, permitindo fácil integração e flexibilidade no desenvolvimento. O banco de dados utilizado é o MongoDB, que nos oferece escalabilidade e alto desempenho no armazenamento e recuperação de dados.

## Camadas da Arquitetura
### Camada de Apresentação (Web e Mobile):

Aplicação Web: A interface web se comunica diretamente com a API via chamadas HTTP (REST). Os usuários podem acessar o sistema por meio de navegadores, realizando operações como visualização de dados, envio de formulários e interações com recursos dinâmicos. O front-end será desenvolvido utilizando frameworks modernos como React ou Angular, que facilitam a integração com a API.
Aplicativo Mobile: A aplicação mobile, desenvolvida para plataformas iOS e Android, utiliza o mesmo conjunto de endpoints da API REST para sincronizar dados com o servidor. O aplicativo comunica-se com a API via HTTP, utilizando a biblioteca Axios para o consumo dos dados em formato JSON.

### API (Camada de Negócio):

A API é o núcleo da solução, responsável por toda a lógica de negócio e comunicação entre o front-end (web/mobile) e o banco de dados MongoDB. Cada endpoint da API é bem definido para permitir operações como criação, leitura, atualização e exclusão (CRUD) de dados, seguindo as melhores práticas de RESTful.

### Banco de Dados (MongoDB):

O MongoDB, sendo um banco de dados NoSQL orientado a documentos, é ideal para o armazenamento de dados não estruturados e semi-estruturados, como os que frequentemente surgem em aplicações que interagem tanto com web quanto mobile. A escolha do MongoDB também facilita a flexibilidade na modelagem de dados, permitindo uma evolução mais rápida da estrutura do banco sem a necessidade de alterações complexas no esquema.
No banco de dados, cada coleção armazena documentos no formato BSON (Binary JSON), que são facilmente serializados/deserializados nas aplicações cliente via JSON.

### Fluxo de Comunicação

- Requisição HTTP (Front-End): O usuário interage com a aplicação (seja via web ou mobile), e uma requisição HTTP é feita para a API. Dependendo da operação solicitada (por exemplo, obter informações de um usuário), a API processa a solicitação.

- Processamento na API: Ao receber a requisição, a API valida os dados e interage com o MongoDB para realizar a operação. Por exemplo, para uma requisição de leitura, a API consulta o MongoDB para obter os dados relevantes.

- Resposta para o Cliente: Após processar a requisição, a API retorna uma resposta em formato JSON para o cliente. O front-end, seja na aplicação web ou mobile, exibe os dados processados para o usuário.

### Segurança e Autenticação

A autenticação é gerenciada por tokens JWT (JSON Web Token), garantindo que apenas usuários autenticados tenham acesso a operações sensíveis. A comunicação entre o front-end e a API é sempre realizada por meio de HTTPS, garantindo a proteção dos dados em trânsito.

![Arquitetura da Solução](img/api_web_mobile.png)

## Diagrama de Classes

![Diagrama de Classes](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t2-technews/blob/main/docs/img/diagrama%20de%20classes.png)


## Documentação de Implementação da Web API Rest
### Visão Geral

A Web API Rest desenvolvida fornece funcionalidades para a plataforma de compartilhamento de notícias. A API segue os princípios RESTful, com suporte para operações CRUD (Create, Read, Update, Delete) e autenticação JWT para segurança.

### Principais Tecnologias Utilizadas

- ASP.NET Core (Back-end)
- MongoDB (Banco de dados)
- Swagger (Documentação automática da API)
- JWT (JSON Web Tokens) (Autenticação)

## Configurações de Ambiente
### Requisitos de Sistema

- SO: Linux Ubuntu 20.04+ ou Windows 10+
- Framework: .NET Core 
- Banco de Dados: MongoDB 
- IDE Recomendada: Visual Studio Code ou Visual Studio 2022

  Observação: É necessário instalar as dependências .NET Core e MongoDB

## Documentação do Banco de Dados MongoDB e Modelagem dos Dados

Este documento descreve a estrutura e o esquema do banco de dados não relacional utilizado por nosso projeto, baseado em MongoDB. O MongoDB é um banco de dados NoSQL que armazena dados em documentos JSON (ou BSON, internamente), permitindo uma estrutura flexível e escalável para armazenar e consultar dados.

### Estrutura da Base de Dados

Coleção: User
```Json
{
    "id": "string",
    "name": "string",
    "email": "string",
    "passwordHash": "string",
    "password": "string"
    "profile": 0
}
```

Coleção: News
```Json
 {
    "id": "string",
    "title": "string",
    "link": "string",
    "userId": "string",
    "likes": 0
  }
```
## Autenticação
### JWT (JSON Web Token):

A autenticação é realizada utilizando tokens JWT. O fluxo de autenticação envolve:

1. O usuário fornece suas credenciais (e-mail e senha).
2. Se as credenciais forem válidas, um token JWT é gerado e retornado.
3. Para acessar rotas protegidas, o cliente deve enviar o token no cabeçalho: "Authorization: Bearer <token>".

## Recursos e Rotas
### News

GET
/api/News
- Retorna todas as notícias

POST
/api/News
- Cria nova notícia

GET
/api/News/{id}
- Retorna a notícia pelo id

PUT
/api/News/{id}
- Atualiza notícia pelo 

DELETE
/api/News/{id}
- Deleta notícia pelo id

POST
/api/News/{id}/like
- Curte notícia e incrementa contador
  
### User

GET
/api/User
- Retorna todos os usuários
  
POST
/api/User
- Cria um novo usuário
  
GET
/api/User/{id}
- Retorna o usuário pelo id
  
PUT
/api/User/{id}
- Atualiza o usuário pelo id
  
DELETE
/api/User/{id}
- Deleta o usuário pelo id
  
POST
/api/User/login
- Faz login no sistema

POST
/api/User/logout
- Faz logout do sistema

# Documentação de Implementação de Funcionalidades NoSQL
## Visão Geral

Esta seção descreve a implementação das funcionalidades que envolvem o banco de dados NoSQL (MongoDB) para o armazenamento e recuperação de dados, além das justificativas para a escolha desse modelo de banco de dados.

## Banco de Dados Utilizado: MongoDB
Tipo: NoSQL, orientado a documentos.
Formato de dados: BSON (uma representação binária de JSON).
Justificativa: 
  - Escalabilidade: MongoDB oferece fácil escalabilidade horizontal com sharding, o que é importante para sistemas que requerem desempenho rápido em grandes volumes de dados.
  - Flexibilidade: Com o modelo de dados orientado a documentos, é possível modificar o esquema sem quebrar a estrutura da base de dados, permitindo uma adaptação rápida às mudanças nas necessidades do sistema.
  - Alta Disponibilidade: MongoDB é uma excelente escolha para aplicações que exigem disponibilidade constante e resiliência a falhas, devido ao suporte de réplicas e clusters distribuídos.
 
## Operações de Armazenamento e Recuperação de Dados
### Criação de Documento
Para armazenar dados no MongoDB, o método InsertOne é utilizado para inserir um documento na coleção News.

Exemplo (C# - ASP.NET Core):
```
public async Task CreateNews(News news) {
    await _newsCollection.InsertOneAsync(news);
}
```

Justificativa: Operações de inserção no MongoDB são rápidas e eficientes, mesmo em coleções grandes, devido ao seu modelo de escrita direta.

### Recuperação de Dados
Para obter dados, podemos utilizar FindAsync com filtros, permitindo a busca por qualquer campo no documento.

Exemplo (C# - ASP.NET Core):
```
public async Task<List<News>> GetAllNews() {
    return await _newsCollection.Find(news => true).ToListAsync();
}
```

### Recuperação por ID:
```
public async Task<News> GetNewsById(string id) {
    return await _newsCollection.Find<News>(news => news.Id == id).FirstOrDefaultAsync();
}
```

### Atualização de Documento
Para atualizar um documento, utilizamos o método ReplaceOneAsync ou UpdateOneAsync, dependendo se queremos substituir ou apenas modificar campos específicos.

Exemplo de Atualização de Campos:
```
public async Task UpdateNews(string id, News updatedNews) {
    await _newsCollection.ReplaceOneAsync(news => news.Id == id, updatedNews);
}
```
### Exclusão de Documento
A exclusão de um documento é feita utilizando DeleteOneAsync, filtrando o documento pelo ID ou por outro critério.

Exemplo de Exclusão:
```
public async Task DeleteNews(string id) {
    await _newsCollection.DeleteOneAsync(news => news.Id == id);
}
```

  ---------------------------------------------------------------------


## Qualidade de Software

As métricas selecionadas visam garantir que o desenvolvimento do projeto atenda aos critérios de qualidade estabelecidos, conforme a norma ISO/IEC 25010. Elas permitem medir a eficiência, confiabilidade, segurança e manutenibilidade da solução. Através de indicadores como tempo de resposta, cobertura de testes, taxa de erros, disponibilidade e uso de recursos, a equipe pode monitorar e otimizar o desempenho do software, assegurando que o produto final satisfaça as expectativas dos usuários e stakeholders.

### Funcionalidade (Adequação Funcional):

- Subcaracterística: Completude Funcional
A API deve oferecer todas as funcionalidades necessárias para a interação entre os sistemas web e mobile, como operações CRUD (Create, Read, Update, Delete) em usuários e notícias. A completude funcional garante que todas as funcionalidades previstas estão presentes e funcionam corretamente.

- Subcaracterística: Correção Funcional
Essa subcaracterística assegura que a API processa as requisições corretamente, atendendo os requisitos funcionais estabelecidos, como validações de segurança, consistência dos dados e autenticação.

### Confiabilidade:

- Subcaracterística: Tolerância a Falhas
A API deve ser capaz de lidar com falhas (como timeouts ou erros de autenticação), garantindo que, mesmo em cenários adversos, o sistema se recupere ou degrade sua operação de forma controlada, sem comprometer a experiência do usuário.

- Subcaracterística: Disponibilidade
A API precisa estar sempre disponível para web e mobile, com o MongoDB em um cluster replicado, permitindo alta disponibilidade e recuperação rápida.

### Eficiência de Desempenho:

- Subcaracterística: Tempo de Resposta
O tempo que a API leva para retornar as informações solicitadas, principalmente ao acessar e manipular dados do MongoDB, deve ser otimizado. Essa métrica é essencial para garantir uma boa experiência tanto no web quanto no mobile.

- Subcaracterística: Utilização de Recursos
A eficiência no uso dos recursos (CPU, memória, e I/O) tanto da API quanto do MongoDB deve ser monitorada para evitar sobrecargas e manter a performance estável.

### Segurança:

- Subcaracterística: Confidencialidade
Com a utilização do BCRYPT.NET para criptografar senhas e as práticas de autenticação na API, a confidencialidade dos dados dos usuários deve ser garantida.

- Subcaracterística: Autenticidade
Verificar que apenas usuários autenticados possam acessar certas funcionalidades, e que a identidade de quem realiza ações no sistema seja validada corretamente.

### Manutenibilidade:

- Subcaracterística: Modularidade
A organização do código e separação em camadas (controladores, serviços e repositórios) torna o projeto modular, facilitando futuras atualizações ou ajustes.

- Subcaracterística: Testabilidade
A API precisa ser fácil de testar, garantindo que cada componente possa ser validado de maneira independente.

### Justificativa das Escolhas

Essas subcaracterísticas foram escolhidas para garantir que o projeto tenha uma API funcional e segura, capaz de operar eficientemente com a base de dados MongoDB, ao mesmo tempo que oferece uma boa experiência tanto no frontend web quanto mobile. A disponibilidade e o desempenho são cruciais para manter o sistema confiável e rápido, enquanto a modularidade e testabilidade garantem que o código seja facilmente mantido e atualizado.
