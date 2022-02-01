const HTTP = require("http");

HTTP.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });

  if (request.url === "/produto") {
    response.end(
      JSON.stringify({
        message: "Rota de Produto",
      })
    );
  }

  if (request.url === "/usuarios") {
    response.end(
      JSON.stringify({
        message: "Rota de Usuarios",
      })
    );
  }

  response.end(
    JSON.stringify({
      message: "Qualquer outra rota",
    })
  );
}).listen(4001, () => console.log("Servido está rodando na porta 4001"));
