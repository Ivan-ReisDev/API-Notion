
# Notion API

# Configuração do Ambiente

Este projeto requer as seguintes variáveis de ambiente para funcionar corretamente. Certifique-se de configurá-las antes de rodar a aplicação.

## Variáveis de Ambiente

1. **SERVER_PORT**: A porta em que o servidor irá rodar. A variável padrão é 3000.
   - Exemplo:
     ```env
     SERVER_PORT=3000
     ```

2. **NOTION_API_KEY**: A chave de API para acessar o Notion.
   - Exemplo:
     ```env
     NOTION_API_KEY=ntn_O35402416574dg7rojwpyRwVPcKnWaiyIfqPeySBshC7pS
     ```

3. **NOTION_DATABASE_ID**: O ID do banco de dados no Notion que será utilizado pela aplicação.
   - Exemplo:
     ```env
     NOTION_DATABASE_ID=1290d303ccf9808d8697f7a3dc42ef3f
     ```

## Como Configurar as Variáveis de Ambiente

1. Crie um arquivo `.env` na raiz do seu projeto.
2. Adicione as variáveis de ambiente mencionadas acima no arquivo `.env`.
3. Certifique-se de que o arquivo `.env` esteja sendo carregado corretamente pela sua aplicação.

Exemplo de arquivo `.env`:

```env
SERVER_PORT=3000
NOTION_API_KEY=ntn_O3540241657sdgfsdf4dg7rojwpyRwhfdhPcKnWaiyIfrqPerjrjySBshC7pS
NOTION_DATABASE_ID=129069d303cthrthcf98074758d8697f7ajtmym3dc4862ef3f
```

---

Com as variáveis configuradas, o projeto estará pronto para ser executado.#


Este documento descreve a configuração e os endpoints da API Notion, construída utilizando o framework **Express** para Node.js/TypeScript, aplicando os princípios SOLID. A API oferece uma série de endpoints para operações CRUD, permitindo a manipulação de dados conforme as necessidades da aplicação.

## Configuração da API

A API foi projetada para ser simples e eficiente. O servidor Express escuta na porta configurada no ambiente e está pronto para receber e responder a requisições HTTP.

### Estrutura da API

A API possui os seguintes endpoints:

1. **POST** `/post` - Criar um novo recurso.
2. **GET** `/post` - Recuperar todos os recursos.
3. **PATCH** `/post` - Atualizar parcialmente um recurso existente.
4. **DELETE** `/post` - Excluir um recurso existente.

---

## Endpoints

### 1. **POST** `/resoposturce`

Este endpoint é utilizado para criar um novo recurso. A requisição deve conter os dados necessários para a criação do recurso.

#### Requisição

**URL:**
```
POST /resource
```

**Corpo da requisição (JSON):**
```json
{
  "data": {
    "company": "Teste aaacom link real",
    "campaign": "Facebook",
    "description": "Criando teste",
    "plannedDate": "2024-11-10",
    "language": "English",
    "content": "Teste de content",
    "imageContent": "Teste de contentImagem",
    "image": "https://img.freepik.com/fotos-gratis/paisagem-de-nevoeiro-matinal-e-montanhas-com-baloes-de-ar-quente-ao-nascer-do-sol_335224-794.jpg?semt=ais_hybrid"
  }
}
```

**Resposta Esperada:**

```json
{
  "message": "Recurso criado com sucesso",
}
```

---

### 2. **GET** `/post`

Este endpoint é utilizado para recuperar todos os recursos disponíveis.

#### Requisição

**URL:**
```
GET /post
```

**Cabeçalhos:**

Não é necessário enviar dados no corpo da requisição, mas mas deve enviar o post-id através do header.

**Resposta Esperada:**

```json

  {
    "id": 123,
    "company": "Teste aaacom link real",
    "campaign": "Facebook",
    "description": "Criando teste",
    "plannedDate": "2024-11-10",
    "language": "English",
    "content": "Teste de content",
    "imageContent": "Teste de contentImagem",
    "image": "https://img.freepik.com/fotos-gratis/paisagem-de-nevoeiro-matinal-e-montanhas-com-baloes-de-ar-quente-ao-nascer-do-sol_335224-794.jpg?semt=ais_hybrid"
  }

```

---

### 3. **PATCH** `/post`

Este endpoint é utilizado para atualizar parcialmente um recurso existente. Você pode modificar apenas os campos desejados, enviando um JSON com os novos dados.
Também é necessário mandar o post-id

#### Requisição

**URL:**
```
PATCH /post
```

**Corpo da requisição (JSON):**
```json
{
  "data": {
    "company": "Tech Innovations Ltd.",
    "campaign": "Holiday Sale 2024",
    "description": "Desconto especial para o final de ano",
    "plannedDate": "2024-12-01",
    "where": "Online Store",
    "language": "Portuguese",
    "content": "Ofereça descontos incríveis neste fim de ano!",
    "imageContent": "Imagem da promoção de fim de ano",
    "image": "https://www.example.com/images/holiday-sale.jpg"
  }
}
```

**Resposta Esperada:**

```json
204 not-content
```

---

### 4. **DELETE** `/post`

Este endpoint é utilizado para excluir um recurso existente. O **ID** do recurso a ser excluído deve ser enviado nos cabeçalhos através do post-id.

#### Requisição

**URL:**
```
DELETE /post/
```

**Cabeçalhos:**
```
post-id: 235
```

**Resposta Esperada:**

Se a exclusão for bem-sucedida:

```http
HTTP/1.1 204 No Content
```

Se o recurso não for encontrado:

```json
{
  "error": "Recurso não encontrado"
}
```

---

```

## Erros Comuns

A API pode retornar os seguintes códigos de erro:

- **400 Bad Request**: A requisição está malformada ou contém dados inválidos.
- **404 Not Found**: O recurso solicitado não foi encontrado.
- **500 Internal Server Error**: Erro inesperado no servidor.

---

## Conclusão

Esta API foi projetada para oferecer um serviço robusto e fácil de integrar com sua aplicação. Utilize os endpoints conforme necessário para criar, ler, atualizar e excluir recursos.