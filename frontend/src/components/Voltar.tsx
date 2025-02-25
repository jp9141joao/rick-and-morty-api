import { Link } from "react-router-dom"; // Importa o componente <Link>, utilizado para a navegação do usuario sem carregar a pagina inteira.

// Define o componente <Voltar> utilizado para voltar para uma rota, ele possui a propriedade "para" do tipo string
// que é utilizada para configurar para onde a pagina irá redirecionar o usuario.
export function Voltar({ para }: { para: string }) {
    
    return (
        // O componente <nav> é usado para envolver links de navegação.
        // flex: Organiza os elementos usando flexbox, oque facilita a organização e o alinhamento dos componentes.
        // justify-start: Posiciona os itens no inicio do componente, funcionando exclusivamente no display flex
        // mx-5: Define a margem horizontal de 5 para cada lado, proporcionando espaçamento relativo ao tamanho da tela.
        // my-3: Define a margem vertical de 3 para cada lado, proporcionando espaçamento relativo ao tamanho da tela.
        <nav className="flex justify-start mx-5 my-3">
            {/* 
                O componente <Link> será responsavel por redirecionar o usuario, já 
                a propriedade 'to' define a rota que para onde será enviado o usuario que recebe o valor de "para"
            */}
            <Link to={`/${para}`}>
                {/* text-p-responsive: classe criada no arquivo tailwind.config.js para facilitar a responsividade da tag <p>. */}
                <p className="text-p-responsive">
                    Voltar
                </p>
            </Link>
        </nav>
    )
}
