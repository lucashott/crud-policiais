CREATE DATABASE crud_policiais;

USE crud_policiais;

CREATE TABLE policiais (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rg_civil VARCHAR(20) NOT NULL UNIQUE,
  rg_militar VARCHAR(20) NOT NULL UNIQUE,
  cpf VARCHAR(11) NOT NULL UNIQUE,
  data_nascimento DATE NOT NULL,
  matricula VARCHAR(255) NOT NULL
);
