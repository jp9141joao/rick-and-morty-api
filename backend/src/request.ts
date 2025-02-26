// Define o tipo Login para ser utilizado na funcao autentica do controller.
export type Login = {
    email: string, 
    senha: string  
}
  
// Define o tipo CriarConta para ser utilizado na funcao criarConta do controller.
export type CriarConta = {
    nome: string, 
    email: string, 
    senha: string 
} 
  
// Define o tipo AlterarInfo para ser utilizado na funcao alterarInfo do controller.
export type AlterarInfo = {
    nome?: string,  
    email?: string,  
    senha?: string,   
    novaSenha?: string, 
    operacao: string  
}
  