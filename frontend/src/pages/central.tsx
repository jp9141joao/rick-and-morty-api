// Importa componentes de layout que definem a estrutura da página. 
// <PaginaCorpo>: Define o componente PaginaCorpo, que representa o <body> da página onde todas as outras estruturas irão estar.
// <PaginaTopo>: Define o componente que representa o cabeçalho da página e que deverá ficar sempre no ponto mais alto da página.
// <PaginaMeioUmaColuna>: Possui as mesmas propriedades do componente <PaginaMeio>, porém sempre com uma única coluna independente do tamanho da tela.
// <PaginaRodape>: Define o componente que representa o rodapé da página.
import { PaginaCorpo, PaginaRodape, PaginaMeioUmaColuna, PaginaTopo } from "../components/PageLayout/LayoutPagina";
import { Creditos } from "@/components/Creditos"; // Importa o componente <Creditos> da criação do projeto.
import { Check, ChevronDown, MapPin, Menu, MoveRight } from "lucide-react"; // Importa ícones do "lucide-react", utilizados para exibir ícones na interface.
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"; // Importa os componentes do dropdown menu, que fornecem uma interface interativa para exibir opções em um menu suspenso.
import { useEffect, useState } from "react"; 
// useState: Permite criar e gerenciar estados locais dentro do componente.
// useEffect: Permite criar efeitos colaterais ao montar o componente ou quando determinado valor for alterado.
import { Button } from "@/components/ui/button"; // Importa o componente <Button> que renderiza botões customizados com estilos pré-definidos.
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"; // Importa os componentes do Sheet, que permitem exibir uma interface de "drawer" ou painel lateral interativo.
import { Input, InputSenha } from "@/components/ui/input"; 
// Importa os componentes <Input> e <InputSenha> para receber dados do usuário. 
// <InputSenha> inclui funcionalidades extras, como alternar a visibilidade da senha.
import { Info, Filtro, Navegacao, Personagem, Usuario } from "@/types/types"; 
// Importa os tipos para definir a estrutura dos dados utilizados na aplicação:
// Info: Define a estrutura para atualização de informações do usuário.
// Filtro: Define a estrutura para filtrar os personagens.
// Navegacao: Define a estrutura para navegação entre as páginas da API.
// Personagem: Define a estrutura dos personagens retornados pela API.
// Usuario: Define a estrutura dos dados do usuário.
import { toast } from "@/hooks/use-toast"; // Importa a função toast, utilizada para disparar notificações customizadas na aplicação.
import { Toaster } from "@/components/ui/toaster"; // Importa o componente <Toaster> que gerencia e exibe notificações para o usuário.
import { getUsuario, mudarInfo } from "@/service/service"; 
// Importa as funções getUsuario e mudarInfo responsáveis por obter e atualizar as informações do usuário, respectivamente, via backend.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Importa os componentes do Card, que são utilizados para exibir informações de forma organizada e estilizada.
import { Label } from "@/components/ui/label"; // Importa o componente <Label> utilizado para rotular os campos de formulário.
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"; // Importa os componentes de paginação que permitem a navegação entre páginas de resultados.
import { Spinner } from "@/components/ui/spinner"; // Importa o componente <Spinner> que exibe um indicador visual de carregamento enquanto uma ação está em progresso.

export default function Central() {
    // useState para armazenar os dados do usuário.
    const [usuario, setUsuario] = useState<Usuario>();
    // useState para armazenar o nome do usuário.
    const [nome, setNome] = useState<string>();
    // useState para armazenar o email do usuário.
    const [email, setEmail] = useState<string>();
    // useState para controlar se o botão deve estar desabilitado.
    const [desabilitarBtn, setDesabilitarBtn] = useState<boolean>(false);
    // useState para armazenar a senha atual do usuário.
    const [senha, setSenha] = useState<string>('');
    // useState para armazenar a nova senha para atualização.
    const [novaSenha, setNovaSenha] = useState<string>('');
    // useState para controlar o indicador de carregamento.
    const [carregando, setCarregando] = useState<boolean>(false);
    // useState para armazenar a referência do campo que fornecerá o feedback do erro.
    const [avisoInput, setAvisoInput] = useState<string>('');
    // useState para armazenar o conteúdo exibido na sidebar.
    const [conteudo, setConteudo] = useState<string>('Menu');
    // useState para armazenar o filtro aplicado na listagem dos personagens.
    const [filtro, setFiltro] = useState<Filtro>({ por: 'Filtro', valor: '' });
    // useState para armazenar a lista de personagens retornados pela API.
    const [personagens, setPersonagens] = useState<Personagem[]>([]);
    // useState para armazenar o item selecionado no filtro.
    const [itemSelecionado, setItemSelecionado] = useState<string>('Filtro');
    // useState para armazenar o número da página atual na listagem dos personagens.
    const [numeroPagina, setNumeroPagina] = useState<number>(1);
    // useState para armazenar os dados de navegação (página anterior e próxima) na API.
    const [navegacao, setNavegacao] = useState<Navegacao>({ voltar: null, proximo: '' });
    // Array de strings que define as opções do menu de filtro.
    const dadosMenu: string[] = ['Nome', 'Status', 'Especie', 'Genero', 'Localizacao'];
    // Define a URL da API dos personagens, incorporando o número da página atual.
    const api = `https://rickandmortyapi.com/api/character?page=${numeroPagina}`

    // Função para lidar com a atualização das informações do usuário.
    // Realiza a atualização das informações e trata os diferentes tipos de erro.
    const handleMudarDados = async (e: React.FormEvent) => {
        try {
            // Impede o comportamento padrão do formulário de recarregar a página.
            e.preventDefault();
            // Ativa o indicador de carregamento.
            setCarregando(true);

            // Chama a função mudarInfo passando o nome e o email para atualizar as informações do usuário.
            const response = await mudarInfo({ nome, email, operacao: "Info" } as Info);

            // Se a requisição for bem-sucedida:
            if (response.success) {
                // Recarrega as informações do usuário.
                carregarUsuario();
                // Desabilita o botão para evitar atualizações repetidas.
                setDesabilitarBtn(true);

                // Imprime uma mensagem de sucesso dizendo que a conta foi criada.
                toast({
                    variant: 'success',
                    title: 'Informações atualizadas!',
                    description: 'Suas informações foram alteradas com sucesso.',
                });
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
                        description: 'Senha não foi informado. Forneça um senha para continuar.',
                    });
                } else if (response.error == "Erro: Senha com Formato Inválido!") {
                    setAvisoInput("Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Senha com Formato Inválido',
                        description: 'O formato da senha inserido é inválido. Forneça uma senha que atenda aos critérios mínimos, incluindo pelo menos uma letra maiúscula, um número e um caractere especial e no minimo 8 caracteres.',
                    });
                } else if (response.error == "Erro: Senha Incorreta!") {
                    setAvisoInput("Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Senha Inválido',
                        description: 'A senha informada está incorreta. Por favor, verifique e tente novamente.',
                    });
                } else if (response.error == "Erro: Nova Senha não Informada!") {
                    setAvisoInput("Nova-Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Nova Senha não Informada',
                        description: 'Nova Senha não foi informado. Forneça um nova senha para continuar.',
                    });
                } else if (response.error == "Erro: Nova Senha com Formato Inválido!") {
                    setAvisoInput("Nova-Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Nova Senha com Formato Inválido',
                        description: 'O formato da nova senha inserido é inválido. Forneça uma nova senha que atenda aos critérios mínimos, incluindo pelo menos uma letra maiúscula, um número e um caractere especial e no minimo 8 caracteres.',
                    });
                } else if (response.error == "Erro: Nova Senha Muito Pequena!") {
                    setAvisoInput("Nova-Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Nova Senha Muito Curta',
                        description: 'Sua nova senha é muito curta. Por favor, insira uma nova senha com pelo menos 8 caracteres.',
                    });
                } else if (response.error == "Erro: Nova Senha Muito Grande!") {
                    setAvisoInput("Nova-Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Nova Senha Muito Grande',
                        description: 'A nova senha inserida é muito grande. Insira uma nova senha menor',
                    });
                } else {
                    // Lança um erro genérico se não for bem sucedida.
                    throw new Error("A solicitação falhou. Verifique os dados e tente novamente.");
                }
            }
        } catch (erro: any) {
            // Em caso de erro, exibe uma notificação informando que algo deu errado.
            toast({
                variant: 'destructive',
                title: "Ah não! Algo deu errado.",
                description: "Houve um problema com sua solicitação. Tente novamente mais tarde!",
            });
            // Imprime no console o erro ocorrido.
            console.error(erro);
        } finally {
            // Desativa o indicador de carregamento, independentemente do sucesso ou falha.
            setCarregando(false);
        }
    };

    // Função para lidar com a atualização da senha do usuário.
    // Realiza a atualização da senha e trata os diferentes tipos de erro.
    const handleMudarSenha = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setCarregando(true);

            // Chama a função mudarInfo passando a senha atual e a nova senha.
            const response = await mudarInfo({ senha, novaSenha } as Info);

            // Se a requisição for bem-sucedida:
            if (response.success) {
                // Recarrega as informações do usuário.
                carregarUsuario();
                // Limpa os campos de senha.
                setSenha("");
                setNovaSenha("");

                // Imprime uma mensagem de sucesso dizendo que a conta foi criada.
                toast({
                    variant: 'success',
                    title: 'Senha alterada!',
                    description: 'Sua senha foi alterada com sucesso. Use a nova senha para acessar sua conta.',
                });
            } else {
                // Trata os diferentes tipos de erro retornados na resposta e retorna 
                // para o usuario por meio do toast a mensagem do erro ocorrido, junto com isso ele configura o 
                // avisoInput para fornecer o feedback de qual campo o erro aconteceu.
                if (response.error == "Erro: Senha Inválido!") {
                    setAvisoInput("Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Senha Inválida',
                        description: 'Por favor, forneça uma senha que atenda aos critérios mínimos, incluindo pelo menos uma letra maiúscula, um número e um caractere especial.',
                    });
                } else if (response.error = "Erro: Senha Muito Pequena!") {
                    setAvisoInput("Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Senha Muito Curta',
                        description: 'Sua senha é muito curta. Por favor, insira uma senha com pelo menos 8 caracteres.',
                    });
                } if (response.error == "Erro: Nova Senha Inválida!") {
                    setAvisoInput("Nova-Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Nova Senha Inválida',
                        description: 'Por favor, forneça uma nova senha que atenda aos critérios mínimos, incluindo pelo menos uma letra maiúscula, um número e um caractere especial.',
                    });
                } else if (response.error = "Erro: Nova Senha Muito Pequena!") {
                    setAvisoInput("Nova-Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Nova Senha Muito Curta',
                        description: 'Sua nova senha é muito curta. Por favor, insira uma nova senha com pelo menos 8 caracteres.',
                    });
                } else {
                    // Lança um erro genérico se não for bem sucedida.
                    throw new Error("A solicitação falhou. Verifique os dados e tente novamente.");
                }
            }
        } catch (erro: any) {
            // Em caso de erro, exibe uma notificação informando que algo deu errado.
            toast({
                variant: 'destructive',
                title: "Ah não! Algo deu errado.",
                description: "Houve um problema com sua solicitação. Tente novamente mais tarde!",
            });
            // Imprime no console o erro ocorrido.
            console.error(erro);
        } finally {
            // Desativa o indicador de carregamento, independentemente do sucesso ou falha.
            setCarregando(false);
        }
    };

    // Função para realizar o logout do usuário.
    // Remove o token de autenticação do localStorage e recarrega a página.
    const handleSair = () => {
        localStorage.removeItem("authToken");
        window.location.reload();
    };

    // Função para carregar os dados do usuário a partir do backend.
    const carregarUsuario = async () => {
        try {
            // Cha,a a função getUsuario que retorna as informações do usuario por meio do token JWT.
            const response = await getUsuario();

            // Se a requisição for bem sucedida:
            if (response.success) {
                // Armazena as informações do usuario nas contantes usuario, nome e email.
                setUsuario(response.data);
                setNome(response.data.nome);
                setEmail(response.data.email);
            } else {
                // Lança um erro genérico se não for bem sucedida.
                throw new Error("A solicitação falhou. Verifique os dados e tente novamente.");
            }
        } catch (erro: any) {
            // Em caso de erro, exibe uma notificação informando que algo deu errado.
            toast({
                variant: 'destructive',
                title: "Ah não! Algo deu errado.",
                description: "Houve um problema com sua solicitação. Tente novamente mais tarde!",
            });
            // Imprime no console o erro ocorrido.           
            console.error(erro);
        }
    };

    // Função para carregar os personagens da API.
    const carregarPersonagens = async () => {
        try {
            // Realiza a requisição dos personagens da API no link definida e converte o valor retornado em JSON.
            const response = await fetch(api).then(res => res.json());

            // Se a response for bem sucessidade o length dos results será maior que um, caso contrário 
            // a requisição não deu certo.
            if (response.results.length > 0) {

                // Desmenbramento do valor retornando para o tratamento dos dados por meio do map
                // que irá percorrer todo o vetor da response e irá converter os dados e armazenalos nas propriedades
                // correspondentes
                let dadosPersonagens: Personagem[] = response.results.map((personagem: any) => {
                    // Define o genero da silaba.
                    const g: string = personagem.gender == "Female" ? "a" : "o";
                    return {
                        id: personagem.id,
                        nome: personagem.name,
                        status:
                            // Traduz Alive para Vivo ou Viva dependendo do genero.
                            personagem.status == "Alive" ? `Viv${g}` :
                            // Traduz Dead para Morto ou Morta dependendo do genero.
                            personagem.status == "Dead" ? `Mort${g}` :
                            // Retorna desconhecido caso seja Unkown
                            "Desconhecido",
                        especie: personagem.especies == "Unknown" ? "Desconhecido" : personagem.especies,
                        genero:
                            // Caso traduz os genero para Masculino ou Feminino.
                            personagem.gender == "Female" ? "Feminino" :
                            personagem.gender == "Male" ? "Masculino" :
                            // Retorna desconhecido caso seja Unkown.
                            "Desconhecido",
                        // Retorna desconhecido caso origem ou localização seja Unkown, caso não seja retorna o valor original.
                        localizacao: personagem.location.name == "Unknown" ? "Desconhecido" : personagem.location.name,
                        imagem: personagem.image
                    }
                });
            
                // Atribui o valor das paginas para a variavel navegação que irá 
                // conseguir reconhecer se poderá avançar ou voltar sem dar erro.
                setNavegacao({
                    voltar: response.info.prev,
                    proximo: response.info.next
                });

                // Atribui o valor dos personagens formatados a varivel personagens.
                setPersonagens(dadosPersonagens);
            } else {
                // Lança um erro genérico se não for bem sucedida.
                throw new Error("A solicitação falhou. Verifique os dados e tente novamente.");
            }
        } catch (erro: any) {
            // Em caso de erro, exibe uma notificação informando que algo deu errado.
            toast({
                variant: 'destructive',
                title: "Ah não! Algo deu errado.",
                description: "Houve um problema com sua solicitação. Tente novamente mais tarde!",
            });
            //Imprime no console o erro ocorrido.
            console.error(erro);
        }
    };

    // useEffect para monitorar mudanças nos campos nome, email, senha e novaSenha e habilitar ou desabilitar o botão de atualização.
    useEffect(() => {

        // As mudanças só serão feitas se o usuario existir.
        if (usuario) {
            // Caso o nome ou o email seja diferente dos retornados, e ambos sejam diferentes de vazios ele habilita o botão para fazer a alteração dos botões
            // Caso senha e a nova senha seja diferente de vazio, ele tambem irá habilitar o botão.
            // Caso ele não atenda nenhuma condição, ele desabilita o botão.
            if (((nome != usuario.nome || email != usuario.email) && (nome != "" && email != "")) || (senha != "" && novaSenha != "")) {
                setDesabilitarBtn(false);
            } else {
                setDesabilitarBtn(true);
            }
        }
    }, [nome, email, senha, novaSenha]);

    // useEffect para carregar os personagens da API quando a variável "api" 
    // for alterada ou seja quando o usuario avançar ou voltar uma pagina.
    useEffect(() => {
        carregarPersonagens();
    }, [api]);

    // Carrega as informações do usuario assim que o componente for renderizado.
    useEffect(() => {
        carregarUsuario();
    }, []);

    return (
        // <PaginaCorpo> é o contêiner principal que envolve toda a estrutura da página
        <PaginaCorpo>
            {/* <PaginaTopo> define o cabeçalho da página, com o botão <Voltar> para retornar à página inicial. */}
            <PaginaTopo>
                {/* 
                    <nav>: Barra de navegação contendo a saudação do usuário e o menu de opções.
                    flex: Utiliza o layout flexível para alinhar os itens.
                    justify-between: Distribui os itens igualmente ao longo do espaço disponível.
                    items-center: Centraliza os itens verticalmente.
                    xxs:text-lg: Em telas maiores que 390px, define o tamanho do texto como "lg".
                    xl:text-xl: Em telas maiores que 1536px, define o tamanho do texto como "xl".
                    mx-5: Adiciona margem horizontal de 5.
                    my-3: Adiciona margem vertcal de 3.
                */}
                <nav className="flex justify-between items-center xxs:text-lg xl:text-xl mx-5 my-3">
                    {/* 
                        <div>: Contém a saudação ao usuário.
                        flex: Utiliza o layout flexível para alinhar os itens.
                        justify-center: Centraliza os itens horizontalmente.
                        items-center: Centraliza os itens verticalmente.
                        gap-2: Adiciona um espaçamento de 2 entre os itens.
                    */}
                    <div className="flex justify-center items-center gap-2">
                        {/* 
                            <h1>: Exibe o nome do usuário e um emoji de saudação.
                            font-semibold: Define o peso da fonte como semi-negrito.
                            text-[5vw]: Define o tamanho do texto como 5vw.
                            xs:text-[3.5vw]: Em telas maiores que 450px, ajusta o tamanho do texto para 3.5vw.
                            sm:text-[3vw]: Em telas maiores que 640px, ajusta o tamanho do texto para 3vw.
                            lg:text-[1.6vw]: Em telas maiores que 1024px, ajusta o tamanho do texto para 1.6vw.
                            xl:text-xl: Em telas maiores que 1536px, ajusta o tamanho do texto para "xl".
                            break-all: Garante que palavras longas sejam quebradas em múltiplas linhas.
                        */}
                        <h1 className="font-semibold text-[5vw] xs:text-[3.5vw] sm:text-[3vw] lg:text-[1.6vw] xl:text-xl break-all">
                            Olá, { usuario?.nome.split(' ')[0] }! 👋 
                        </h1>
                    </div>
                    <div>
                        {/*
                            <Sheet>: Componente que exibe uma sidebar.
                            onOpenChange: Callback que reseta os campos de senha, aviso e conteúdo ao fechar o menu.
                        */}
                        <Sheet
                            onOpenChange={(open) => {
                                if (!open) {
                                    setSenha("");
                                    setNovaSenha("");
                                    setAvisoInput("");
                                    setConteudo("Menu");
                                }
                            }}
                        >
                             {/* 
                                <SheetTrigger>: Define o gatilho que abre o menu.
                                ml-20: Adiciona um ml-20, impedindo que caso o nome seja muito grande fique colado ao toggle.
                                asChild: Permite que o primeiro filho dentro dele assuma o comportamento do trigger.
                                <Menu>: Ícone de menu clicável.
                                cursor-pointer: Muda o cursor para indicar que o ícone é clicável.
                            */}
                            <SheetTrigger className="ml-20" asChild>
                                <Menu className="cursor-pointer"/>
                            </SheetTrigger>
                            {/* 
                                <SheetContent>: Contém os elementos dentro do menu lateral.
                            */}
                            <SheetContent>
                                 {/* 
                                    <SheetHeader>: Cabeçalho do menu.
                                    grid: Define o container como um display grid, permitindo organizar os elementos filhos em linhas e colunas.
                                    place-items-center: Centraliza os itens tanto horizontalmente quanto verticalmente dentro da grade.
                                */}
                                <SheetHeader className="grid place-items-center">
                                    {/*
                                        <SheetTitle>: Título do menu que muda conforme a opção selecionada.
                                        text-xl: Define o tamanho do texto como "xl".
                                        ml-3: Adiciona margem esquerda de 3.
                                        mt-3: Adiciona margem superior de 3.
                                    */}
                                    <SheetTitle className="text-xl ml-3 mt-3">
                                        {
                                            conteudo == "Menu" ? "Menu" :
                                            conteudo == "Mudar-Dados" ? "Mudar Informações" :
                                            conteudo == "Mudar-Senha" ? "Mudar Senha" : 
                                            null
                                        }
                                    </SheetTitle>
                                </SheetHeader>  
                                {/* 
                                    <div>: Define o conteúdo do menu.
                                    grid: Define o container como um display grid, permitindo organizar os elementos filhos em linhas e colunas.
                                    gap-2: Define um espaçamento de 2 entre os itens da grade.
                                    mt-3: Adiciona margem superior de 3.
                                */}
                                <div className="grid gap-2 mt-3">
                                    
                                    {
                                        conteudo == "Menu" ?
                                        <>
                                            <div onClick={() => setConteudo("Mudar-Dados")}>
                                                <p className="text-lg hover:-translate-y-1 transition-all">
                                                    Alterar Informações
                                                </p>
                                            </div>
                                            <div onClick={() => setConteudo("Mudar-Senha")}>
                                                <p className="text-lg hover:-translate-y-1 transition-all">
                                                    Alterar Senha
                                                </p>
                                            </div>
                                            <div className="flex gap-1 hover:translate-x-2 transition-all" onClick={handleSair}>
                                                <p className="text-lg">
                                                    <strong>
                                                        Sair
                                                    </strong>
                                                </p>
                                                <MoveRight className="mt-1"/>              
                                            </div>
                                        </> :
                                        conteudo == "Mudar-Senha" ?
                                        <>
                                            <div className="grid items-center gap-1">
                                                <Label htmlFor="senha">
                                                    Senha
                                                </Label>
                                                <InputSenha
                                                    id="senha"
                                                    value={senha}
                                                    onChange={(e) => setSenha(e.target.value)}
                                                    className={avisoInput == "Senha" ? "border-red-500" : ""}
                                                    onClick={() => setAvisoInput("")}
                                                />
                                            </div>
                                            <div className="grid items-center gap-1">
                                                <Label htmlFor="nova-senha">
                                                    Nova Senha
                                                </Label>
                                                <InputSenha
                                                    id="nova-senha"
                                                    value={novaSenha}
                                                    onChange={(e) => setNovaSenha(e.target.value)}
                                                    className={avisoInput == "Nova-Senha" ? "border-red-500" : ""}
                                                    onClick={() => setAvisoInput("")}
                                                />
                                            </div>
                                        </> :
                                        conteudo == "Mudar-Dados" ?
                                        <>
                                            <div>
                                                <Label htmlFor="nome">
                                                    Nome Completo
                                                </Label>
                                                <Input
                                                    id="nome"
                                                    placeholder="Seu nome completo"
                                                    value={nome}
                                                    onChange={(e) => setNome(e.target.value)}
                                                    className={avisoInput == "Nome" ? "border-red-500" : ""}
                                                    onClick={() => setAvisoInput("")}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email">
                                                    Email
                                                </Label>
                                                <Input
                                                    id="email"
                                                    placeholder="nome@exemplo.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className={avisoInput == "Email"  ? "border-red-500" : ""}
                                                    onClick={() => setAvisoInput("")}
                                                />
                                            </div>
                                        </> : null
                                    }
                                    
                                </div>
                                {
                                    conteudo != "Menu" && conteudo != "" ?
                                    <div className="grid gap-2 w-full mt-3">
                                        <Button
                                            className="w-full bg-gradient-to-tr from-[#1a9f9a] to-[#b6c937] text-primary-foreground shadow-lg transition-all duration-300 hover:bg-gradient-to-bl hover:from-[#b6c937] hover:to-[#1a9f9a]"
                                            type="button"
                                            disabled={desabilitarBtn}
                                            onClick={
                                                conteudo == "Mudar-Senha" ? 
                                                handleMudarSenha :
                                                handleMudarDados
                                            }
                                        >
                                            {
                                                carregando ?
                                                <Spinner /> :
                                                "Alterar"
                                            }
                                        </Button>
                                        <Button
                                            variant={"outline"}
                                            className="w-full"
                                            type="button"
                                            onClick={() => setConteudo("Menu")}
                                        >
                                            Voltar
                                        </Button> 
                                    </div> : null
                                }
                                <SheetFooter>
                                <SheetClose asChild>
                                    
                                </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>
            </PaginaTopo>
            <PaginaMeioUmaColuna className="place-items-start px-[13.3vw] xxs:px-[14.8vw] lg:px-[20vw]">
                <div className="w-full">
                    <div className="flex gap-2 pt-[8vw]">
                        <Input
                            placeholder={filtro.por == "Filtro" ? "Selecione uma categoria pro filtro" : `Filtrar personagem`}
                            className="w-full"
                            value={filtro.valor}
                            disabled={filtro.por == "Filtro" ? true : false}
                            onChange={(e) => setFiltro(
                                { ...filtro, valor: e.target.value }
                            )}
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="h-10 ml-auto">
                                    <p>
                                        { itemSelecionado }
                                    </p>
                                    <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuGroup>
                                    {
                                        dadosMenu.map((item: string, index: number) => (
                                            <DropdownMenuItem
                                                key={index}
                                                className="flex justify-end"
                                                onClick={() => {
                                                    if (itemSelecionado == item) {
                                                        setItemSelecionado("Filtro");
                                                        setFiltro(
                                                            { por: "Filtro", valor: "" }
                                                        );
                                                    } else {
                                                        setItemSelecionado(item);
                                                        setFiltro(
                                                            { ...filtro, por: item }
                                                        );
                                                    }

                                                    
                                                }}
                                            >
                                                { 
                                                    itemSelecionado == item ?
                                                    <Check className="mt-0.5" /> : null 
                                                }
                                                { item }
                                            </DropdownMenuItem>
                                        ))
                                    }
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="grid place-items-center items-start xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mt-6">
                    {
                        (() => {
                            const data = personagens.map((personagem: Personagem) => {
                            const key = filtro.por.toLowerCase() as keyof Personagem;

                            return (
                                filtro.por === "Filtro" ||
                                (filtro.por !== "Filtro" &&
                                personagem[key].toLowerCase().includes(filtro.valor.toLowerCase())) ? (
                                    <Card key={personagem.id} className="hover:-mt-3 hover:mb-3 transition-all">
                                        <CardHeader>
                                            <CardTitle>
                                                {personagem.nome}
                                            </CardTitle>
                                            <CardDescription>
                                                <p className="xs:grid text-sm font-medium leading-none">
                                                    Última Localização:
                                                    <span className="ml-1 break-words underline">
                                                        {
                                                            personagem.localizacao !== "Unkown" ? personagem.localizacao : "Desconhecida"
                                                        }
                                                    </span>
                                                </p>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="relative">
                                            <div>
                                                <img className="rounded-lg" src={personagem.imagem} />
                                            </div>
                                            
                                            <div
                                                className={`${
                                                    ["Vivo", "Viva"].includes(personagem.status) ? "bg-green-600" : 
                                                    ["Morto", "Morta"].includes(personagem.status) ? "bg-red-500" : 
                                                    "bg-[#707070]"
                                                } font-semibold px-5 py-0.5 rounded-r-lg absolute top-0 mt-4 text-white`}
                                            >
                                                <p className="text-center">
                                                    { personagem.status }
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ) : null
                            );
                        });

                            const validData = data.filter((item) => item !== null);

                            return validData.length > 0 ? validData : <p className="text-p-responsive text-center absolute  px-[13.3vw] xxs:px-[14.8vw] lg:px-[20vw]">Nenhum personagem foi retornado nessa pagina!</p>;
                        })()
                    }

                    </div>
                </div>
                <Toaster />
            </PaginaMeioUmaColuna>
            <PaginaRodape className="px-[13.3vw] xxs:px-[14.8vw] lg:px-[25.4vw] mt-6">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem 
                            className={navegacao.voltar == null ? "opacity-50" : ""}
                            onClick={() => {
                                if (navegacao.voltar != null) {
                                    setNumeroPagina(numeroPagina - 1);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                } else {
                                    toast({
                                        variant: 'destructive',
                                        title: "Você está na primeira página!",
                                        description: "Não é possível voltar, pois você já está na primeira página.",
                                    });
                                }
                            }}
                        >
                            <PaginationPrevious />
                        </PaginationItem>
                        <PaginationItem className="text-sm font-semibold text-gray-900">
                            Pagina { numeroPagina } 
                        </PaginationItem>
                        <PaginationItem
                            className={navegacao.proximo == null ? "opacity-50" : ""}
                            onClick={() => {
                                if (navegacao.proximo != null) {
                                    setNumeroPagina(numeroPagina + 1);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                } else {
                                    toast({
                                        variant: 'destructive',
                                        title: "Você está na última página!",
                                        description: "Não é possível avançar, pois você já está na última página.",
                                    });
                                }
                            }}
                        >
                            <PaginationNext />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
                <Creditos />
            </PaginaRodape>
        </PaginaCorpo>
    )
}
