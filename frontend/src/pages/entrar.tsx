// Importa componentes de layout que definem a estrutura da página.
// <PaginaCorpo>: Define o componente PaginaCorpo, que representa o <body> da página onde todas as outras estruturas irão estar.
// <PaginaTopo>: Define o componente que representa o cabeçalho da página e que deverá ficar sempre no ponto mais alto da página.
// <PaginaMeio>: Contém o conteúdo principal da página.
// <PaginaRodape>: Define o componente que representa o rodapé da página.
import { PaginaCorpo, PaginaRodape, PaginaMeio, PaginaTopo } from "../components/PageLayout/LayoutPagina";
import Image from '../assets/rick-and-morty-31042.png'; // Importa a imagem que será utilizada na página de login.

import { Button } from "../components/ui/button"; // Importa o componente <Button> que renderiza botões customizados com estilos pré-definidos.
import { Creditos } from "@/components/Creditos"; // Importa o componente <Creditos> da criação do projeto.
import { Voltar } from "@/components/Voltar"; // Importa o componente <Voltar>, que fornece um paragrafo com um link para retornar a uma página especificada
import { Label } from "@/components/ui/label"; // Importa o componente <Label> utilizado para rotular os campos de formulário e direcionar para o componente especificado.
// Importa os componentes <Input> e <InputSenha> para receber dados do usuário. 
// <InputSenha> inclui funcionalidades extras, como alternar a visibilidade da senha.
import { Input, InputSenha } from "@/components/ui/input";
// Importa os hooks useEffect e useState do React.
// useState: Permite criar e gerenciar estados locais dentro do componente.
// useEffect: // Permite criar efeitos colaterais ao montar o componente ou quando determinado valor for alterado.
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa o componente <Link> para navegação sem recarregar a página, e o hook useNavigate para navegação programática.
import { Spinner } from "@/components/ui/spinner"; // Importa o componente <Spinner> que exibe um indicador visual de carregamento enquanto uma ação está em progresso.
import { Toaster } from "@/components/ui/toaster"; // Importa o componente <Toaster> que gerencia e exibe notificações para o usuário.
import { toast } from "@/hooks/use-toast"; // Importa a função toast, utilizada para disparar notificações customizadas na aplicação.
import { Login } from "@/types/types"; // Importa o tipo Login para fazer a requisição de autentica.
import { autentica } from "@/service/service"; // Importa a função autentica responsável por enviar os dados de login para o backend e autenticar o usuário e retornar o token JWT.


// Componente funcional que representa a página de login
export default function Entrar() {
    // useState para armazenar o email digitado pelo usuário.
    const [email, setEmail] = useState<string>('');
    // useState para armazenar a senha digitada pelo usuário.
    const [senha, setSenha] = useState<string>('');
    // useState para controlar o indicador de carregamento.
    const [carregando, setCarregando] = useState<boolean>(false);
    // useState para armazenar a referencia do campo que irá fornecer o feedback do erro.
    const [avisoInput, setAvisoInput] = useState<string>("");
    // Hook useNavigate para navegação programática entre rotas.
    const navigate = useNavigate();

    // Função para lidar com o envio do formulário de login.
    // Realiza a autenticação do usuário e trata os diferentes tipos de erro.
    const handleSubmit = async (e: React.FormEvent) => {
        try {
            // Impede o comportamento padrão do formulário de recarregar a pagina.
            e.preventDefault();
            // Ativa o indicador de carregamento.
            setCarregando(true);

            // Verifica se o valor de email e senha e vazio, e retorna o erro para o usuario caso seja
            // por meio do toast, e indica o local do erro formatando a borda do input em vermelho.
            if (email == "") {
                setAvisoInput("Email");
                toast({
                    variant: 'destructive',
                    title: 'E-mail não Informado',
                    description: 'E-mail não foi informado. Forneça um e-mail para continuar.',
                }); 
                return;
            } else if (senha == "") {
                setAvisoInput("Senha");
                toast({
                    variant: 'destructive',
                    title: 'Senha não Informada',
                    description: 'Senha não foi informada. Forneça uma senha para continuar.',
                });
                return;
            }

            // Chama a função de autenticação passando email e senha.
            const response = await autentica({ email, senha } as Login);

            // Se a autenticação for bem sucedida:
            if (response.success) {
                // Armazena o token recebido no localStorage na chave "authToken".
                localStorage.setItem("authToken", response.data);
                // Redireciona o usuário para a página central pois o login foi efetivado.
                navigate("/central");
            } else {
                // Trata os diferentes tipos de erro retornados na resposta e retorna 
                // para o usuario por meio do toast a mensagem do erro ocorrido, junto com isso ele configura o 
                // avisoInput para fornecer o feedback de qual campo o erro aconteceu.
                if (response.error == "Erro: E-mail não Informado!") {
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
                } else if (response.error == "Erro: Senha não Informada!") {
                    setAvisoInput("Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Senha não Informada',
                        description: 'Senha não foi informada. Forneça uma senha para continuar.',
                    });
                } else if (response.error == "Erro: Senha com Formato Inválido!") {
                    setAvisoInput("Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Senha com Formato Inválido',
                        description: 'O formato da senha inserida é inválido. Forneça uma senha que atenda aos critérios mínimos, incluindo pelo menos uma letra maiúscula, um número, um caractere especial e no mínimo 8 caracteres.',
                    });
                } else if (response.error == "Erro: E-mail ou Senha Incorretos!") {
                    setAvisoInput("Email-Senha");
                    toast({
                        variant: 'destructive',
                        title: 'E-mail ou Senha Incorretos',
                        description: 'O e-mail ou a senha inseridos são incorretos. Por favor, tente novamente.',
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
            //Imprime no console o erro ocorrido.
            console.error(error);
        } finally {
            // Desativa o indicador de carregamento, independentemente do sucesso ou falha.
            setCarregando(false);
        }
    };

    // useEffect para remover o token de autenticação ao carregar a página.
    // Garante que nenhum usuário esteja logado ao acessar a página de login.
    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            localStorage.removeItem('authToken');
        }
    }, []); // O array vazio garante que o efeito seja executado somente uma vez, na renderização do componente.

    return (
        // <PaginaCorpo> é o contêiner principal que envolve toda a estrutura da página
        <PaginaCorpo>
            {/* <PaginaTopo> define o cabeçalho da página, com o botão <Voltar> para retornar à página inicial. */}
            <PaginaTopo>
                <Voltar para="inicio" />
            </PaginaTopo>

            {/* <PaginaMeio> contém o conteúdo principal da página. */}
            <PaginaMeio>
                {/* 
                    Exibição da imagem de forma responsiva
                    hidden: O componente fica com display none por padrao.
                    lg:block: Em telas maiores que 1024px o componente fica visivel, 
                    isso e necessario pois em telas maiores que 1024px a tela tera duas colunas.
                */}
                <div className="hidden lg:block">
                    <img 
                        src={Image}
                        className="px-[4vw]" // Define um padding horizontal de 4vw.
                    />
                </div>
                {/* 
                    Container dos elementos do formulário e da imagem para telas menores.
                    grid: Define o container como um display grid, permitindo organizar os elementos filhos em linhas e colunas.
                    place-items-center: Centraliza os itens tanto horizontalmente quanto verticalmente dentro da grade.
                    items-start: Alinha os itens no início do eixo transversal do contêiner.
                    gap-5: Define um espaçamento de 5 entre os itens da grade.
                    xxs:gap-8: Em telas maiores que 390px, define um espaçamento de 8 entre os itens da grade.
                    xxs:gap-5: Em telas maiores que 450px, define novamente um espaçamento de 5 entre os itens da grade.
                    mx-[6.8vw]: Define a margem horizontal de 6.8vw para cada lado.
                    mb-[4w]: Define uma margem inferior de 4vw.
                */}
                <div className="grid place-items-center items-start gap-5 xxs:gap-8 xs:gap-5 mx-[6.8vw] mb-[4vw]">
                    {/* 
                        Exibe a imagem apenas em telas menos que 1024px e como está dentro do mesmo componente que os demais, a imagem é renderizada na mesma coluna
                        diferente da que está de fora que é renderizada fora do componente e somente me telas maiores que 1024px. 
                    */}
                    <div className="lg:hidden">
                        <img 
                            src={Image}
                            className="px-[13vw] xxs:px-[8vw] xs:px-[20vw]" // Ajusta o padding horizontal conforme o tamanho da tela.
                        />
                    </div>
                    {/* 
                        Formulário de login.
                        onSubmit: quando o usuario clicar no botão do tipo submit dentro do componente será acinado a funcao handleSubmit.
                        grid: Define o container como um display grid, permitindo organizar os elementos filhos em linhas e colunas.
                        place-items-center: Centraliza os itens tanto horizontalmente quanto verticalmente dentro da grade.
                        items-center: Alinha os itens no centro ao longo do eixo da linha, reforçando a centralização.
                        gap-2: Define um espaçamento de 2 entre os itens da grade.
                    */}
                    <form onSubmit={handleSubmit} className="grid place-items-center items-center gap-2">
                        {/*
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
                                lg:text-[4.1vw]: Em telas maiores que 1024px, ajusta o tamanho do texto para 4.1vw.
                                leading-[1.2]: Define a altura da linha como 1.2, garantindo um espaçamento adequado entre as linhas.
                            */}
                            <h1 className="font-semibold text-[8.9vw] xxs:text-[10vw] xs:text-[7.3vw] lg:text-[4.1vw] leading-[1.2]">
                                Seja bem-vindo!
                            </h1>
                            {/*
                                <p>: Parágrafo com tamanho de fonte e alinhamento responsivos.
                                xxs:text-lg: Em telas maiores que 390px, define o tamanho do texto como "lg".
                                xs:text-xl: Em telas maiores que 450px, define o tamanho do texto como "xl".
                                sm:text-[2.7vw]: Em telas maiores que 640px, o tamanho do texto é ajustado para 2.7vw.
                                lg:text-base: Em telas maiores que 1024px, o tamanho do texto passa a ser o padrao.
                                xl:text-[1.8vw]: Em telas maiores que 1536px, o tamanho do texto é ajustado para 1.8vw.
                                xl:leading-[1.2]: Em telas maiores que 1536px, define a altura da linha como 1.2, garantindo um espaçamento adequado entre as linhas.
                                mt-2: Adiciona uma margem superior de 2, criando um pequeno espaçamento acima do parágrafo.
                                mt-2: Em telas maiores que 1024px, adiciona uma margem superior de 2, criando um pequeno espaçamento acima do parágrafo.
                            */}
                            <p className="xxs:text-lg xs:text-xl sm:text-[2.7vw] lg:text-base xl:text-[1.3vw] xl:leading-[1.2] mt-2 lg:mt-1">
                                Conecte-se para utilizar nossa ferramenta.
                            </p>
                        </div>
                        {/* 
                            Container dos campos de input. 
                            w-full: O componente vai preencher 100% da largura do componente pai.
                            grid: Define o container como um display grid, permitindo organizar os elementos filhos em linhas e colunas.
                            gap-2: Define um espaçamento de 2 entre os itens da grade.
                        */}
                        <div className="w-full grid gap-2">
                            {/* Campo de Email */}
                            <div>
                                {/* htmlFor: Referencia o elemento que tenha o mesmo id que na propriedade. */}
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
                                    // Se avisoInput indicar erro em "Email" ou "Email-Senha", adiciona borda vermelha.
                                    className={["Email", "Email-Senha"].includes(avisoInput) ? "border-red-500" : ""}
                                    // Ao clickar no input caso ele tenha a bordar vermelha ira resertar para a borda padrão.
                                    onClick={() => setAvisoInput("")}
                                />
                            </div>
                            {/* Campo de Senha */}
                            <div>
                                {/* htmlFor: Referencia o elemento que tenha o mesmo id que na propriedade. */}
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
                                    // Se avisoInput indicar erro em "Senha" ou "Email-Senha", adiciona borda vermelha.
                                    className={["Senha", "Email-Senha"].includes(avisoInput) ? "border-red-500" : ""}
                                    // Ao clickar no input caso ele tenha a bordar vermelha ira resertar para a borda padrão.
                                    onClick={() => setAvisoInput("")}
                                />
                            </div>
                        </div>
                        {/* 
                            Botão de envio do formulário. 
                            w-full: O componente vai preencher 100% da largura do componente pai.
                            mt-2: Adiciona uma margem superior de 2, criando um pequeno espaçamento.
                        */}
                        <div className="w-full mt-2">
                            <Button
                                // Isso faz com que, ao ser clicado, o botão envie o formulário no qual está contido, acionando o evento onSubmit do formulário.
                                type="submit"
                                // w-full: O componente vai preencher 100% da largura do componente pai.
                                className="w-full"
                            >
                                {
                                    // Exibe o <Spinner> se estiver carregando; caso contrário, exibe "Entrar".
                                    carregando ? <Spinner /> : "Entrar"
                                }
                            </Button>
                        </div>
                        {/* 
                            Link para navegação até a página de cadastro.
                            flex: Organiza os elementos usando flexbox, oque facilita a organização e o alinhamento dos componentes.
                            gap-1: Define um espaçamento de 1 entre os itens da grade.
                            text-p-responsive: classe criada no arquivo tailwind.config.js para facilitar a responsividade da tag <p>.
                        */}
                        <div className="flex gap-1 text-p-responsive">
                            <p>
                                Nao tem uma conta?
                            </p>
                            {/* Link que direciona para a página de cadastrar */}
                            <Link to="/cadastrar">
                                <strong>
                                    Cadastre-se!
                                </strong>
                            </Link>
                        </div>
                        {/* Componente para exibir notificações. */}
                        <Toaster />
                    </form>
                </div>
            </PaginaMeio>
            {/* <PaginaRodape> contém o rodapé da página, onde os créditos são exibidos. */}
            <PaginaRodape>
                <Creditos />
            </PaginaRodape>
        </PaginaCorpo>
    )
}
