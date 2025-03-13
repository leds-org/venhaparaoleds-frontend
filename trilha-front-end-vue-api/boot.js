module.exports = (app) => {
  async function start(porta) {
    try {
      await app.db.authenticate();
      await app.db.sync();
      app.listen(porta, () => {
        console.log(`Servidor operando na porta ${porta}`);
      });
    } catch (err) {
      console.log("Houve um error na conexão.");
      console.error(err);
    }
  }
  start(app.get("porta"));
};
