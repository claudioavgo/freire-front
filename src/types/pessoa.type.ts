import { NOMEM } from "dns";
import { CircleDashed } from "lucide-react";
import { PermissionDeniedError } from "openai";

export interface Pessoa {
  cidade: string;
  dataNascimento: Date;
  email: string;
  idPessoa: number;
  nome: string;
  numero: string;
  rua: string;
  senha: string;
  telefone1: string | null;
  telefone2: string | null;
  tipo: string;
}

export interface PessoaInput {
id_pessoa: number,
nome: string,
rua: string,
numero: number,
cidade: string,
telefone_1: number | null,
telefone_2: number | null,
email: string,
senha: string,
data_nascimento: Date,
fk_Secretaria_fk_Pessoa_id_pessoa: number,
tipo: string;
}

export interface adicionarPessoa {
  nome: string,
  rua: string,
  numero: string,
  cidade: string,
  telefone_1: string | null,
  telefone_2: string | null,
  email: string,
  senha: string,
  datanascimento: string,
  tipo: number;
  periodo: number | null;
  especializacao: string | null;
  idSecretaria: number;
  }

/*
nome
rua 
numero
cidade
telefone1
telefone2
email
senha
datanascimento
tipo 0 aluno 1 professor 2 secretaria 3 super secretaria

caso seja aluno
periodo 
especializacao 

caso seja secretaria
id secretaria
*/