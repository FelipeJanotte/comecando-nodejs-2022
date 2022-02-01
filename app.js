const EXPRESS = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

const APP = EXPRESS();

// APP.get('/primeira-rota', (request, response) => {
//    return response.json({
//       message: 'Acessou a primeira rota com nodemon'
//    });
// });

// * Middleware
APP.use(EXPRESS.json());

let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    products = JSON.parse(data);
  }
});

/**
 * ? POST   : Inserir um dado
 * ? GET    : Buscar dados
 * ? PUT    : Alterar um dado
 * ? DELETE : Deletar um dado
 */

/**
 * * Body   > Sempre que eu quiser enviar dados para minha aplicação
 * * Params > /product/XXXX      -> XXXX  = parâmetro de rota
 * * Query  > /product?id=XXXX   -> id    = query
 */

APP.post("/products", (request, response) => {
  // * Nome e preço > Name and price

  const { name, price } = request.body;

  const product = {
    name,
    price,
    id: randomUUID(),
  };

  products.push(product);

  productFile();

  return response.json(product);
});

APP.get("/products", (request, response) => {
  return response.json(products);
});

APP.put("/products/:id", (request, response) => {
  const { id } = request.params;
  const { name, price } = request.body;

  const productIndex = products.findIndex((product) => product.id === id);
  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  };

  productFile();

  return response.json({ message: "Produto alterado com sucesso" });
});

APP.delete("/products/:id", (request, response) => {
  const { id } = request.params;

  const productIndex = products.findIndex((product) => product.id === id);

  products.splice(productIndex, 1);

  productFile();

  return response.json({ message: "Produto removido com sucesso!" });
});

function productFile() {
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.info("Produto inserido");
    }
  });
}

APP.listen(4002, () => console.log("Servidor está rodando na porta 4002"));
