import { PaginaCorpo, PaginaRodape, PaginaMeio, PaginaTopo } from "../components/PageLayout/LayoutPagina";
import Image from '../assets/Rick-and-morty-desenho-animado-warner-artpoin9-724x1024.png'
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Creditos } from "@/components/Creditos";
import { Link } from "react-router-dom";


export default function Inicio() {
    
    return (
        <PaginaCorpo>
            <PaginaTopo>
                <header className="w-full top-0 font-semibold text-gray-900 ">
                    <nav className="flex justify-end xxs:text-lg xl:text-xl mx-5 my-3">
                        <Link to="/entrar">
                            Entrar
                        </Link>
                    </nav>
                </header>
            </PaginaTopo>
            <PaginaMeio>
                <div className="grid gap-8 sm:gap-14 mx-[6.8vw] xs:mx-[14.2vw] lg:mx-0 lg:mb-[10vw]">
                    <div className="grid place-items-center items-center gap-4 lg:gap-6">
                        <div className="text-center lg:text-start text-gray-900">
                            <h1 className="font-semibold text-[8.9vw] xxs:text-[10vw] xs:text-[7.3vw] lg:text-[4.5vw] leading-[1.2]">
                                Explore o universo de Rick and Morty!
                            </h1>
                            <p className="xxs:text-lg xs:text-xl sm:text-[2.7vw] lg:text-xl xl:text-[1.8vw] xl:leading-[1.2] mt-3">
                                Uma experiência interativa para explorar personagens através de uma API.
                            </p>
                        </div>
                        <div className="lg:w-full">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button 
                                        size={"xl"} 
                                        className="xxsS:text-lg text-lg sm:text-xl xl:text-xl sm:h-12 lg:h-10 sm:px-16 sm:px-12 xl:h-12 xl:px-18 shadow-xl"
                                    >
                                        Sobre a animação
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Sobre Rick and Morty
                                        </DialogTitle>
                                        <DialogDescription asChild>
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
                                                    A série possui 7 temporadas até o momento desmonstra o seu grande sucesso com os expectadores, provando que seu estilo de gênero atrai muito público.
                                                </p>
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <div className="lg:hidden">
                        <img 
                            src={Image}
                            className="px-[4vw] xxs:px-0 xs:px-[6vw] sm:px-[4vw]"
                        />
                    </div>
                </div>
                <div className="hidden lg:block">
                    <img 
                        src={Image}
                        className="px-[5.5vw]"
                    />
                </div>
            </PaginaMeio>
            <PaginaRodape>
                <Creditos />
            </PaginaRodape>
        </PaginaCorpo>
    )
}