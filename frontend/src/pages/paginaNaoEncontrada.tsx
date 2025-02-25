// Importa o componente <Creditos> da criação do projeto.
import { Creditos } from "@/components/Creditos"; 

// Importa componentes de layout que definem a estrutura da página.
// <PaginaCorpo>: Define o componente PaginaCorpo, que representa o <body> da pagina onde todo as outras estruturas irão estar.
// <PaginaTopo>: Define o componente que representa o cabeçalho da página e que deverá ficar sempre no ponto mais alto da página.
// <PaginaMeioUmaColuna>: Possui as mesmas propriedades do componente <PaginaMeio>, 
// porém sempre com uma única coluna independente do tamanho da tela.
// <PaginaRodape>: Define o componente que representa o rodapé da página.
import { PaginaCorpo, PaginaMeioUmaColuna, PaginaRodape, PaginaTopo } from "@/components/PageLayout/LayoutPagina";

// Importa o componente <Voltar>, que fornece um paragrafo com um link para retornar a uma página especificada
import { Voltar } from "@/components/Voltar"; 

// Componente funcional que representa a página de "Página Não Encontrada"
export default function PaginaNaoEncontrada() {

    return (
        // Define a estrutura principal da página usando o componente PaginaCorpo
        <PaginaCorpo>
            {/* Cabeçalho da página */}
            <PaginaTopo>
                {/* Botão/link para voltar, direcionando para a rota "/inicio" */}
                <Voltar para="inicio"/>
            </PaginaTopo>

            {/* Área central da página com layout de coluna única */}
            <PaginaMeioUmaColuna>
                {/* 
                    Div que centraliza o conteúdo, textos e aplica margens horizontais.
                    grid: Define o container como um display grid, permitindo organizar os elementos filhos em linhas e colunas.
                    place-items-center: Centraliza os itens tanto horizontalmente quanto verticalmente dentro da grade.
                    text-center: Centraliza o texto horizontalmente.
                    mx-[13vw]: Define a margem horizontal de 13vw para cada lado.
                */}
                <div className="grid place-items-center text-center mx-[13vw]">
                    <div>
                        {/* Título principal informando que a página não foi encontrada */}
                        <h1 className="text-xl font-semibold">
                            Página Não Encontrada!
                        </h1>
                    </div>
                    <div>
                        {/* Mensagem explicativa para o usuário  */}
                        {/* text-p-responsive: classe criada no arquivo tailwind.config.js para facilitar a responsividade da tag <p>. */}
                        <p className="text-p-responsive">
                            A página que você está procurando não existe. Ela pode ter sido movida ou excluída.
                        </p>
                    </div>
                </div>
            </PaginaMeioUmaColuna>

            {/* Rodapé da página */}
            <PaginaRodape>
                {/* Exibe os créditos ao criador do protejo */}
                <Creditos />
            </PaginaRodape>
        </PaginaCorpo>
    )
}
