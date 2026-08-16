export default class Funcionario {
  id: number;
  nome: string;
  sobrenome: string;
  dataNascimento: string;
  dataContratacao: string;
  dataDemissao: string | null;
  criadoEm?: string | null;

  constructor(
    id: number,
    nome: string,
    sobrenome: string,
    dataNascimento: string,
    dataContratacao: string,
    dataDemissao: string | null,
    criadoEm?: string | null
  ) {
    this.id = id;
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.dataNascimento = dataNascimento;
    this.dataContratacao = dataContratacao;
    this.dataDemissao = dataDemissao;
    this.criadoEm = criadoEm ?? null;
  }
}