import { Creditos } from "@/components/Creditos";
import { PaginaCorpo, PaginaRodape, PaginaMeioUmaColuna, PaginaTopo } from "../components/PageLayout/LayoutPagina";
import { Check, ChevronDown, Menu, MoveRight  } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input, InputSenha } from "@/components/ui/input";
import { Info, Filtro, Navegacao, Personagem, Usuario } from "@/types/types";
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
    const dadosMenu: string[] = ['Nome', 'Status', 'Especie', 'Genero','Localizacao'];
    const api = `https://rickandmortyapi.com/api/character?page=${numeroPagina}`

    const handleMudarDados = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setCarregando(true);

            const response = await mudarInfo({ nome, email, operacao: "Info" } as Info);

            if (response.success) {
                carregarUsuario();
                setDesabilitarBtn(true);

                toast({
                    variant: 'success',
                    title: 'Informações atualizadas!',
                    description: 'Suas informações foram alteradas com sucesso.',
                });
            } else {
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
                    
                }else {
                    throw new Error("A solicitação falhou. Verifique os dados e tente novamente.");
                }
            }
        } catch (erro: any) {
            toast({
                variant: 'destructive',
                title: "Ah não! Algo deu errado.",
                description: "Houve um problema com sua solicitação. Tente novamente mais tarde!",
            });    
            console.error(erro);
        } finally {
            setCarregando(false);
        }
    };

    const handleMudarSenha = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setCarregando(true);

            const response = await mudarInfo({ senha, novaSenha } as Info);

            if (response.success) {
                carregarUsuario();
                setSenha("");
                setNovaSenha("");

                toast({
                    variant: 'success',
                    title: 'Senha alterada!',
                    description: 'Sua senha foi alterada com sucesso. Use a nova senha para acessar sua conta.',
                });
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
                    throw new Error("A solicitação falhou. Verifique os dados e tente novamente.");
                }
            }
        } catch (erro: any) {
            toast({
                variant: 'destructive',
                title: "Ah não! Algo deu errado.",
                description: "Houve um problema com sua solicitação. Tente novamente mais tarde!",
            });    
            console.error(erro);
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
            console.error(erro);
        }
    };

    const carregarUsuario = async () => {
        try {
            const response = await getUsuario();

            if (response.success) {
                setUsuario(response.data);
                setNome(response.data.nome);
                setEmail(response.data.email);
            } else {
                throw new Error("A solicitação falhou. Verifique os dados e tente novamente.");
            }

        } catch (erro: any) {
            toast({
                variant: 'destructive',
                title: "Ah não! Algo deu errado.",
                description: "Houve um problema com sua solicitação. Tente novamente mais tarde!",
            });    
            console.error(erro);
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
                        status: 
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
            console.error(erro);
        }
    };

    useEffect(() => {

        if (usuario) {
            if (((nome != usuario.nome || email != usuario.email) && (nome != "" && email != "")) || (senha != "" && novaSenha != "")) {
                setDesabilitarBtn(false);
            } else {
                setDesabilitarBtn(true);
            }


        }

    }, [nome, email, senha, novaSenha]);

    useEffect(() => {
        carregarUsuario();
        carregarPersonagens();
    }, [api]);

    return (
        <PaginaCorpo>
            <PaginaTopo>
                <nav className="flex justify-between items-center xxs:text-lg xl:text-xl mx-5 my-3">
                    <div className="flex justify-center items-center gap-2">
                        <h1 className="font-semibold text-[5vw] xs:text-[3.5vw] sm:text-[3vw] lg:text-[1.6vw] xl:text-xl break-all">
                            Olá, { usuario?.nome.split(' ')[0] }!👋 
                        </h1>
                    </div>
                    <div>
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
                            <SheetTrigger className="ml-20" asChild>
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
                                            className="w-full bg-gradient-to-tr from-[#1a9f9a] to-[#b6c937] text-primary-foreground shadow-lg transition-all duration-300 hover:bg-gradient-to-bl hover:from-[#b6c937] hover:to-[#1a9f9a]"
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
                                <Button className="h-10 ml-auto">
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
                    <div className="grid place-items-center items-start xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mt-6">
                    {
                        (() => {
                            const data = personagens.map((personagem: Personagem) => {
                            const key = filtro.por.toLowerCase() as keyof Personagem;

                            return (
                                filtro.por === "Filtro" ||
                                (filtro.por !== "Filtro" &&
                                personagem[key].toLowerCase().includes(filtro.valor.toLowerCase())) ? (
                                    <Card key={personagem.id} className="hover:-mt-3 hover:mb-3 transition-all">
                                        <CardHeader>
                                            <CardTitle>
                                                {personagem.nome}
                                            </CardTitle>
                                            <CardDescription>
                                                <p className="xs:grid text-sm font-medium leading-none">
                                                    Última Localização:
                                                <span className="ml-1 break-words underline">
                                                    {
                                                        personagem.localizacao !== "Unkown" ? personagem.localizacao : "Desconhecida"
                                                    }
                                                </span>
                                                </p>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="relative">
                                            <div>
                                                <img className="rounded-lg" src={personagem.imagem} />
                                            </div>
                                            <div
                                                className={`${
                                                    ["Vivo", "Viva"].includes(personagem.status) ? "bg-green-600" : 
                                                    ["Morto", "Morta"].includes(personagem.status) ? "bg-red-500" : 
                                                    "bg-[#707070]"
                                                } font-semibold px-5 py-0.5 rounded-r-lg absolute top-0 mt-4 text-white`}
                                            >
                                                <p className="text-center">
                                                    { personagem.status }
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ) : null
                            );
                        });

                            const validData = data.filter((item) => item !== null);

                            return validData.length > 0 ? validData : <p className="text-p-responsive text-center absolute  px-[13.3vw] xxs:px-[14.8vw] lg:px-[20vw]">Nenhum personagem foi retornado nessa pagina!</p>;
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
                        <PaginationItem className="text-sm font-semibold text-gray-900">
                            Pagina { numeroPagina } 
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
