import axios from "axios";
import { Avaliacao } from "@/types/avaliacao.type";
import { Disciplina } from "@/types/disciplina.type";
import { Fatura } from "@/types/fatura.type";
import { Falta } from "@/types/faltas.type";
import { Streak } from "@/types/streak.type";
import { Rendimento } from "@/types/rendimento.type";
import { qntdAlunos } from "@/types/qntdAlunos.type";
import { DisciplinaMinistrada } from "@/types/disciplinaMinistrada.type";
import { AvaliacaoCriada } from "@/types/avaliacaoCriada.type";
import { ResultadoAvaliacao } from "@/types/resultadoAvaliacao.type";
import { AlunoMatriculado } from "@/types/alunoMatriculado.type";
import { Agenda } from "@/types/agenda.type";

export class Api {
  private static readonly baseUrl = "https://api.freire.app/api";

  static async autenticar(email: string, senha: string) {
    try {
      const response = await axios.post(
        this.baseUrl + "/pessoas/autenticar",
        { email, senha },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro na autenticação:", error);
      return null;
    }
  }

  static async pegarAgendaPessoa(id: number): Promise<Agenda[] | null> {
    try {
      const response = await axios.get<Agenda[]>(
        this.baseUrl + `/pessoas/${id}/agenda-hoje`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      return null;
    }
  }

  static async pegarStreakAluno(id: number): Promise<Streak | null> {
    try {
      const response = await axios.get<Streak>(
        this.baseUrl + `/aluno/${id}/streak`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      return null;
    }
  }

  static async pegarRendimentoAluno(id: number): Promise<Rendimento | null> {
    try {
      const response = await axios.get<Rendimento>(
        this.baseUrl + `/aluno/${id}/rendimento`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      return null;
    }
  }

  static async pegarDisciplinas(id: number): Promise<Disciplina[] | null> {
    try {
      const response = await axios.get<Disciplina[]>(
        this.baseUrl + `/aluno/${id}/disciplinas`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("PEGAR DISCIPLINAS Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      return null;
    }
  }

  static async pegarFaturas(id: number): Promise<Fatura[] | null> {
    try {
      const response = await axios.get<Fatura[]>(
        this.baseUrl + `/aluno/${id}/financeiro`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      return null;
    }
  }

  static async pegarFaltas(idDisciplina: number): Promise<Falta | null> {
    try {
      const response = await axios.get<Falta>(
        this.baseUrl + `/aluno/${idDisciplina}/faltas`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      return null;
    }
  }

  static async pegarAvaliacoes(id: number): Promise<Avaliacao[] | null> {
    try {
      const response = await axios.get<Avaliacao[]>(
        this.baseUrl + `/aluno/${id}/avaliacao`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      return null;
    }
  }

  static async pegarAvaliacoesPorIdDaDisciplina(
    idAluno: number,
    idDisciplina: number
  ): Promise<Avaliacao[] | null> {
    try {
      const response = await axios.get<Avaliacao[]>(
        this.baseUrl + `/aluno/${idAluno}/avaliacao/${idDisciplina}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      return null;
    }
  }

  static async pegarFaltasPorIdDaDisciplina(
    idAluno: number,
    idDisciplina: number
  ): Promise<Falta | null> {
    try {
      const response = await axios.get<Falta>(
        this.baseUrl + `/aluno/${idAluno}/faltas/${idDisciplina}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      return null;
    }
  }

  static async pegarQntdAlunos(
    idProfessor: number
  ): Promise<qntdAlunos | null> {
    try {
      const response = await axios.get<qntdAlunos>(
        this.baseUrl + `/professor/${idProfessor}/qtd-alunos`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      return null;
    }
  }

  static async pegarDisciplinasMinistradas(
    idProfessor: number
  ): Promise<DisciplinaMinistrada[] | null> {
    try {
      const response = await axios.get<DisciplinaMinistrada[]>(
        this.baseUrl + `/professor/${idProfessor}/disciplinas`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      return null;
    }
  }

  static async criarProva(
    idDisciplina: number,
    descricao: string,
    data: string
  ) {
    try {
      const response = await axios.post(
        this.baseUrl + `/professor/disciplina/${idDisciplina}/avaliacao`,
        { descricao, data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar prova:", error);
      return null;
    }
  }

  static async editarProva(
    idAvaliacao: number,
    descricao: string,
    data: string
  ) {
    try {
      const response = await axios.put(
        this.baseUrl + `/professor/avaliacao/${idAvaliacao}`,
        { descricao, data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar prova:", error);
      return null;
    }
  }

  static async pegarAvaliacoesCriadas(
    idDisciplina: number
  ): Promise<AvaliacaoCriada[] | null> {
    try {
      const response = await axios.get<AvaliacaoCriada[]>(
        this.baseUrl + `/professor/disciplina/${idDisciplina}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      return null;
    }
  }

  static async pegarResultadoAvaliacoes(
    idAvaliacao: number
  ): Promise<ResultadoAvaliacao[] | null> {
    try {
      const response = await axios.get<ResultadoAvaliacao[]>(
        this.baseUrl + `/professor/avaliacao/${idAvaliacao}/resultados`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      return null;
    }
  }

  static async criarResultadoAvaliacao(
    idAvaliacao: number,
    idAluno: number,
    idProfessor: number,
    nota: number,
    feedback: string
  ) {
    try {
      const response = await axios.post(
        this.baseUrl + `/professor/avaliacao/${idAvaliacao}`,
        { idAluno, idProfessor, nota, feedback },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      return null;
    }
  }

  static async deletarAvaliacao(idAvaliacao: number) {
    try {
      const response = await axios.delete(
        this.baseUrl + `/professor/avaliacao/${idAvaliacao}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar aula:", error);
      return null;
    }
  }

  static async pegarAlunosMatriculados(
    idDisciplina: number
  ): Promise<AlunoMatriculado[] | null> {
    try {
      const response = await axios.get<AlunoMatriculado[]>(
        this.baseUrl + `/professor/disciplina/${idDisciplina}/alunos`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      return null;
    }
  }

  static async pagarFatura(idBoleto: number) {
    try {
      const response = await axios.put(
        this.baseUrl + `/aluno/${idBoleto}/pagamento`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API recebida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aulas:", error);
      return null;
    }
  }
}
