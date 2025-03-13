module.exports = (app) => {
  const Candidatos = app.models.candidatos;

  app
    .route("/candidatos")
    /**
     * @api {get} /user Exibe candidatos
     * @apiGroup Candidatos
     * @apiSuccess {Number} id Id de registro
     * @apiSuccess {String} nome
     * @apiSuccess {String} data_nascimento
     * @apiSuccess {String} cpf
     * @apiSuccess {Json} profissoes
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "nome": "John Connor",
     *      "data_nascimento": "10/10/2050",
     *      "cpf": "999.999.999-99"
     *      "profissoes": "['exterminador de robo', 'atirador profissional']"
     *    }
     * @apiErrorExample {json} Erro de consulta
     *    HTTP/1.1 412 Precondition Failed
     */
    .get(async (req, res) => {
      try {
        const resultado = await Candidatos.findAll();
        res.json(resultado);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    })
    /**
     * @api {post} /candidatos cadastrar novo candidato
     * @apiGroup Candidatos
     * @apiSuccess {Number} id Id de registro
     * @apiSuccess {String} nome
     * @apiSuccess {String} data_nascimento
     * @apiSuccess {String} cpf
     * @apiSuccess {Json} profissoes
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "nome": "John Connor",
     *      "data_nascimento": "10/10/2050",
     *      "cpf": "999.999.999-99"
     *      "profissoes": "['exterminador de robo', 'atirador profissional']"
     *    }
     * @apiSuccess {Number} id Id de registro
     * @apiSuccess {String} nome
     * @apiSuccess {String} data_nascimento
     * @apiSuccess {String} cpf
     * @apiSuccess {Date} updated_at Data de atualização
     * @apiSuccess {Date} created_at Data de cadastro
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "nome": "John Connor",
     *      "data_nascimento": "10/10/2050",
     *      "cpf": "999.999.999-99"
     *      "profissoes": "['exterminador de robo', 'atirador profissional']"
     *      "updated_at": "2015-09-24T15:46:51.778Z",
     *      "created_at": "2015-09-24T15:46:51.778Z"
     *    }
     * @apiErrorExample {json} Erro de consulta
     *    HTTP/1.1 412 Precondition Failed
     */
    .post(async (req, res) => {
      try {
        const resultado = await Candidatos.create(req.body);
        res.json(resultado);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    });
};
