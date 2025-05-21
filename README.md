## Teste Prático Plss

Aplicação desenvolvida para teste prático da empresa Plss Soluções.

## Versões

- Versão do php: 8.2.28
- Versão do Laravel: 12.14.1
- Versão do Node: 23.8.0
- Versão do React: 19.1.0

## Como rodar o projeto

- Clone o projeto.
- Carregue e execute o arquivo "plss_desafio_db.sql" (localizado na pasta raiz) no seu gerenciador de bancos de dados para criar o banco de dados padrão da aplicação.

- Na pasta "laravel":
    - Execute o comando "composer i" ou "composer u".
    - Faça uma cópia do arquivo ".env.example" e renomeie-o para ".env". No item "DB_DATABASE" insira o nome que deu ao banco de dados ao criá-lo.
    - Execute o comando "php artisan key:generate"
    - Execute o comando "php artisan jwt:secret"
    - Execute o comando "php artisan serve" para iniciar o Laravel.

- Na pasta "react":
    - Certifique-se de usar a versão correta do Node.
    - Execute o comando "npm install".
    - Execute o comando "npm run dev" para iniciar o React.

- Um usuário está criado por padrão. O login é:
    - Administrador: email: "admin@admin.com", senha "Admin#123";

## Informações

- Este sistema tem como objetivo principal gerenciar (gerenciar envolve criar, editar, deletar) obras e seus respectivos registros de medidas.
- O sistema também possibilita criar e gerenciar usuários.
- O sistema possui auditoria, ou seja, registro de ações e eventos realizados, como criar, atualizar ou excluir.
- A tela inicial apresenta uma Dashboard com algumas métricas referentes aos dados armazenados no sistema.
- Cada módulo possui uma tela de listagem e uma tela de criação / edição. As listagens podem ser filtradas ao clicar no botão de funil ao lado de "Criar Novo".
- A conexão entre backend e frontend é protegida via autenticação JWT.
- Tanto frontend quanto backend apresentam modularização, com divisões de funcionalidades entre os componentes.
- Módulos importantes usam SoftDeletes, para evitar que dados importantes se percam permanentemente.
