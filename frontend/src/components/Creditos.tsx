// O componente <Creditos> é uma função que retorna um rodapé com os creditos, e que ao clicar redireciona para o meu Linkedin.
export const Creditos = () => {
    return (
        // Usa um elemento <footer> para estruturar o rodapé da página, deixando explicito que se trata de um rodapé.
        <footer>
            {/* text-p-responsive: classe criada no arquivo tailwind.config.js para facilitar a responsividade da tag <p>. */}
            <p className="text-p-responsive">
                Criado por 
                
                {/* A tag <a> é utilizada para redirecionar o usuario para o link definido no href */}
                <a className="underline ml-1" href={"https://www.linkedin.com/in/joaopedrorosadepaula/"}>
                    ©João Pedro R. de Paula
                </a>
            </p>
        </footer>
    )
}
