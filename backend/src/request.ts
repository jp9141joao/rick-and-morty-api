export type Login = {
    email: string,
    senha: string
}

export type CriarConta = {
    nome: string,
    email: string,
    senha: string
} 

export type AlterarInfo = {
    nome?: string,
    email?: string,
    senha?: string,
    novaSenha?: string,
    operacao: string
}