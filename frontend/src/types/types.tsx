// Define o tipo Login utilizado para chamar a função autentica.
export type Login = {
    email: string,
    senha: string
}

// Define o tipo Usuario utilizado para chamar a função cadastrar.
export type Usuario = {
    nome: string,
    email: string,
    senha: string
}

// Define o tipo Personagem utilizado no useState para armazenar os personagens retornados pela API.
export type Personagem = {
    id: string, 
    nome: string,
    status: string,
    especie: string,
    genero: string,
    localizacao: string,
    imagem: string
}

// Define o tipo Info utilizado para chamar a função mudarInfo.
export type Info = {
    nome?: string,
    email?: string,
    senha?: string,
    novaSenha?: string
    operacao: string
}

// Define o tipo Filtro utilizado para filtrar os personagem renderizados.
export type Filtro = {
    por: string,
    valor: string 
}

// Define o tipo Navegação utilizado para navegar entre as paginas da API e retornar um erro caso seja null.
export type Navegacao = {
    voltar: string | null,
    proximo: string | null
}