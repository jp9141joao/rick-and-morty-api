import { Creditos } from "@/components/Creditos";
import { PaginaCorpo, PaginaRodape, PaginaMeioUmaColuna, PaginaTopo } from "../components/PageLayout/LayoutPagina";
import { Check, ChevronDown, Menu, MoveRight  } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input, InputSenha } from "@/components/ui/input";
import { AlterarInfo, Filtro, Navegacao, Personagem, Usuario } from "@/types/types";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { getUsuario, mudarInfo } from "@/service/service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";



export default function Central() {
    const [usuario, setUsuario] = useState<Usuario>();
    const [nome, setNome] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [desabilitarBtn, setDesabilitarBtn] = useState<boolean>(false);
    const [senha, setSenha] = useState<string>('');
    const [novaSenha, setNovaSenha] = useState<string>('');
    const [carregando, setCarregando] = useState<boolean>(false);
    const [avisoInput, setAvisoInput] = useState<string>('');
    const [conteudo, setConteudo] = useState<string>('Menu');
    const [filtro, setFiltro] = useState<Filtro>({
        por: 'Filtro', valor: ''
    });
    const [personagens, setPersonagens] = useState<Personagem[]>([]);
    const [itemSelecionado, setItemSelecionado] = useState<string>('Filtro');
    const [numeroPagina, setNumeroPagina] = useState<number>(1);
    const [navegacao, setNavegacao] = useState<Navegacao>({
        voltar: null, proximo: ''
    });
    const dadosMenu: string[] = ['Nome', 'Estatus', 'Localizacao'];
    const api = `https://rickandmortyapi.com/api/character?page=${numeroPagina}`

    const handleMudarDados = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setCarregando(true);

            const response = await mudarInfo({ nome, email } as AlterarInfo);

            if (response.success) {
                carregarUsuario();
                setDesabilitarBtn(true);
            } else {
                if (response.error = "Erro: Nome Completo Inválido!") {
                    setAvisoInput("Nome");
                    toast({
                        variant: 'destructive',
                        title: 'Nome Completo Inválido',
                        description: 'Por favor, forneça um nome completo válido contendo apenas letras e espaços.',
                    });                    

                } else if (response.error = "Erro: Nome Completo Muito Grande!") {
                    setAvisoInput("Nome");
                    toast({
                        variant: 'destructive',
                        title: 'Nome Completo Muito Grande',
                        description: 'O nome completo inserido é muito grande. Insira um nome completo menor',
                    });

                } else if (response.error = "Erro: E-mail Inválido!") {
                    setAvisoInput("Email");
                    toast({
                        variant: 'destructive',
                        title: 'E-mail Inválido',
                        description: 'O endereço de e-mail inserido é inválido. Verifique e tente novamente',
                    });

                }  else if (response.error = "Erro: E-mail Muito Grande!") {
                    setAvisoInput("Email");
                    toast({
                        variant: 'destructive',
                        title: 'E-mail Muito Grande',
                        description: 'O e-mail inserido é muito grande. Insira um e-mail menor',
                    });
                    
                } else {
                    throw new Error("A solicitação falhou. Verifique os dados e tente novamente.");
                }
            }
        } catch (erro: any) {
            toast({
                variant: 'destructive',
                title: "Ah não! Algo deu errado.",
                description: "Houve um problema com sua solicitação. Tente novamente mais tarde!",
            });    
            console.log(erro);
        } finally {
            setCarregando(false);
        }
    };

    const handleMudarSenha = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setCarregando(true);

            const response = await mudarInfo({ senha, novaSenha } as AlterarInfo);

            if (response.success) {
                carregarUsuario();
                setSenha("");
                setNovaSenha("");
            } else {
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

                } if (response.error == "Erro: Nova Senha Inválido!") {
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
                    throw new Error("A solicitação falhou. Verifique os dados e tente novamente.");
                }
            }
        } catch (erro: any) {
            toast({
                variant: 'destructive',
                title: "Ah não! Algo deu errado.",
                description: "Houve um problema com sua solicitação. Tente novamente mais tarde!",
            });    
            console.log(erro);
        } finally {
            setCarregando(false);
        }
    };

    const handleSair = () => {
        try {
            localStorage.removeItem("authToken");
            window.location.reload();
        } catch (erro: any) {
            toast({
                variant: 'destructive',
                title: "Ah não! Algo deu errado.",
                description: "Houve um problema com sua solicitação. Tente novamente mais tarde!",
            });    
            console.log(erro);
        }
    };

    const carregarUsuario = async () => {
        try {
            const response = await getUsuario();

            if (response.success) {
                setUsuario(response.data);
            } else {
                throw new Error("A solicitação falhou. Verifique os dados e tente novamente.");
            }

        } catch (erro: any) {
            toast({
                variant: 'destructive',
                title: "Ah não! Algo deu errado.",
                description: "Houve um problema com sua solicitação. Tente novamente mais tarde!",
            });    
            console.log(erro);
        }
    };

    const carregarPersonagens = async () => {
        try {
            const response = await fetch(api).then( res => res.json() );

            if (response.results.length > 0) {

                let dadosPersonagens: Personagem[] = response.results.map((personagem: any) => {
                    const g: string = personagem.gender == "Female" ? "a" : "o"
                    
                    return {
                        id: personagem.id,
                        nome: personagem.name,
                        estatus: 
                            personagem.status == "Alive" ? `Viv${g}` :
                            personagem.status == "Dead" ? `Mort${g}` :
                            "Desconhecido",
                        especie: personagem.species,
                        tipo: personagem.type,
                        genero: 
                            personagem.gender == "Female" ? "Feminino" :
                            personagem.gender =="Male" ? "Masculino" :
                            "Desconhecido",
                        origem: personagem.origin.name == "Unkown" ? "Desconhecido" : personagem.origin.name,
                        localizacao: personagem.location.name == "Unkown" ? "Desconhecido" : personagem.location.name,
                        imagem: personagem.image
                    }
                });
                console.log(JSON.stringify(dadosPersonagens, null, 2))
                setNavegacao({
                    voltar: response.info.prev,
                    proximo: response.info.next
                });
                setPersonagens(dadosPersonagens);
            } else {
                throw new Error("A solicitação falhou. Verifique os dados e tente novamente.");
            }
            
        } catch (erro: any) {
            toast({
                variant: 'destructive',
                title: "Ah não! Algo deu errado.",
                description: "Houve um problema com sua solicitação. Tente novamente mais tarde!",
            });    
            console.log(erro);
        }
    };

    useEffect(() => {
        /*
        if (!usuario) {
            throw new Error("Erro: Usuario está faltando!");
        }

        if (nome != usuario.nome || email != usuario.email) {
            setDesabilitarBtn(false);
        } else {
            setDesabilitarBtn(true);
        }
        */

    }, [nome, email]);

    useEffect(() => {
        //carregarUsuario();
        carregarPersonagens();
    }, [api]);

    return (
        <PaginaCorpo>
            <PaginaTopo>
                <header className="w-full top-0 font-semibold text-gray-900 ">
                    <nav className="flex justify-between items-center xxs:text-lg xl:text-xl mx-5 my-3">
                        <div className="flex justify-center items-center gap-2">
                            <h1 className="font-semibold text-[5vw] xs:text-[3.5vw] sm:text-[3vw] lg:text-[1.6vw] xl:text-[1vw] break-all">
                                Olá, João!👋 
                            </h1>
                        </div>
                        <div>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Menu className="cursor-pointer"/>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader className="grid place-items-center">
                                        <SheetTitle className="text-xl ml-3 mt-3">
                                            {
                                                conteudo == "Menu" ? "Menu" :
                                                conteudo == "Mudar-Dados" ? "Mudar Informações" :
                                                conteudo == "Mudar-Senha" ? "Mudar Senha" : 
                                                null
                                            }
                                        </SheetTitle>
                                    </SheetHeader>  
                                    {
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
                                    }
                                    {
                                        conteudo != "Menu" && conteudo != "" ?
                                        <div className="grid gap-2 w-full mt-3">
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
                                                Alterar
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
                </header>
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
                                <Button variant="outline" className="h-10 ml-auto">
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
                    <div className="grid place-items-center items-start xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                    {
                        (() => {
                            const data = personagens.map((personagem: Personagem) => {
                            const key = filtro.por.toLowerCase() as keyof Personagem;

                            return (
                                filtro.por === "Filtro" ||
                                (filtro.por !== "Filtro" &&
                                personagem[key].toLowerCase().includes(filtro.valor.toLowerCase())) ? (
                                    <Card key={personagem.id} className="">
                                    <CardHeader>
                                    <CardTitle>{personagem.nome}

                                    </CardTitle>
                                    <CardDescription>
                                        <p className="xs:grid text-sm font-medium leading-none">
                                        Última Localização:
                                        <span className="ml-1 break-words underline">
                                            {personagem.localizacao !== "Unkown"
                                            ? personagem.localizacao
                                            : "Desconhecida"}
                                        </span>
                                        </p>
                                    </CardDescription>
                                    </CardHeader>
                                    <CardContent className="relative">
                                    <div>
                                        <img className="rounded-lg" src={personagem.imagem} alt={personagem.nome} />
                                    </div>
                                    <div
                                        className={`${
                                        ["Vivo", "Viva"].includes(personagem.estatus)
                                            ? "bg-green-600"
                                            : ["Morto", "Morta"].includes(personagem.estatus)
                                            ? "bg-red-500"
                                            : "bg-[#707070]"
                                        } font-semibold px-5 py-0.5 rounded-r-lg absolute top-0 mt-4 text-white`}
                                    >
                                        <p className="text-center">{personagem.estatus}</p>
                                    </div>
                                    </CardContent>
                                </Card>
                                ) : null
                            );
                    });

    // Filtra os itens nulos
    const validData = data.filter((item) => item !== null);

    return validData.length > 0 ? validData : <p>Nenhum personagem foi retornado!</p>;
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
