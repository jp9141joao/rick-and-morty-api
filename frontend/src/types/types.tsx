export type Login = {
    email: string,
    senha: string
}

export type Usuario = {
    nome: string,
    email: string,
    senha: string
}

export type Personagem = {
    id: string, 
    nome: string,
    estatus: string
    localizacao: string,
    imagem: string
}

export type AlterarInfo = {
    nome?: string,
    email?: string,
    senha?: string,
    novaSenha?: string
}

export type Filtro = {
    por: string,
    valor: string 
}

export type MensagemToast = {
    variant: string,
    title: string,
    description: string,
}

export type Navegacao = {
    voltar: string | null,
    proximo: string | null
}