// Importa componentes de layout que definem a estrutura da página. 
// <PaginaCorpo>: Define o componente PaginaCorpo, que representa o <body> da página onde todas as outras estruturas irão estar.
// <PaginaTopo>: Define o componente que representa o cabeçalho da página e que deverá ficar sempre no ponto mais alto da página.
// <PaginaMeio>: Contém o conteúdo principal da página.
// <PaginaRodape>: Define o componente que representa o rodapé da página.
import { PaginaCorpo, PaginaRodape, PaginaMeio, PaginaTopo } from "../components/PageLayout/LayoutPagina";
import Image from '../assets/rick-and-morty-partying.png'; // Importa a imagem que será utilizada na página de cadastro.

// Importa o componente <Button> que renderiza botões customizados com estilos pré-definidos.
import { Button } from "../components/ui/button";
// Importa o componente <Creditos> da criação do projeto.
import { Creditos } from "@/components/Creditos";
// Importa o componente <Voltar>, que fornece um paragrafo com um link para retornar a uma página especificada.
import { Voltar } from "@/components/Voltar";
// Importa o componente <Label> utilizado para rotular os campos de formulário e direcionar para o componente especificado.
import { Label } from "@/components/ui/label";
// Importa os componentes <Input> e <InputSenha> para receber dados do usuário. 
// <InputSenha> inclui funcionalidades extras, como alternar a visibilidade da senha.
import { Input, InputSenha } from "@/components/ui/input";
// Importa os hooks useEffect e useState do React.
// useState: Permite criar e gerenciar estados locais dentro do componente.
// useEffect: Permite criar efeitos colaterais ao montar o componente ou quando determinado valor for alterado.
import { useEffect, useState } from "react";
// Importa o componente <Spinner> que exibe um indicador visual de carregamento enquanto uma ação está em progresso.
import { Spinner } from "@/components/ui/spinner";
// Importa o componente <Toaster> que gerencia e exibe notificações para o usuário.
import { Toaster } from "@/components/ui/toaster";
// Importa a função toast, utilizada para disparar notificações customizadas na aplicação.
import { toast } from "@/hooks/use-toast";
// Importa o tipo Usuario para fazer a requisição de cadastro.
import { Usuario } from "@/types/types";
// Importa a função cadastrar responsável por enviar os dados de cadastro para o backend e criar o usuário.
import { cadastrar } from "@/service/service";

// Componente funcional que representa a página de cadastro
export default function Cadastrar() {
    // useState para armazenar o nome digitado pelo usuário.
    const [nome, setNome] = useState<string>('');
    // useState para armazenar o email digitado pelo usuário.
    const [email, setEmail] = useState<string>('');
    // useState para armazenar a senha digitada pelo usuário.
    const [senha, setSenha] = useState<string>('');
    // useState para controlar o indicador de carregamento.
    const [carregando, setCarregando] = useState<boolean>(false);
    // useState para armazenar a referência do campo que irá fornecer o feedback do erro.
    const [avisoInput, setAvisoInput] = useState<string>("");

    // Função para lidar com o envio do formulário de cadastro.
    // Realiza o cadastro do usuário e trata os diferentes tipos de erro.
    const handleSubmit = async (e: React.FormEvent) => {
        try {
            // Impede o comportamento padrão do formulário de recarregar a página.
            e.preventDefault();
            // Ativa o indicador de carregamento.
            setCarregando(true);

            // Verifica se o valor de email e senha e vazio, e retorna o erro para o usuario caso seja
            // por meio do toast, e indica o local do erro formatando a borda do input em vermelho.

            if (nome == "") {
                setAvisoInput("Nome");
                toast({
                    variant: 'destructive',
                    title: 'Nome Completo não Informado',
                    description: 'Nome Completo não foi informado. Forneça um nome completo para continuar.',
                });                    
            } else if (email == "") {
                setAvisoInput("Email");
                toast({
                    variant: 'destructive',
                    title: 'E-mail não Informado',
                    description: 'E-mail não foi informado. Forneça um e-mail para continuar.',
                }); 
            } else if (senha == "") {
                setAvisoInput("Senha");
                toast({
                    variant: 'destructive',
                    title: 'Senha não Informada',
                    description: 'Senha não foi informada. Forneça uma senha para continuar.',
                });
            }

            // Chama a função de cadastro passando nome, email e senha.
            const response = await cadastrar({ nome, email, senha } as Usuario);

            // Se o cadastro for bem-sucedido:
            if (response.success) {
                // Imprime uma mensagem de sucesso dizendo que a conta foi criada.
                toast({
                    variant: 'success',
                    title: 'Conta criada com sucesso!',
                    description: 'Bem-vindo! Sua conta foi criada. Agora você pode planejar suas viagens conosco.',
                });
                
                // Limpa os campos de entrada.
                setNome("");
                setEmail("");
                setSenha("");
            } else {
                // Trata os diferentes tipos de erro retornados na resposta e fornece feedback ao usuário por meio do toast,
                // configurando o avisoInput para indicar qual campo apresentou erro.
                if (response.error == "Erro: Nome Completo não Informado!") {
                    setAvisoInput("Nome");
                    toast({
                        variant: 'destructive',
                        title: 'Nome Completo não Informado',
                        description: 'Nome Completo não foi informado. Forneça um nome completo para continuar.',
                    });                    
                } else if (response.error == "Erro: Nome Completo com Formato Inválido!") {
                    setAvisoInput("Nome");
                    toast({
                        variant: 'destructive',
                        title: 'Nome Completo com Formato Inválido',
                        description: 'O formato do endereço de e-mail inserido é inválido. Forneça um nome completo válido contendo apenas letras e espaços.',
                    });                    
                } else if (response.error == "Erro: Nome Completo Muito Grande!") {
                    setAvisoInput("Nome");
                    toast({
                        variant: 'destructive',
                        title: 'Nome Completo Muito Grande',
                        description: 'O nome completo inserido é muito grande. Insira um nome completo menor',
                    });
                } else if (response.error == "Erro: E-mail não Informado!") {
                    setAvisoInput("Email");
                    toast({
                        variant: 'destructive',
                        title: 'E-mail não Informado',
                        description: 'E-mail não foi informado. Forneça um e-mail para continuar.',
                    });                    
                } else if (response.error == "Erro: E-mail com Formato Inválido!") {
                    setAvisoInput("Email");
                    toast({
                        variant: 'destructive',
                        title: 'E-mail com Formato Inválido',
                        description: 'O formato do endereço de e-mail inserido é inválido. Verifique e tente novamente.',
                    });
                } else if (response.error == "Erro: E-mail Muito Grande!") {
                    setAvisoInput("Email");
                    toast({
                        variant: 'destructive',
                        title: 'E-mail Muito Grande',
                        description: 'O e-mail inserido é muito grande. Insira um e-mail menor',
                    });
                } else if (response.error == "Erro: E-mail Já Cadastrado!") {
                    setAvisoInput("Email");
                    toast({
                        variant: 'destructive',
                        title: 'Erro: E-mail Já Cadastrado',
                        description: 'O e-mail inserido já está cadastrado!. Insira um novo e-mail.',
                    });
                } else if (response.error == "Erro: Senha não Informada!") {
                    setAvisoInput("Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Senha não Informada',
                        description: 'Senha não foi informada. Forneça um senha para continuar.',
                    });                    
                } else if (response.error == "Erro: Senha com Formato Inválido!") {
                    setAvisoInput("Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Senha com Formato Inválido',
                        description: 'O formato da senha inserido é inválido. Forneça uma senha que atenda aos critérios mínimos, incluindo pelo menos uma letra maiúscula, um número e um caractere especial e no minimo 8 caracteres.',
                    });
                } else if (response.error == "Erro: Senha Muito Pequena!") {
                    setAvisoInput("Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Senha Muito Curta',
                        description: 'Sua senha é muito curta. Por favor, insira uma senha com pelo menos 8 caracteres.',
                    });
                } else if (response.error == "Erro: Senha Muito Grande!") {
                    setAvisoInput("Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Senha Muito Grande',
                        description: 'A senha inserida é muito grande. Insira uma senha menor',
                    });
                } else {
                    // Lança um erro genérico se nenhum dos casos anteriores for atendido.
                    throw new Error("A solicitação falhou. Verifique os dados e tente novamente.");
                }
            }
        } catch (error: any) {
            // Em caso de erro, exibe uma notificação informando que algo deu errado.
            toast({
                variant: 'destructive',
                title: "Ah não! Algo deu errado.",
                description: "Houve um problema com sua solicitação. Tente novamente mais tarde!",
            });    
            console.error(error);
        } finally {
            // Desativa o indicador de carregamento, independentemente do sucesso ou falha.
            setCarregando(false);
        }
    };

    // useEffect para remover o token de autenticação ao carregar a página.
    // Garante que nenhum usuário esteja logado ao acessar a página de cadastro.
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            localStorage.removeItem('authToken');
        }
    }, []); // O array vazio garante que o efeito seja executado somente uma vez, na renderização do componente.

    return (
        // <PaginaCorpo> é o contêiner principal que envolve toda a estrutura da página.
        <PaginaCorpo>
            {/* <PaginaTopo> define o cabeçalho da página, com o botão <Voltar> para retornar à página de login. */}
            <PaginaTopo>
                <Voltar para="entrar"/>
            </PaginaTopo>
            {/* <PaginaMeio> contém o conteúdo principal da página. */}
            <PaginaMeio>
                {/* 
                    Container dos elementos do formulário de cadastro.
                    grid: Define o container como um display grid, permitindo organizar os elementos filhos em linhas e colunas.
                    place-items-center: Centraliza os itens tanto horizontalmente quanto verticalmente dentro da grade.
                    items-start: Alinha os itens no início do eixo transversal do contêiner.
                    gap-5: Define um espaçamento de 5 entre os itens da grade.
                    xxs:gap-8: Em telas maiores que 390px, define um espaçamento de 8 entre os itens da grade.
                    xs:gap-5: Em telas maiores que 450px, define novamente um espaçamento de 5 entre os itens da grade.
                    mx-[6.8vw]: Define a margem horizontal de 6.8vw para cada lado.
                    lg:mb-[4vw]: Em telas maiores que 1024px, adiciona uma margem inferior de 4vw.
                */}
                <div className="grid place-items-center items-start gap-5 xxs:gap-8 xs:gap-5 mx-[6.8vw] lg:mb-[4vw]">
                    {/* 
                        Formulário de cadastro.
                        onSubmit: Quando o usuário clicar no botão do tipo submit, será acionada a função handleSubmit.
                        grid: Define o container como um display grid, permitindo organizar os elementos filhos em linhas e colunas.
                        place-items-center: Centraliza os itens tanto horizontalmente quanto verticalmente dentro da grade.
                        items-center: Alinha os itens no centro ao longo do eixo da linha, reforçando a centralização.
                        gap-1: Define um espaçamento de 1 entre os itens da grade.
                        xxs:gap-2: Em telas maiores que 390px, define um espaçamento de 2 entre os itens.
                        xs:gap-1: Em telas maiores que 450px, define novamente um espaçamento de 1 entre os itens.
                        sm:gap-2: Em telas maiores que 640px, define um espaçamento de 2 entre os itens.
                    */}
                    <form onSubmit={handleSubmit} className="grid place-items-center items-center gap-1 xxs:gap-2 xs:gap-1 sm:gap-2">
                        {/* 
                            <div> que contém o título e a descrição do formulário.
                            text-center: Centraliza o texto horizontalmente.
                            text-gray-900: Define a cor do texto com um tom de cinza escuro.
                        */}
                        <div className="text-center text-gray-900">
                            {/* 
                                <h1>: Título com tamanho de fonte responsivo e alinhamento ajustado conforme a tela.
                                font-semibold: Muda a fonte do componente para uma fonte mais para o lado do negrito.
                                text-[8.9vw]: Define o tamanho padrão do texto como 8.9vw.
                                xxs:text-[10vw]: Em telas maiores que 390px, ajusta o tamanho do texto para 10vw.
                                xs:text-[7.3vw]: Em telas maiores que 450px, ajusta o tamanho do texto para 7.3vw.
                                lg:text-[4vw]: Em telas maiores que 1024px, ajusta o tamanho do texto para 4vw.
                                xl:text-[3.4vw]: Em telas maiores que 1536px, ajusta o tamanho do texto para 3.4vw.
                                leading-[1.2]: Define a altura da linha como 1.2, garantindo um espaçamento adequado entre as linhas.
                            */}
                            <h1 className="font-semibold text-[8.9vw] xxs:text-[10vw] xs:text-[7.3vw] lg:text-[4vw] xl:text-[3.4vw] leading-[1.2]">
                                Junte-se a nós!
                            </h1>
                            {/* 
                                <p>: Parágrafo com tamanho de fonte e alinhamento responsivos.
                                xxs:text-lg: Em telas maiores que 390px, define o tamanho do texto como "lg".
                                xs:text-xl: Em telas maiores que 450px, define o tamanho do texto como "xl".
                                sm:text-[2.7vw]: Em telas maiores que 640px, o tamanho do texto é ajustado para 2.7vw.
                                lg:text-base: Em telas maiores que 1024px, o tamanho do texto volta a ser "base".
                                xl:text-[1.3vw]: Em telas maiores que 1536px, o tamanho do texto é ajustado para 1.3vw.
                                xl:leading-[1.2]: Em telas maiores que 1536px, define a altura da linha como 1.2.
                            */}
                            <p className="xxs:text-lg xs:text-xl sm:text-[2.7vw] lg:text-base xl:text-[1.3vw] xl:leading-[1.2]">
                                Crie sua conta e aproveite nossos recursos.
                            </p>
                        </div>
                        {/* 
                            Container dos campos de input.
                            w-full: O componente vai preencher 100% da largura do componente pai.
                            grid: Define o container como um display grid, permitindo organizar os elementos filhos em linhas e colunas.
                            gap-1: Define um espaçamento de 1 entre os itens da grade.
                            xxs:gap-2: Em telas maiores que 390px, define um espaçamento de 2 entre os itens.
                            xs:gap-1: Em telas maiores que 450px, define novamente um espaçamento de 1 entre os itens.
                            sm:mt-2: Em telas maiores que 640px, adiciona uma margem superior de 2.
                        */}
                        <div className="w-full grid gap-1 xxs:gap-2 xs:gap-1 sm:mt-2">
                            {/* Campo de Nome Completo */}
                            <div>
                                {/* htmlFor: Referencia o elemento que tenha o mesmo id especificado. */}
                                <Label htmlFor="nome">
                                    Nome Completo
                                </Label>
                                <Input
                                    // Adiciona um ID para o elemente como referencia para o Label.
                                    id="nome"
                                    // Define um texto para ser preenchido quando o <input> estiver vazio.
                                    placeholder="Seu nome completo"
                                    // Define que o input terá o mesmo valor da constante nome.
                                    value={nome}
                                    // Ao escrever no input ele atualiza o valor da constante nome.
                                    onChange={(e) => setNome(e.target.value)}
                                    // Se avisoInput indicar erro em "Nome", adiciona borda vermelha.
                                    className={avisoInput == "Nome" ? "border-red-500" : ""}
                                    // Ao clickar no input caso ele tenha a bordar vermelha ira resertar para a borda padrão.
                                    onClick={() => setAvisoInput("")}
                                />
                            </div>
                            {/* Campo de Email */}
                            <div>
                                {/* htmlFor: Referencia o elemento que tenha o mesmo id especificado. */}
                                <Label htmlFor="email">
                                    Email
                                </Label>
                                <Input
                                    // Adiciona um ID para o elemente como referencia para o Label.
                                    id="email"
                                    // Define um texto para ser preenchido quando o <input> estiver vazio.
                                    placeholder="nome@exemplo.com"
                                    // Define que o input terá o mesmo valor da constante email.
                                    value={email}
                                    // Ao escrever no input ele atualiza o valor da constante email.
                                    onChange={(e) => setEmail(e.target.value)}
                                    // Se avisoInput indicar erro em "Email", adiciona borda vermelha.
                                    className={avisoInput == "Email" ? "border-red-500" : ""}
                                    // Ao clickar no input caso ele tenha a bordar vermelha ira resertar para a borda padrão.
                                    onClick={() => setAvisoInput("")}
                                />
                            </div>
                            {/* Campo de Senha */}
                            <div>
                                {/* htmlFor: Referencia o elemento que tenha o mesmo id especificado. */}
                                <Label htmlFor="senha">
                                    Senha
                                </Label>
                                <InputSenha
                                    // Adiciona um ID para o elemente como referencia para o Label.
                                    id="senha"
                                    // Define que o input terá o mesmo valor da constante senha.
                                    value={senha}
                                    // Ao escrever no input ele atualiza o valor da constante senha.
                                    onChange={(e) => setSenha(e.target.value)}
                                    // Se avisoInput indicar erro em "Senha", adiciona borda vermelha.
                                    className={avisoInput == "Senha" ? "border-red-500" : ""}
                                    // Ao clickar no input caso ele tenha a bordar vermelha ira resertar para a borda padrão.
                                    onClick={() => setAvisoInput("")}
                                />
                            </div>
                        </div>
                        {/* 
                            Botão de envio do formulário.
                            w-full: O componente vai preencher 100% da largura do componente pai.
                            mt-1: Adiciona uma margem superior de 1, criando um pequeno espaçamento.
                            xxs:mt-2: Em telas maiores que 390px, ajusta a margem superior para 2.
                            xs:mt-1: Em telas maiores que 450px, mantém a margem superior em 1.
                            sm:mt-2: Em telas maiores que 640px, ajusta a margem superior para 2.
                        */}
                        <div className="w-full mt-1 xxs:mt-2 xs:mt-1 sm:mt-2">
                            <Button
                                // type="submit": Define o tipo do botão como "submit". Isso faz com que, ao ser clicado, o botão envie o formulário.
                                type="submit"
                                // w-full: O componente vai preencher 100% da largura do componente pai.
                                className="w-full"
                            >
                                {
                                    // Exibe o <Spinner> se estiver carregando; caso contrário, exibe "Criar".
                                    carregando ? <Spinner /> : "Criar"
                                }
                            </Button>
                        </div>
                        {/* Componente para exibir notificações. */}
                        <Toaster />
                    </form>
                </div>
                {/* 
                    Exibição da imagem.
                    my-4: Adiciona margem vertical de 4.
                    px-[18vw]: Define um padding horizontal de 18vw.
                    xxs:px-[12vw]: Em telas maiores que 390px, ajusta o padding horizontal para 12vw.
                    xs:px-[24vw]: Em telas maiores que 450px, ajusta o padding horizontal para 24vw.
                    sm:px-[26vw]: Em telas maiores que 640px, ajusta o padding horizontal para 26vw.
                    lg:px-[8vw]: Em telas maiores que 1024px, ajusta o padding horizontal para 8vw.
                */}
                <div>
                    <img 
                        src={Image}
                        className="my-4 px-[18vw] xxs:px-[12vw] xs:px-[24vw] sm:px-[26vw] lg:px-[8vw]"
                    />
                </div>
            </PaginaMeio>
            {/* <PaginaRodape> contém o rodapé da página, onde os créditos são exibidos. */}
            <PaginaRodape>
                <Creditos />
            </PaginaRodape>
        </PaginaCorpo>
    )
}
