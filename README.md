<h1 align="center">
  🚧⚠️ Em construção 🚧⚠️
</h1>

Plataforma educacional para facilitar o aprendizado, com foco em quizzes interativos como principal recurso. 

- [x] Back-end
- [ ] Front-end

A ideia é trazer conceito de gamificação para motivar o usuário a se desafiar ao máximo. A cada desafio, os usuários podem aumentar seu nível, conquistar badges exclusivos e criar quizzes interativos para compartilhar com outros participantes.

## Installation

```bash
  git clone https://github.com/andradeleo/ticoon.git

  cd ticoon

  npm install

  npm run dev
```
<br>

> [!IMPORTANT]
> Para rodar o servidor as seguintes versões são necessárias,  `NODE (22.11.0)` e `Docker (27.2.1)` instalados.
>
> Confira o arquivo `.env` com as variáveis de ambiente para rodar o projeto.
>

<br>

## Features | 🚧 Em breve 🚧

- [ ] Autorização
- [ ] Conquistas e badges
- [ ] Desafios, uma trilha de quizzes para desafiar o usuário ao máximo
- [ ] Melhorias no sistema de níveis


<br>

## API Reference

### Authentication

| Método | Endpoint | Descrição |
|---|---| --- |
| `POST`|  `/sign-up` | Utilizado para criar um novo usuário. |
| `POST`| `/sign-in` | Utilizado para autenticar o usuário na plataforma. |

### Quiz

| Método | Endpoint | Descrição |
|---|---| --- |
| `GET`| `/quiz` | Buscar quizzes para uma listagem simples. |
| `GET`| `/quiz/:id` | Buscar quiz para o usuário responder. |
| `PUT`|  `/quiz/:id` | Atualizar um quiz |
| `POST`|  `/quiz` | Cadastrar um novo quiz. |
| `POST`|  `/submit-quiz/:id` | Submeter um quiz para validação de `respostas` e `experiência conquistada` |

