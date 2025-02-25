// Importa componentes de layout que definem a estrutura da página.
// <PaginaCorpo>: Define o componente PaginaCorpo, que representa o <body> da pagina onde todo as outras estruturas irão estar.
// <PaginaTopo>: Define o componente que representa o cabeçalho da página e que deverá ficar sempre no ponto mais alto da página.
// <PaginaMeioUmaColuna>: Possui as mesmas propriedades do componente <PaginaMeio>, 
// porém sempre com uma única coluna independente do tamanho da tela.
// <PaginaRodape>: Define o componente que representa o rodapé da página.
import { PaginaCorpo, PaginaRodape, PaginaMeio, PaginaTopo } from "../components/PageLayout/LayoutPagina";
import Image from '../assets/Rick-and-morty-desenho-animado-warner-artpoin9-724x1024.png'; // Importa a imagem que será utilizada na pagina.


import { Button } from "../components/ui/button"; // Importa o componente <Button> que renderiza botões customizados com estilos pré-definidos.
// Importa os componentes relacionados ao diálogo (modal) para construir interfaces interativas.
// Dialog: Componente contêiner que gerencia a exibição do diálogo.
// DialogContent: Define o conteúdo principal que será exibido dentro do diálogo.
// DialogDescription: Fornece uma descrição adicional dentro do diálogo, geralmente usada para instruções ou informações complementares.
// DialogHeader: Estrutura o cabeçalho do diálogo, onde podem ser inseridos título e descrição.
// DialogTitle: Exibe o título do diálogo.
// DialogTrigger: Componente que, ao ser acionado, dispara a abertura do diálogo.
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Creditos } from "@/components/Creditos"; // Importa o componente <Creditos> da criação do projeto.
import { Link } from "react-router-dom"; // Importa o componente <Link>, utilizado para a navegação do usuario sem carregar a pagina inteira.

// Importa o hook useEffect para realizar efeitos colaterais ao montar o componente ou quando determinado valor for alterado.
import { useEffect } from "react";

// Componente funcional que representa a página inicial
export default function Inicio() {

    // useEffect para manipular o token de autenticação ao carregar a página,
    // ou seja, caso o usuario entre na pagina inicio, e existir um token armazenado no localStorage,
    // ele irá realiza o logout do usuario automaticamente.
    useEffect(() => {
        // Obtém o token armazenado no localStorage, se existir.
        const token = localStorage.getItem('authToken');

        // Se houver um token, remove-o para garantir que o usuário não fique mudando de rota sem realizar a autenticação.
        if (token) {
            localStorage.removeItem('authToken');
        }
    }, []); // O array vazio garante que o efeito seja executado somente uma vez, na renderização do componente.

    return (
        // <PaginaCorpo> é o contêiner principal que envolve toda a estrutura da página
        <PaginaCorpo>
            {/* <PaginaTopo> define o cabeçalho da página */}
            <PaginaTopo>
                {/* 
                    Cabeçalho com um elemento <header> que inclui uma <nav> para a navegação 
                    flex: Organiza os elementos usando flexbox, oque facilita a organização e o alinhamento dos componentes.
                    justify-center: Centraliza os itens tanto horizontalmente quanto verticalmente dentro do componente, funcionando exclusivamente no display flex
                    xxs:text-lg: Em telas maiores que 390px, ajusta o tamanho do texto para "lg".
                    xl:text-xl: Em telas maiores que 1536px, ajusta o tamanho do texto para "xl".
                    mx-5: Define a margem horizontal de 5 para cada lado.
                    my-3: Define a margem vertical de 3 para cada lado.
                */}
                <nav className="flex justify-end xxs:text-lg xl:text-xl mx-5 my-3">
                    {/* Link que direciona para a página de login */}
                    <Link to="/entrar">
                        Entrar
                    </Link>
                </nav>
            </PaginaTopo>

            {/* <PaginaMeio> contém o conteúdo principal da página */}
            <PaginaMeio>
                {/*
                    grid: Define o container como um display grid, permitindo organizar os elementos filhos em linhas e colunas.
                    gap-8: Define um espaçamento de 8px entre os itens da grade.
                    sm:gap-14: A partir de telas de 640px, o espaçamento entre os itens aumenta para gap de 14px.
                    mx-[6.8vw]: Define a margem horizontal de 6.8vw para cada lado.
                    xs:mx-[14.2vw]: Em telas maiores de 450px, a margem horizontal aumenta para 14.2vw, garantindo um espaçamento maior.
                    lg:mx-0: Em telas maiores que 1024px, a margem horizontal é removida, fazendo com que o container ocupe toda a largura disponível.
                    lg:mb-[10vw]: Em telas maiores que 1024px adiciona uma margem inferior de 10vw da largura, para criar um espaçamento extra abaixo do container.
                */}
                <div className="grid gap-8 sm:gap-14 mx-[6.8vw] xs:mx-[14.2vw] lg:mx-0 lg:mb-[10vw]">
                    {/*
                        grid: Define o container como um display grid, permitindo organizar os elementos filhos em linhas e colunas.
                        place-items-center: Centraliza os itens tanto horizontalmente quanto verticalmente dentro da grade.
                        items-center: Alinha os itens no centro ao longo do eixo da linha, reforçando a centralização.
                        gap-4: Define um espaçamento de 4 entre os itens da grade.
                        lg:gap-6: Em telas maiores que 1024px, aumenta o espaçamento entre os itens para gap de 6.
                    */}
                    <div className="grid place-items-center items-center gap-4 lg:gap-6">
                        {/*
                            text-center: Centraliza o texto horizontalmente.
                            lg:text-start: Em telas maiores que 1024px, o texto é alinhado à esquerda.
                            text-gray-900: Define a cor do texto com um tom de cinza escuro.
                        */}
                        <div className="text-center lg:text-start text-gray-900">
                            {/*
                                <h1>: Título com tamanho de fonte responsivo e alinhamento ajustado conforme a tela.
                                font-semibold: Muda a fonte do componente para uma fonte mais para o lado do negrito.
                                text-[8.9vw]: Define o tamanho padrão do texto como 8.9vw.
                                xxs:text-[10vw]: Em telas maiores que 390px, ajusta o tamanho do texto para 10vw.
                                xs:text-[7.3vw]: Em telas maiores que 450px, ajusta o tamanho do texto para 7.3vw.
                                lg:text-[4.5vw]: Em telas maiores que 1024px, ajusta o tamanho do texto para 4.5vw.
                                leading-[1.2]: Define a altura da linha como 1.2, garantindo um espaçamento adequado entre as linhas.
                            */}
                            <h1 className="font-semibold text-[8.9vw] xxs:text-[10vw] xs:text-[7.3vw] lg:text-[4.5vw] leading-[1.2]">
                                Explore o universo de Rick and Morty!
                            </h1>
                            {/*
                                <p>: Parágrafo com tamanho de fonte e alinhamento responsivos.
                                xxs:text-lg: Em telas maiores que 390px, define o tamanho do texto como "lg".
                                xs:text-xl: Em telas maiores que 450px, define o tamanho do texto como "xl".
                                sm:text-[2.7vw]: Em telas maiores que 640px, o tamanho do texto é ajustado para 2.7vw.
                                lg:text-xl: Em telas maiores que 1024px, o tamanho do texto volta a ser "xl".
                                xl:text-[1.8vw]: Em telas maiores que 1536px, o tamanho do texto é ajustado para 1.8vw.
                                xl:leading-[1.2]: Em telas maiores que 1536px, define a altura da linha como 1.2, garantindo um espaçamento adequado entre as linhas.
                                mt-2: Adiciona uma margem superior de 2, criando um pequeno espaçamento acima do parágrafo.
                            */}
                            <p className="xxs:text-lg xs:text-xl sm:text-[2.7vw] lg:text-xl xl:text-[1.8vw] xl:leading-[1.2] mt-2">
                                Uma experiência interativa para explorar personagens através de uma API.
                            </p>
                        </div>

                        {/* 
                            Botão que aciona um diálogo para exibir informações sobre a animação 
                            lg:w-full: Em telas maiores que 1024px a width ira preencher todo componente
                        */}
                        <div className="lg:w-full">
                            <Dialog>
                                {/* 
                                    DialogTrigger envolve o botão e define a interação para abrir o diálogo 
                                    hover:-mt-1: Quando o usuário passa o mouse sobre o elemento, ele se move 1 para cima.
                                    hover:mb-1: Quando o usuário passa o mouse sobre o elemento, ele adiciona uma margem inferior de 1, para compensar o movimento do -mt-1.
                                    transition-all: Aplica uma transição suave para todas as propriedades animáveis, garantindo que os efeitos de hover aconteçam de forma fluida.
                                    asChild: Faz com que o DialogTrigger repasse suas propriedades ao primeiro filho direto, permitindo que qualquer elemento seja usado como gatilho do diálogo. 
                                */}
                                <DialogTrigger className="hover:-mt-1 hover:mb-1 transition-all" asChild>
                                    <div>
                                        {/*
                                            size={"xl"}: Define o tamanho do botão como extra grande.
                                            xxs:text-lg: Em telas maiores que 390px, define o tamanho do texto como "lg".
                                            text-lg: Define o tamanho padrão do texto como "lg".
                                            sm:text-xl: Em telas pequenas maiores que 640px, aumenta o tamanho do texto para "xl".
                                            xl:text-xl: Em telas maiores que 1536px, mantém o tamanho do texto como "xl".
                                            sm:h-12: Em telas em telas maiores que 640px, define a altura do botão como 12.
                                            lg:h-10: Em telas maiores que 1024px, ajusta a altura do botão para 10.
                                            sm:px-16: Em telas em telas maiores que 640px, define um padding horizontal de 16.
                                            xl:h-12: Em telas maiores que 1536px, define a altura do botão como 12.
                                            xl:px-18: Em telas maiores que 1536px, define um padding horizontal de 18.
                                            shadow-xl: Adiciona uma sombra grande ao botão, dando um efeito de profundidade.
                                        */}
                                        <Button 
                                            size={"xl"} 
                                            className="xxs:text-lg text-lg sm:text-xl xl:text-xl sm:h-12 lg:h-10 sm:px-16 xl:h-12 xl:px-18 shadow-xl "
                                        >
                                            Sobre a animação
                                        </Button>
                                    </div>
                                </DialogTrigger>
                                {/* DialogContent contém o conteúdo que será exibido ao acionar o diálogo */}
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Sobre Rick and Morty
                                        </DialogTitle>
                                        {/* 
                                            DialogDescription com um grid que organiza os parágrafos explicativos 
                                            asChild: Faz com que o DialogTrigger repasse suas propriedades ao primeiro filho direto, permitindo que qualquer elemento seja usado como gatilho do diálogo. 

                                        */}
                                        <DialogDescription asChild>
                                            {/*
                                                grid: Define o container como um display grid, permitindo organizar os elementos filhos em linhas e colunas.
                                                gap-3: Define um espaçamento de 3 entre os itens da grade.
                                            */}
                                            <div className="grid gap-3">
                                                <p>
                                                    É uma das séries animadas mais populares do momento. Ela junta ficção científica, humor ácido e críticas socias. Esta obra foi feita por Justin Roiland e Dan Harmon e a animação foi lançada em 2013 no Adult Swim e sem muita demora conquistou fãs ao redor do mundo todo.
                                                </p>
                                                <p>
                                                    A trama acompanha as aventuras de Rick Sanchez, um cientista genial, excêntrico e muito... muito mesmo irresponsável, que arrasta seu neto Morty Smith em viagens interdimensionais caóticas. Juntos, eles exploram realidades paralelas, planetas alienígenas e enfrentam ameaças bizarras, todas essas coisas enquanto tentam lidar com os problemas do dia a dia da família Smith.
                                                </p>
                                                <p>
                                                    O que torna Rick and Morty tão especial e amado é seu equilíbrio entre comédia absurda e questionamentos filosóficos profundos. A série brinca com diversos conceitos diferentes, tornando cada episódio uma experiência imprevisível e muitas vezes reflexiva, fazendo prender a atenção do telespectador.
                                                </p>
                                                <p>
                                                    A série possui 7 temporadas até o momento, demonstrando seu grande sucesso com os expectadores, provando que seu estilo de gênero atrai muito público.
                                                </p>
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    {/* 
                        Exibição da imagem de forma responsiva
                        lg:hidden: Em telas maiores que 1536px o componente ira ficar com display none 
                    */}
                    <div className="lg:hidden">
                        {/* 
                            Imagem exibida em dispositivos menores 
                            px-[4vw]: Define um padding horizontal de 4vw.
                            xxs:px-0: Em telas maiores que 390px, remove completamente o padding horizontal.
                            xs:px-[6vw]: Em telas maiores que 450px, aumenta o padding horizontal para 6vw.
                            sm:px-[4vw]: Em telas maiores que 640px, redefine o padding horizontal para 4vw.
                        */}
                        <img 
                            src={Image}
                            className="px-[4vw] xxs:px-0 xs:px-[6vw] sm:px-[4vw]"
                        />
                    </div>
                </div>
                {/* 
                    Exibição da imagem de forma responsiva
                    hidden: O componente fica com display none por padrao.
                    lg:block: Em telas maiores que 1024px o componente fica visivel, 
                    isso e necessario pois em telas maiores que 1024px a tela tera duas colunas.
                */}
                <div className="hidden lg:block">
                    {/* 
                        Imagem exibida somente em telas grandes
                        px-[5.5vw]: Define um padding horizontal de 5.5vw.
                    */}
                    <img 
                        src={Image}
                        className="px-[5.5vw]"
                    />
                </div>
            </PaginaMeio>

            {/* PaginaRodape contém o rodapé da página, onde os créditos são exibidos */}
            <PaginaRodape>
                <Creditos />
            </PaginaRodape>
        </PaginaCorpo>
    )
}
