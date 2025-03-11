module.exports = (app) => {
  const Concursos = app.models.concursos;

  app
    .route("/concursos")
    /**
     * @api {get} /concursos Exibe lista de Concursos
     * @apiGroup Concursos
     * @apiSuccess {Number} id
     * @apiSuccess {String} orgao
     * @apiSuccess {String} edital
     * @apiSuccess {String} cod_concurso
     * @apiSuccess {Json} vagas
     * @apiSuccess {Date} updated_at Data de atualização
     * @apiSuccess {Date} created_at Data de cadastro
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "orgao": "resistencia",
     *      "edital": "10/2045",
     *      "cod_concurso": "99999999999",
     *      "vagas": "['vigilante noturno', 'manutenção de robo']",
     *      "updated_at": "2015-09-24T15:46:51.778Z",
     *      "created_at": "2015-09-24T15:46:51.778Z",
     *    }
     * @apiErrorExample {json} Erro de consulta
     *    HTTP/1.1 412 Precondition Failed
     */
    .get(async (req, res) => {
      try {
        const resultado = await Concursos.findAll();
        res.json(resultado);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    })
    /**
     * @api {post} /concursos Cadastra novo Concurso
     * @apiGroup Concursos
     * @apiSuccess {Number} id
     * @apiSuccess {String} orgao
     * @apiSuccess {String} edital
     * @apiSuccess {String} cod_concurso
     * @apiSuccess {Json} vagas
     * @apiSuccess {Date} updated_at Data de atualização
     * @apiSuccess {Date} created_at Data de cadastro
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "orgao": "resistencia",
     *      "edital": "10/2045",
     *      "cod_concurso": "99999999999",
     *      "vagas": "['vigilante noturno', 'manutenção de robo']",
     *      "updated_at": "2015-09-24T15:46:51.778Z",
     *      "created_at": "2015-09-24T15:46:51.778Z",
     *    }
     * @apiErrorExample {json} Erro de consulta
     *    HTTP/1.1 412 Precondition Failed
     */
    .post(async (req, res) => {
      try {
        const resultado = await Concursos.create(req.body);
        console.log(req.body);
        res.json(resultado);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    });
};
