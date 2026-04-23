# Smart Greenhouse IoT - E.A.E.

Backend em Node.js com Express e SQL Server para suporte a um sistema de estufa automatizada. O projeto expõe uma API REST com autenticação via JWT, registro e consulta de dados de sensores, além de um módulo de comentários com controle de autenticação e autorização por usuário.

## Descrição

Este backend foi estruturado em camadas para facilitar manutenção e evolução:

- `routes`: definição dos endpoints
- `controllers`: tratamento de requisição e resposta
- `services`: regras de negócio e validações
- `repositories`: acesso ao banco de dados

Atualmente, o sistema possui três módulos principais:

- `auth`: cadastro e login de usuários
- `sensor`: cadastro e consulta de leituras de sensores
- `comentarios`: criação, listagem, edição e remoção de comentários

## Tecnologias Utilizadas

- Node.js
- Express
- SQL Server
- `mssql`
- `bcrypt`
- `jsonwebtoken`

## Funcionalidades

- Cadastro de usuário com senha criptografada
- Login com geração de token JWT
- Rotas protegidas por autenticação
- Cadastro de dados de sensores vinculados ao usuário autenticado
- Listagem de sensores e consulta do último registro
- CRUD de comentários
- Edição e exclusão de comentários apenas pelo usuário dono
- Paginação de comentários
- Busca textual em comentários
- Filtro de comentários por usuário

## Estrutura de Pastas

```text
src/
  app.js
  server.js
  config/
    db.js
  controllers/
    auth.controller.js
    comentarios.controller.js
    sensor.controller.js
  middlewares/
    auth.middleware.js
  repositories/
    auth.repository.js
    comentarios.repository.js
    sensor.repository.js
  routes/
    auth.routes.js
    comentarios.routes.js
    sensor.routes.js
  services/
    auth.service.js
    comentarios.service.js
    sensor.service.js
```

## Instalação

1. Clone o repositório.
2. Acesse a pasta do projeto.
3. Instale as dependências:

```bash
npm install
```

## Configuração do `.env`

O projeto ainda não está lendo variáveis de ambiente automaticamente no código atual. Neste momento, as configurações de banco e a chave JWT estão definidas diretamente nos arquivos fonte.

Mesmo assim, recomenda-se preparar um arquivo `.env` para a próxima etapa de evolução do projeto, com variáveis como:

```env
PORT=3000
DB_USER=sa
DB_PASSWORD=1234567890
DB_SERVER=localhost
DB_PORT=1433
DB_NAME=eae
JWT_SECRET=segredo_super_forte
```

Observação:

- hoje, esses valores ainda precisam estar alinhados manualmente com os arquivos `src/config/db.js`, `src/services/auth.service.js` e `src/middlewares/auth.middleware.js`

## Como Rodar o Projeto

Com as dependências instaladas e o SQL Server configurado, inicie a aplicação com:

```bash
node src/server.js
```

A API ficará disponível em:

```text
http://localhost:3000
```

## Rotas Principais

### Autenticação

- `POST /api/auth/cadastrar`
- `POST /api/auth/login`

### Sensores

- `POST /api/sensor`
- `GET /api/sensor`
- `GET /api/sensor/ultimo`

### Comentários

- `POST /api/comentarios`
- `GET /api/comentarios`
- `GET /api/comentarios/me`
- `PUT /api/comentarios/:id`
- `DELETE /api/comentarios/:id`

## Exemplos de Uso

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "login": "usuario@example.com",
  "senha": "123456"
}
```

### Criar comentário

```http
POST /api/comentarios
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "texto": "Comentário de exemplo"
}
```

### Listar comentários com paginação e busca

```http
GET /api/comentarios?page=1&limit=10&search=temperatura
Authorization: Bearer SEU_TOKEN
```

## Status do Projeto

Projeto em desenvolvimento acadêmico, com estrutura organizada e funcionalidades principais do backend já implementadas.

## Autor

Gabriel / equipe do projeto Smart Greenhouse IoT - E.A.E.
