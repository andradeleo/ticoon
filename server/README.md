
# JWT Authentication

Aplicação com autenticação e autorização (RBAC) usando clean architecture.


## Installation

```bash
  git clone https://github.com/andradeleo/jwt-authentication.git

  cd jwt-authentication

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

## API Reference

#### Sign-up

```
  POST /sign-up
```

#### Sign-in

```
  POST /sign-in
```

## Example


#### Route

```ts
app.get("/customer-example",
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(["ADMIN"])),
  routeAdapter(makeListCustomerController())
);
```

> A função makeAuthorizationMiddleware aceita uma lista de roles permitidas para rota, como: ["ADMIN", "USER].

#### Response

```ts
{
    "data": [
        {
            "id": "1",
            "name": "customer-1"
        },
        {
            "id": "2",
            "name": "customer-2"
        },
        {
            "id": "3",
            "name": "customer-3"
        }
    ]
}
```

> Caso a role for diferente de ADMIN o retorno é `403 - forbidden`
