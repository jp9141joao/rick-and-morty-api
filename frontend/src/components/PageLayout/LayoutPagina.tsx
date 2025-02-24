// Define a estrutura de layout na pagina como uma <navbar>, conteudo da página e <footer>.
// Esses componentes recebem a propriedade { children }, que permite que outros componentes ou elementos sejam inseridos dentro dele.

import { cn } from '@/lib/utils'; // Importa a função cn, que é utilizada para concatenar, manipular e combinar classes dinamicamente.

// Define o componente { PaginaCorpo }, que representa o { body } da pagina onde todo as outras estruturas irão estar.
export const PaginaCorpo = ({ children }: { children: React.ReactNode }) => {
    return (
        // Usa uma <div> para envolver os outros componentes de layout da página.
        // flex: Organiza os elementos usando flexbox, oque facilita a organização e o alinhamento dos componentes.
        // min-h-screen: Garante que o conteúdo ocupe pelo menos toda a altura da tela, facilitando a implementação da <navbar>e do <footer>.
        // flex-col: Organiza os elementos em uma coluna.
        <div className="flex min-h-screen flex-col">
            {/* Renderiza os elementos filhos passados para o componente */}
            { children }
        </div>
    );
};

// Define o componente <PaginaTopo>, que representa o cabeçalho da página e que deverá ficar sempre no ponto mais alto da página.
export const PaginaTopo = ({ children }: { children: React.ReactNode }) => {
    return (
        // Usa um elemento <header> para estruturar o topo da página, deixando explicito que se trata de um <header>.
        // w-full: faz com que o cabeçalho ocupe toda a largura da tela.
        // font-semibold: Muda a fonte dos componente e dos componentes filhos para uma fonte mais para o lado do negrito.
        // text-gray-900: Define a cor do texto como um tom cinza e numeração define a intensidade da cor.
        <header className="w-full font-semibold text-gray-900">
            {/* Renderiza os elementos filhos dentro do cabeçalho */}
            { children }
        </header>
    );
};

// Define o componente <PaginaMeio>, que representa a seção principal da página com um layout 
// de duas colunas em telas grandes e uma coluna em telas menores que 1024px.
export const PaginaMeio = ({ children }: { children: React.ReactNode }) => {
    return (
        // Cria um container flexível que cresce conforme o conteúdo aumenta, deixando sempre 
        // o <PaginaTopo> no ponto mais alto e <PaginaRodape> no mais baixo.
        <div className="grid flex-grow">
            {/* Define uma classe grid com duas colunas em telas grandes (lg:grid-cols=2) e uma na em páginas pequenas (definido implicitamente devido ao modificador responsivo lg). */}
            {/* place-items-center: Responsavel por centralizar os itens exclusivamente dentro de um componente com a classe grid. */}
            {/* lg:mx-[5.5vw]: Adiciona uma margem lateral para melhor espaçamento em telas grandes. */}
            <div className='grid lg:grid-cols-2 place-items-center lg:mx-[5.5vw]'>
                 {/* Renderiza os elementos filhos dentro da seção */}
                { children }
            </div>
        </div>
    );
};

// Define o componente <PaginaMeioUmaColuna>, mesmas propriedades do componente <PaginaMeio>, 
// porém sempre com uma única coluna independente do tamanho da tela.
export const PaginaMeioUmaColuna = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        // Cria um container flexível que cresce conforme o conteúdo aumenta, deixando sempre 
        // o <PaginaTopo> no ponto mais alto e <PaginaRodape> no mais baixo.
        <div className="grid flex-grow">
            {/* Define uma classe grid com uma coluna na pagina independente do tamanho da tela. */}
            {/* place-items-center: Responsavel por centralizar os itens exclusivamente dentro de um componente com a classe grid. */}
            {/* lg:mx-[5.5vw]: Adiciona uma margem lateral para melhor espaçamento em telas grandes. */}
            { /* cn(): Permite concatenar a classes, permitindo que o usuario adicione classes por meio da propriedade className no qual é opcional adicionar ela. */}
            <div className={cn('grid grid-cols-1 place-items-center lg:mx-[5.5vw]', className)}>
                {/* Renderiza os elementos filhos dentro da seção */}
                { children }
            </div>
        </div>
    );
};

// Define o componente <PaginaRodape>, que representa o rodapé da página.
export const PaginaRodape = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        // Usa a classe grid para centralizar os elementos no rodapé
        // place-items-center: Responsavel por centralizar os itens exclusivamente dentro de um componente com a classe grid.
        <div className={cn("grid place-items-center", className)}>
            { /* cn(): Permite concatenar a classes, permitindo que o usuario adicione classes por meio da propriedade className no qual é opcional adicionar ela. */}
            {/* Renderiza os elementos filhos dentro do rodapé */}
            { children } 
        </div>
    );
};
