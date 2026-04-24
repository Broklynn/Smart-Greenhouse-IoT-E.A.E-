# Smart Greenhouse IoT - E.A.E.

Backend em Node.js com Express e SQL Server para o sistema Smart Greenhouse IoT - E.A.E. A API foi organizada em camadas para manter o projeto simples de evoluir localmente, com separacao entre rotas, controllers, services e repositories.

## Descricao

O projeto atende o backend de uma estufa automatizada, com autenticacao de usuarios, registro de dados de sensores e gerenciamento de comentarios. O foco atual e uso local/offline, sem preparacao de deploy em ambiente online.

Arquitetura utilizada:

- `routes`
- `controllers`
- `services`
- `repositories`

## Tecnologias Usadas

- Node.js
- Express
- SQL Server
- `mssql`
- `bcrypt`
- `jsonwebtoken`

## Funcionalidades

- Cadastro de usuarios
- Login com token JWT
- Rotas autenticadas
- Cadastro de leituras de sensores
- Listagem de sensores e consulta do ultimo registro
- CRUD de comentarios
- Edicao e exclusao de comentarios apenas pelo dono
- Paginacao e filtros em comentarios

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

## Instalacao

1. Clone o repositorio.
2. Entre na pasta do projeto.
3. Instale as dependencias:

```bash
npm install
```

## Configuracao Local

Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`.

Exemplo:

```env
PORT=3000
DB_USER=sa
DB_PASSWORD=1234567890
DB_SERVER=localhost
DB_DATABASE=eae
JWT_SECRET=segredo_super_forte
```

## Variaveis de Ambiente

- `PORT`: porta local da API
- `DB_USER`: usuario do SQL Server
- `DB_PASSWORD`: senha do SQL Server
- `DB_SERVER`: host do banco
- `DB_DATABASE`: nome do banco
- `JWT_SECRET`: chave usada na autenticacao JWT

Observacao importante:

- o projeto agora possui `.env.example` para padronizar a configuracao local
- o arquivo `.env` esta ignorado no Git
- o codigo atual ainda usa configuracoes fixas em alguns arquivos, entao o `.env` serve como referencia local de configuracao e organizacao

## Como Rodar Offline

Depois de instalar as dependencias e configurar o SQL Server local:

```bash
npm run dev
```

Ou, se preferir iniciar sem `nodemon`:

```bash
npm start
```

API local:

```text
http://localhost:3000
```

## Rotas Principais

### Autenticacao

- `POST /api/auth/cadastrar`
- `POST /api/auth/login`

### Sensores

- `POST /api/sensor`
- `GET /api/sensor`
- `GET /api/sensor/ultimo`

### Comentarios

- `POST /api/comentarios`
- `GET /api/comentarios`
- `GET /api/comentarios/me`
- `PUT /api/comentarios/:id`
- `DELETE /api/comentarios/:id`

## Status do Projeto

Projeto em desenvolvimento academico, funcional para uso local e com estrutura organizada para evolucao incremental.

## Autor

Gabriel / equipe do projeto Smart Greenhouse IoT - E.A.E.
