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
            // Chama a função getUsuario que retorna as informações do usuario por meio do token JWT.
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
                        especie: personagem.species == "Unknown" ? "Desconhecido" : personagem.species,
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
                                    mt-3: Adiciona uma margem superior de 3.
                                */}
                                <div className="grid gap-2 mt-3">
                                    
                                    {
                                        // Renderiza o Menu 
                                        conteudo == "Menu" ?
                                        <>
                                            {/*
                                                Ao clicar no em um dos item na sidebar, onClick sera ativado e ira renderizar
                                                o conteudo corresponte ao item.
                                                text-lg: Define o tamanho do texto como "lg".
                                                hover:-translate-y-1: Quando o usuário passa o mouse sobre o elemento, ele move o valor de 1 para cima.
                                                transition-all: Aplica uma transição suave para todas as propriedades animáveis, garantindo que os efeitos de hover aconteçam de forma fluida.
                                            */}
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
                                            {/*
                                                flex: Utiliza o layout flexível para alinhar os itens.     
                                                gap-1: Define um espaçamento de 1 entre os itens da grade.
                                                hover:translate-x-2: Quando o usuário passa o mouse sobre o elemento, ele move o valor de 2 para a direita.
                                                transition-all: Aplica uma transição suave para todas as propriedades animáveis, garantindo que os efeitos de hover aconteçam de forma fluida.
                                                onClick: Ao clicar no elemento ele chama a funcao handleSair e realiza o logout do usuario.
                                            */}
                                            <div className="flex gap-1 hover:translate-x-2 transition-all" onClick={handleSair}>
                                                {/* text-lg: Define o tamanho do texto como "lg". */}
                                                <p className="text-lg">
                                                    <strong>
                                                        Sair
                                                    </strong>
                                                </p>
                                                {/* mt-1: Adiciona uma margem superior de 1 para alinhar com o texto. */}
                                                <MoveRight className="mt-1"/>              
                                            </div>
                                        </> :
                                        //Opção para renderizar a sessao de alterar senha.
                                        conteudo == "Mudar-Senha" ?
                                        <>
                                            {/*
                                                grid: Define o container como um display grid, permitindo organizar os elementos filhos em linhas e colunas. 
                                                items-center: Alinha os itens no centro ao longo do eixo da linha, reforçando a centralização.  
                                                gap-1: Define um espaçamento de 1 entre os itens da grade.
                                            */}
                                            <div className="grid items-center gap-1">
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
                                                    // Se avisoInput indicar erro em "Senha", adiciona borda vermelha.
                                                    className={avisoInput == "Senha" ? "border-red-500" : ""}
                                                    // Ao clickar no input caso ele tenha a bordar vermelha ira resertar para a borda padrão.
                                                    onClick={() => setAvisoInput("")}
                                                />
                                            </div>
                                            {/*
                                                grid: Define o container como um display grid, permitindo organizar os elementos filhos em linhas e colunas. 
                                                items-center: Alinha os itens no centro ao longo do eixo da linha, reforçando a centralização.  
                                                gap-1: Define um espaçamento de 1 entre os itens da grade.
                                            */}
                                            <div className="grid items-center gap-1">
                                                {/* htmlFor: Referencia o elemento que tenha o mesmo id que na propriedade. */}
                                                <Label htmlFor="nova-senha">
                                                    Nova Senha
                                                </Label>
                                                <InputSenha
                                                    // Adiciona um ID para o elemente como referencia para o Label.
                                                    id="nova-senha"
                                                    // Define que o input terá o mesmo valor da constante novaSenha.
                                                    value={novaSenha}
                                                    // Ao escrever no input ele atualiza o valor da constante novaSenha.
                                                    onChange={(e) => setNovaSenha(e.target.value)}
                                                    // Se avisoInput indicar erro em "Nova-Senha", adiciona borda vermelha.
                                                    className={avisoInput == "Nova-Senha" ? "border-red-500" : ""}
                                                    // Ao clickar no input caso ele tenha a bordar vermelha ira resertar para a borda padrão.
                                                    onClick={() => setAvisoInput("")}
                                                />
                                            </div>
                                        </> :
                                        //Opção para renderizar a sessao de alterar os dados (info).
                                        conteudo == "Mudar-Dados" ?
                                        <>
                                            <div>
                                                {/* htmlFor: Referencia o elemento que tenha o mesmo id que na propriedade. */}
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
                                                    // Se avisoInput indicar erro em "Email", adiciona borda vermelha.
                                                    className={avisoInput == "Email"  ? "border-red-500" : ""}
                                                    // Ao clickar no input caso ele tenha a bordar vermelha ira resertar para a borda padrão.
                                                    onClick={() => setAvisoInput("")}
                                                />
                                            </div>
                                        </> : null // Retorna null se conteudo nao corresponder a nenhum valor, nao renderizando nada.
                                    }
                                    
                                </div>
                                {
                                    // Caso a constante conteudo seja diferente de menu e 
                                    // conteudo seja diferente de vazios ele renderiza os botoes para a requisicao e de voltar pagina. 
                                    conteudo != "Menu" && conteudo != "" ?
                                    /*
                                        grid: Define o container como um display grid, permitindo organizar os elementos filhos em linhas e colunas. 
                                        gap-2: Define um espaçamento de 2 entre os itens da grade.   
                                        w-full: O componente vai preencher 100% da largura do componente pai.
                                        mt-3: Adiciona uma margem superior de 3.
                                    */
                                    <div className="grid gap-2 w-full mt-3">
                                        {/*
                                            w-full: O componente vai preencher 100% da largura do componente pai.
                                            type="button": O tipo do botao devera ser button pois caso seja submit, 
                                            alem de atualizar a pagina nao funcionaria pois todos os botoes iriam chamar o mesmo
                                            handleSubmit, por isso e necessario a implementacao do onClick.
                                            onClick: Caso conteudo seja "Mudar-senha" chamara a funcao handleMudarSenha caso contrario
                                            chama a funcao handleMudarDados.
                                        */}
                                        <Button
                                            className="w-full"
                                            type="button"
                                            disabled={desabilitarBtn}
                                            onClick={
                                                conteudo == "Mudar-Senha" ? 
                                                handleMudarSenha :
                                                handleMudarDados
                                            }
                                        >
                                            {
                                                // Caso a constante carregando for true ele renderiza  o componente <Spinner> 
                                                // caso contrario adiciona o valor "Alterar".
                                                carregando ?
                                                <Spinner /> :
                                                "Alterar"
                                            }
                                        </Button>
                                        <Button
                                            // Adiciona o estilo de outline ao botao, devez o default.
                                            variant={"outline"}
                                            // w-full: O componente vai preencher 100% da largura do componente pai.
                                            className="w-full"
                                            // type:button: pois o componente nao ira fazer nenhuma requisicao nesse parte.
                                            type="button"
                                            // Ao clicar no componente ele ira voltar o conteudo da sidebar, atribuindo a variavel como "Menu".
                                            onClick={() => setConteudo("Menu")}
                                        >
                                            Voltar
                                        </Button>
                                    </div> : null // Caso contrario, nao renderiza nada.
                                }
                                <SheetFooter>
                                    {/* asChild: Permite que o primeiro filho dentro dele assuma o comportamento do trigger. */}
                                    <SheetClose asChild>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>
            </PaginaTopo>
            {/*
                place-items-center: Responsavel por posicionar os itens no topo da pagina exclusivamente dentro de um componente com a classe grid.
                px-[13.3vw]: Define um padding horizontal de 13.3vw.
                xxs:px-[14.8vw]: Em telas maiores de 390px, define  um padding horizontal de 14.8vw.
                lg:px-[20vw]: Em telas maiores de 1024px, define  um padding horizontal de 20vw.
            */}
            <PaginaMeioUmaColuna className="place-items-start px-[13.3vw] xxs:px-[14.8vw] lg:px-[20vw]">
                {/* w-full: O componente vai preencher 100% da largura do componente pai. */}
                <div className="w-full">
                    {/*
                        flex: Organiza os elementos usando flexbox, oque facilita a organização e o alinhamento dos componentes.
                        gap-2: Adiciona um espaçamento de 2 entre os itens.
                        pt-[8vw]: Define um padding superior de 8vw.
                    */}
                    <div className="flex gap-2 pt-[8vw]">
                        <Input
                            // Caso o filtro nao for selecionado ele define o placeholder para que o usuario saiba que deve
                            // selecionar no dropdown algum filtro caso deseja filtrar, caso o filtro esteja selecionado ele mudar
                            // o placeholder indicando que pode filtrar no input
                            placeholder={filtro.por == "Filtro" ? "Selecione uma categoria pro filtro" : `Filtrar personagem`}
                            // w-full: O componente vai preencher 100% da largura do componente pai.
                            className="w-full"
                            // Atribui o valor da propriedade por do objeto filtro no input mostrando o valor escrito pelo usuario.
                            value={filtro.valor}
                            // Caso o usuario nao tenha selecionado nenhum filtro, ele desabilita o input para nao ocorrer erros.
                            disabled={filtro.por == "Filtro" ? true : false}
                            // Caso o usuario escreva no input ele ira atribuir o valor escrito para a propriedade por do objeto filtro.
                            onChange={(e) => setFiltro(
                                { ...filtro, valor: e.target.value }
                            )}
                        />
                        <DropdownMenu>
                            { /* asChild: Permite que o primeiro filho dentro dele assuma o comportamento do trigger. */}
                            <DropdownMenuTrigger asChild>
                                {/*
                                    h-10: Define que a altura do botao tera o valor de 10.
                                    ml-auto: Define que a margem esquerda do componente vai ser definida automaticamente.
                                */}
                                <Button className="h-10 ml-auto">
                                    <p>
                                        { itemSelecionado }
                                    </p>
                                    <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            {/* align:"end": Alinha o <DropdownMenuContent> para o final do componente */}
                            <DropdownMenuContent align="end">
                                <DropdownMenuGroup>
                                    {
                                        // Imprime o valores dos possiveis filtros como opcoes a ser
                                        // escolhidas dentro do dropdown
                                        dadosMenu.map((item: string, index: number) => (
                                            <DropdownMenuItem
                                                // Define uma key como o indice
                                                key={index}
                                                // flex: Organiza os elementos usando flexbox, oque facilita a organização e o alinhamento dos componentes.                                                
                                                className="flex justify-end"
                                                // Ao clicar no item se o item ja estiver selecionado, ele desmarca o item,
                                                // E atribui o valor de filtro para vazio.
                                                // Se ele nao estiver selecioado muda o filtro para a opcao correspondente,
                                                // E atribui o filtro para este valor.
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
                                                    // Caso o filtro selecionado seja igual a item isso significa ele que esta
                                                    // selecionado sendo assim ele renderiza o icone de check caso contrario nao
                                                    // renderiza nada.
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
                    {/*
                        grid: Define o container como um display grid, permitindo organizar os elementos filhos em linhas e colunas.
                        place-items-center: Centraliza os itens tanto horizontalmente quanto verticalmente dentro da grade.
                        items-start: Alinha os itens no início do eixo transversal do contêiner.
                        xs:grid-cols-2: Em telas maiores que 450px, o componente seja dividido em 2 colunas.
                        lg:grid-cols-3: Em telas maiores que 1024px, o componente seja dividido em 3 colunas.
                        lg:grid-cols-4: Em telas maiores que 1536px, o componente seja dividido em 4 colunas.
                        gap-6: Adiciona um espaçamento de 6 entre os itens.
                        lg:gap-8: Em telas maiores que 1024px, adiciona um espaçamento de 6 entre os itens.
                        mt-6: Define que a margem superior ao componente de 6.
                    */}
                    <div className="grid place-items-center items-start xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mt-6">
                    {
                        (() => {
                            // Mapeia cada personagem do array personagens para gerar um card deles ou retornar null, de acordo com o filtro aplicado.
                            const data = personagens.map((personagem: Personagem) => {
                              // Converte o valor do filtro para minúsculas para comparar com as propriedades do personagem.
                              // O casting garante que a chave corresponde a uma propriedade válida de Personagem.
                                const key = filtro.por.toLowerCase() as keyof Personagem;
                          
                                return (
                                    // Verifica se não há filtro ativo ou se o personagem atende ao filtro.
                                    filtro.por === "Filtro" ||
                                    (filtro.por !== "Filtro" &&
                                    // Converte o valor da propriedade do personagem e o valor do filtro para minúsculas e verifica se o primeiro inclui o segundo.
                                    personagem[key].toLowerCase().includes(filtro.valor.toLowerCase())
                                    ) ? (
                                    /* 
                                        Se a condição for verdadeira, renderiza um Card com os dados do personagem.
                                        key: Define uma key para cada personagem que sera igual ao id deles.
                                        hover:-mt-3: Quando o usuário passa o mouse sobre o elemento, ele se move 3 para cima.
                                        hover:mb-3: Quando o usuário passa o mouse sobre o elemento, ele adiciona uma margem inferior de 3, para compensar o movimento do -mt-3.
                                        transition-all: Aplica uma transição suave para todas as propriedades animáveis, garantindo que os efeitos de hover aconteçam de forma fluida.
                                    */
                                    <Card key={personagem.id} className="hover:-mt-3 hover:mb-3 transition-all">
                                        <CardHeader>
                                            <CardTitle>
                                                {personagem.nome}
                                            </CardTitle>
                                            <CardDescription>
                                                {/*
                                                    xs:grid: Em telas maiores de 450px o display do componente sera grid.
                                                    text-sm: Define o tamanho padrão do texto como "sm".
                                                    font-medium: Define o tipo da fonte utilizada no componente.
                                                    leading-noe: Diminui o espacamento entre as linhas do texto.
                                                */}
                                                <p className="xs:grid text-sm font-medium leading-none">
                                                    Última Localização:
                                                    {/* 
                                                        ml-1: Define que a margem esquerda do componente vai ser de 1. 
                                                        break-words: Adiciona a propriedade de quebra de linhas das palabras quando
                                                        o tamanho delas superar a do componente.
                                                        underline: Adiciona um underline ao texto.                                                  
                                                    */}
                                                    <span className="ml-1 break-words underline">
                                                        {
                                                            // Se a localização do personagem não for "Unkown", exibe-a; caso contrário, mostra "Desconhecida"
                                                            personagem.localizacao !== "Unkown" ? personagem.localizacao : "Desconhecida"
                                                        }
                                                    </span>
                                                </p>
                                            </CardDescription>
                                        </CardHeader>
                                        {/*
                                            relative: Define a posição do container como relativa, possibilitando o posicionamento
                                            absoluto de elementos internos em relação a este.
                                            bg-gradient-to-tr: Aplica um fundo com gradiente que vai da parte inferior esquerda até
                                            a parte superior direita.
                                            from-[#1a9f9a]: Especifica a cor inicial do gradiente, um tom de verde.
                                            to-[#b6c937]: Especifica a cor final do gradiente, um tom de amarelo-esverdeado.
                                            rounded-lg: Adiciona bordas arredondadas grandes ao container.
                                        */}
                                        <CardContent className="relative bg-gradient-to-tr from-[#1a9f9a] to-[#b6c937] rounded-lg">
                                        <div>
                                            {/* 
                                                Exibe a imagem do personagem
                                                rounded-lg: Adiciona bordas arredondadas grandes ao container. 
                                            */}
                                            <img 
                                                className="rounded-lg" 
                                                src={personagem.imagem} 
                                            />
                                        </div>
                                        {/*
                                            rounded-lg: Adiciona bordas arredondadas grandes ao container.
                                            text-center: Centraliza o texto horizontalmente.
                                        */}
                                        <div className="rounded-lg text-center">
                                            {/*
                                                text-xl: Define o tamanho do texto como "xl".
                                                lg:text-lg: Em telas maiores que 1024px, define o tamanho do texto como "lg".
                                                text-white" Define a cor do texto com branco.
                                                font-semibold: Muda a fonte dos componente para uma fonte mais para o lado do negrito.
                                                lg:my-1: Em telas maiores que 1024px, adiciona uma margem vertical de 1 para 
                                                compensar a reducao de espaco de linhas do leaading-[1.1].
                                                leading-[1.1]: Reduz o espaco entre as linhas do texto.
                                            */}
                                            <p className="text-xl lg:text-lg text-white font-semibold lg:my-1 lg:leading-[1.1]">
                                                { personagem.especie } {/* Exibe a espécie do personagem */}
                                            </p>
                                        </div>
                                        <div
                                            /*
                                                Caso o status do personagem seja "Vivo" ou "Viva", define o background do componente como um verde,
                                                Caso seja "Morto" ou "Morta", define o background como um vermelho,
                                                Caso contrario ou seja desconhecido, define o background como um cinza.
                                                font-semibold: Muda a fonte dos componente para uma fonte mais para o lado do negrito.
                                                px-5: Adiciona um padding na direita e esquerda de tamanho 5.
                                                py-0.5: Adiciona um padding na vertical 0.5.
                                                rounded-b-lg: Adiciona bordas arredondadas grandes ao canto inferior do container.
                                                absolute: Posiciona o elemento de forma absoluta em relação ao seu contêiner pai.
                                                top-0: Posiciona o elemento com 0 de distância do topo do contêiner, ou seja, encostado na borda superior.
                                                mt-4: Adiciona uma margem superior de tamanho 4 ao componente.
                                                text-white: Define a cor do texto como branca.
                                            */    
                                            className={`${
                                                ["Vivo", "Viva"].includes(personagem.status) ? "bg-green-600" : 
                                                ["Morto", "Morta"].includes(personagem.status) ? "bg-red-500" : 
                                                "bg-[#707070]"
                                            } font-semibold px-5 py-0.5 rounded-r-lg absolute top-0 mt-4 text-white`}
                                        >
                                            {/* text-center: Centraliza o texto horizontalmente. */}
                                            <p className="text-center">
                                                { personagem.status } 
                                            </p>
                                        </div>
                                        </CardContent>
                                    </Card>
                                    ) : null // Se o personagem não atender ao filtro, retorna null.
                                );
                            });
                          
                            // Filtra os personagens nulos.
                            const validData = data.filter((item) => item !== null);
                          
                            // Retorna os Cards se houver algum personagem válido, caso contrário, exibe uma mensagem informando que nenhum personagem foi encontrado
                            return validData.length > 0 ? validData : (
                                /*
                                    text-p-responsive: classe criada no arquivo tailwind.config.js para facilitar a responsividade da tag <p>.
                                    text-center: Centraliza o texto horizontalmente.
                                    absolute: Posiciona o elemento de forma absoluta em relação ao seu contêiner pai.
                                    px-[13.3vw]: Adiciona um padding na direita e esquerda de tamanho 13.3vw.
                                    xxs:px-[14.8vw]: Em telas maiores de 450px, adiciona um padding na direita e esquerda de tamanho 14.8vw.
                                    lg:px-[14.8vw]: Em telas maiores de 1024px, adiciona um padding na direita e esquerda de tamanho 20vw.
                                */
                                <p className="text-p-responsive text-center absolute px-[13.3vw] xxs:px-[14.8vw] lg:px-[20vw]">
                                    Nenhum personagem foi retornado nessa pagina!
                                </p>
                            );
                          })()                          
                    }

                    </div>
                </div>
                <Toaster />
            </PaginaMeioUmaColuna>
            {/*
                <PaginaRodape>: Define o rodapé da página.
                px-[13.3vw]: Adiciona padding horizontal de 13.3% da largura da viewport.
                xxs:px-[14.8vw]: Em telas maiores que 390px, ajusta o padding horizontal para 14.8vw.
                lg:px-[25.4vw]: Em telas maiores que 1024px, ajusta o padding horizontal para 25.4vw.
                mt-6: Adiciona margem superior de 6.
            */}
            <PaginaRodape className="px-[13.3vw] xxs:px-[14.8vw] lg:px-[25.4vw] mt-6">
                {/* <Pagination>: Componente de paginação que agrupa os itens de navegação entre páginas. */}
                <Pagination>
                    {/* <PaginationContent>: Container que engloba os itens individuais de paginação. */}
                    <PaginationContent>
                        {/*
                            <PaginationItem>: Representa um item de paginação.
                            A classe "opacity-50" é aplicada se não houver página anterior, indicando que o botão está desativado.
                            onClick: Se houver página anterior, decrementa o número da página e rola a tela para o topo de forma suave; caso contrário, 
                            exibe informa pelo toast que o usuário está na primeira página.
                        */}
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
                            {/* <PaginationPrevious>: Ícone ou componente que representa a ação de ir para a página anterior. */}
                            <PaginationPrevious />
                        </PaginationItem>
                        {/*
                            <PaginationItem>: Exibe o número da página atual.
                            text-sm: Define o tamanho padrão do texto como "sm".
                            font-semibold: Muda a fonte dos componente para uma fonte mais para o lado do negrito.
                            text-gray-900: Muda a cor do texto para um cinza escuro.
                        */}
                        <PaginationItem className="text-sm font-semibold text-gray-900">
                            Pagina { numeroPagina } 
                        </PaginationItem>
                        {/*
                            <PaginationItem>: Representa o item de paginação para avançar para a próxima página.
                            A classe "opacity-50" é aplicada se não houver página seguinte, indicando que o botão está desativado.
                            onClick: Se houver próxima página, incrementa o número da página e rola a tela para o topo de forma suave; 
                            caso contrário, exibe informa no toast que o usuário está na última página.
                        */}
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
                            {/* <PaginationNext>: Ícone ou componente que representa a ação de avançar para a próxima página. */}
                            <PaginationNext />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
                {/* <Creditos>: Componente que exibe os créditos do projeto. */}
                <Creditos />
            </PaginaRodape>
        </PaginaCorpo>
    )
}
