const { DataTypes } = require("sequelize");

module.exports = (app) => {
  const Candidatos = app.db.define("Candidatos", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
    data_nascimento: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    profissoes: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Candidatos;
};
