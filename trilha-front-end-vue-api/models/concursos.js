const { DataTypes } = require("sequelize");

module.exports = (app) => {
  const Concursos = app.db.define("Concursos", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orgao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    edital: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    cod_concurso: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    vagas: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Concursos;
};
