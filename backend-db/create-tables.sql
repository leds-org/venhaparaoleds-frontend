CREATE TABLE candidatos (
    id            serial PRIMARY KEY,
    nome          varchar(100) NOT NULL,
    nascimento    date NOT NULL,
    cpf           character(11) UNIQUE NOT NULL
);

CREATE TABLE concursos (
    id            serial PRIMARY KEY,
    nome_orgao    varchar(100) NOT NULL,
    num_edital    integer NOT NULL,
    ano_edital    integer NOT NULL,
    codigo        character(11) UNIQUE NOT NULL
);

CREATE TABLE profissoes (
    id      serial PRIMARY KEY,
    nome    varchar(100) UNIQUE NOT NULL
);

CREATE TABLE concurso_profissao (
    id_concurso INT REFERENCES concursos(id) ON UPDATE CASCADE ON DELETE CASCADE,
    id_profissao INT REFERENCES profissoes(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT conc_prof_pkey PRIMARY KEY (id_concurso, id_profissao)
);

CREATE TABLE candidato_profissao (
    id_candidato INT REFERENCES candidatos(id) ON UPDATE CASCADE ON DELETE CASCADE,
    id_profissao INT REFERENCES profissoes(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT cand_prof_pkey PRIMARY KEY (id_candidato, id_profissao)
);