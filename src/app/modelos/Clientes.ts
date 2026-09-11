export interface Cliente {
    idpessoa?: number;
    nome: string;
    cpf: string;
    data_nascimento: string;
    telefone: string;
    email: string;
    senha?: string;
    cep?: string;
    logradouro?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
  }