import { Creditos } from "@/components/Creditos";
import { PaginaCorpo, PaginaMeioUmaColuna, PaginaRodape, PaginaTopo } from "@/components/PageLayout/LayoutPagina";
import { Voltar } from "@/components/Voltar";
import { useEffect } from "react";

export default function PaginaNaoEncontrada() {

    return (
        <PaginaCorpo>
            <PaginaTopo>
                <Voltar para="inicio"/>
            </PaginaTopo>
            <PaginaMeioUmaColuna>
                <div className="grid place-items-center text-center mx-[13vw]">
                    <div>
                        <h1 className="text-xl font-semibold">
                            Página Não Encontrada!
                        </h1>
                    </div>
                    <div>
                        <p className="text-p-responsive">
                            A página que você está procurando não existe. Ela pode ter sido movida ou excluída.
                        </p>
                    </div>
                </div>
            </PaginaMeioUmaColuna>
            <PaginaRodape>
                <Creditos />
            </PaginaRodape>
        </PaginaCorpo>
    )
}