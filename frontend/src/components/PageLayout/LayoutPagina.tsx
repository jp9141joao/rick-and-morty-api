// Define a estrutura de layout na pagina como NAVBAR, conteudo da página e FOOTER.
// Esses componentes recebem a propriedade CHILDREN, que permite que outros componentes ou elementos sejam inseridos dentro dele.

// Define o componente PaginaCorpo, que representa o BODY da pagina onde todo as outras estruturas irão estar.
export const PaginaCorpo = ({ children }: { children: React.ReactNode }) => {
    return (
        // Usa uma <div> para envolver os outros componentes de layout da página.
        // FLEX: Organiza os elementos usando flexbox (facilitando a organização e o alinhamento dos componentes).
        // MIN-H-SCREEN: Garante que o conteúdo ocupe pelo menos toda a altura da tela, facilitando a implementação da NAVBAR e do FOOTER.
        // FLEX-COL: Organiza os elementos em uma coluna.
        <div className="flex min-h-screen flex-col">
            { children } {/* Renderiza os elementos filhos passados para o componente */}
        </div>
    );
};

// Define o componente PaginaTopo, que representa o cabeçalho da página e que deverá ficar sempre no ponto mais alto da página.
export const PaginaTopo = ({ children }: { children: React.ReactNode }) => {
    return (
        // Usa um elemento <header> para estruturar semanticamente o topo da página.
        // W-FULL: faz com que o cabeçalho ocupe toda a largura da tela.
        // FONT-SEMIBOLD: Muda a fonte dos componente e dos componentes filhos para uma fonte mais para o lado do negrito.
        // TEXT-GRAY-900: Define a cor do texto como um tom cinza e numeração define a intensidade da cor.
        <header className="w-full font-semibold text-gray-900">
            { children } {/* Renderiza os elementos filhos dentro do cabeçalho */}
        </header>
    );
};

// Define o componente PaginaMeio, que representa a seção principal da página com um layout 
// de duas colunas em telas grandes e uma coluna em telas menores que 1024px.
export const PaginaMeio = ({ children }: { children: React.ReactNode }) => {
    return (
        // Cria um container flexível que cresce conforme o conteúdo aumenta, deixando sempre 
        // o PaginaTopo no ponto mais alto e PaginaRodape no mais baixo.
        <div className="grid flex-grow">
            {/* Define um GRID com duas colunas em telas grandes (LG:GRID-COLS-2) e uma na em páginas pequenas (definido implicitamente devido ao modificador responsivo LG). */}
            {/* PLACE-ITEMS-CENTER: Responsavel por centralizar os itens exclusivamente dentro de um componente GRID. */}
            {/* LG:MX-[5.5VW]: Adiciona uma margem lateral para melhor espaçamento em telas grandes. */}
            <div className='grid lg:grid-cols-2 place-items-center lg:mx-[5.5vw]'>
                { children } {/* Renderiza os elementos filhos dentro da seção */}
            </div>
        </div>
    );
};

// Define o componente PaginaMeioUmaColuna, mesmas propriedades do componente PaginaMeio, 
// porém sempre com uma única coluna devez duas em telas com mais de 1024px.
export const PaginaMeioUmaColuna = ({ children }: { children: React.ReactNode }) => {
    return (
        // Cria um container flexível que cresce conforme o conteúdo aumenta, deixando sempre 
        // o PaginaTopo no ponto mais alto e PaginaRodape no mais baixo.
        <div className="grid flex-grow">
            {/* Define um GRID com uma coluna na pagina independente do tamanho da tela. */}
            {/* PLACE-ITEMS-CENTER: Responsavel por centralizar os itens exclusivamente dentro de um componente GRID. */}
            {/* LG:MX-[5.5VW]: Adiciona uma margem lateral para melhor espaçamento em telas grandes. */}
            <div className='grid grid-cols-1 place-items-center lg:mx-[5.5vw]'>
                { children } {/* Renderiza os elementos filhos dentro da seção */}
            </div>
        </div>
    );
};

// Define o componente PaginaRodape, que representa o rodapé da página.
export const PaginaRodape = ({ children }: { children: React.ReactNode }) => {
    return (
        // Usa um GRID para centralizar os elementos no rodapé
        //PLACE-ITEMS-CENTER: Responsavel por centralizar os itens exclusivamente dentro de um componente GRID.
        <div className="grid place-items-center">
            { children } {/* Renderiza os elementos filhos dentro do rodapé */}
        </div>
    );
};
