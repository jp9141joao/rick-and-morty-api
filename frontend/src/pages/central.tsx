import { Creditos } from "@/components/Creditos";
import { PaginaCorpo, PaginaRodape, PaginaMeio, PaginaTopo } from "../components/PageLayout/LayoutPagina";
import { AlignJustify, ChevronDown, LogOut, Menu, Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import IconRick from "../assets/icon-rick.png";
import IconMorty from "../assets/icon-morty.png";
import IconJerry from "../assets/icon-jerry.png";
import IconSummer from "../assets/icon-summer.png";
import IconBeth from "../assets/icon-beth.png";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input, InputSenha } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Usuario } from "@/types/types";



export default function Central() {
    const [usuario, setUsuario] = useState<Usuario>();
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [alterar, setAlterar] = useState<boolean>(false);
    const [senha, setSenha] = useState<string>('');
    const [novaSenha, setNovaSenha] = useState<string>('');
    const [carregando, setCarregando] = useState<boolean>(false);
    const [avisoInput, setAvisoInput] = useState<string>("");

    useState(() => {

    }, []);

    return (
        <PaginaCorpo>
            <PaginaTopo>
                <header className="w-full top-0 font-semibold text-gray-900 ">
                    <nav className="flex justify-between items-center xxs:text-lg xl:text-xl mx-5 my-3">
                        <div className="flex justify-center items-center gap-2">
                            <h1 className="font-semibold text-[6vw]">
                                Olá, João!👋 
                            </h1>
                        </div>
                        <div>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Menu />
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                    <SheetTitle>
                                        Meu Perfil
                                    </SheetTitle>
                                    </SheetHeader>
                                    <div className="grid gap-3 my-4">
                                        <div>
                                            <Label htmlFor="nome">
                                                Nome Completo
                                            </Label>
                                            <Input
                                                id="nome"
                                                placeholder="Seu nome completo"
                                                value={email}
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
                                        
                                    </div>
                                    <SheetFooter>
                                    <SheetClose asChild>
                                        <Button type="submit">Save changes</Button>
                                    </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </nav>
                </header>
            </PaginaTopo>
            <PaginaMeio>
                <div>
                    <h1 className="text-center font-semibold text-[8.9vw] xxs:text-[10vw] xs:text-[7.3vw] lg:text-[4.5vw] leading-[1.2]">
                        Minha Conta
                    </h1>
                </div>
            </PaginaMeio>
            <PaginaRodape>
                <Creditos />
            </PaginaRodape>
        </PaginaCorpo>
    )
}

/*
<DropdownMenu>
                            <DropdownMenuTrigger asChild >
                                <Avatar>
                                    <AvatarImage 
                                        src={avatar}
                                    />
                                </Avatar>                  
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    {
                                        iconsData.map((obj: any) => (
                                            obj.icon != avatar ? (
                                                obj.separador ?
                                                <>
                                                    <DropdownMenuItem onClick={() => setAvatar(obj.icon)}>
                                                        <Avatar>
                                                            <AvatarImage 
                                                                src={obj.icon}
                                                            />
                                                        </Avatar>    
                                                    </DropdownMenuItem>
                                                    <Separator />
                                                </> : 
                                                <DropdownMenuItem onClick={() => setAvatar(obj.icon)}>
                                                    <Avatar>
                                                        <AvatarImage 
                                                            src={obj.icon}
                                                        />
                                                    </Avatar>    
                                                </DropdownMenuItem>
                                            ) : null   
                                        ))
                                    }
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>





                        <div className="grid items-center gap-1">
                                            <Label htmlFor="senha">
                                                Senha
                                            </Label>
                                            <InputSenha
                                                id="senha"
                                                value={senha}
                                                onChange={(e) => setSenha(e.target.value)}
                                                className={avisoInput == "senha" ? "border-red-500" : ""}
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
                                                className={avisoInput == "nova-senha" ? "border-red-500" : ""}
                                                onClick={() => setAvisoInput("")}
                                            />
                                        </div>
*/