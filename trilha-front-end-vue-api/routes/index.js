module.exports = (app) => {
  /**
   * @api {get} / API Status
   * @apiGroup Status
   * @apiSuccess {String} status Mensagem de status da API
   * @apiSuccessExample {json} Sucesso
   *    HTTP/1.1 200 OK
   *    {"status": "Servidor operando na porta 3000"}
   */
  app.get("/", (req, res) => {
    res.json({ status: "Servidor operando na porta 3000" });
  });
};
