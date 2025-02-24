import { PaginaCorpo, PaginaRodape, PaginaMeio, PaginaTopo } from "../components/PageLayout/LayoutPagina";
import Image from '../assets/rick-and-morty-partying.png';
import { Button } from "../components/ui/button";
import { Creditos } from "@/components/Creditos";
import { Voltar } from "@/components/Voltar";
import { Label } from "@/components/ui/label";
import { Input, InputSenha } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/hooks/use-toast"
import { Usuario } from "@/types/types";
import { cadastrar } from "@/service/service";

export default function Cadastrar() {
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [carregando, setCarregando] = useState<boolean>(false);
    const [avisoInput, setAvisoInput] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setCarregando(true);
            const response = await cadastrar({ nome, email, senha } as Usuario);

            if (response.success) {
                toast({
                    variant: 'success',
                    title: 'Conta criada com sucesso!',
                    description: 'Bem-vindo! Sua conta foi criada. Agora você pode planejar suas viagens conosco.',
                });
                
                setNome("");
                setEmail("");
                setSenha("");
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

                } else if (response.error == "Erro: Senha Muito Pequena!") {
                    setAvisoInput("Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Senha Muito Curta',
                        description: 'Sua senha é muito curta. Por favor, insira uma senha com pelo menos 8 caracteres.',
                    });

                } else if (response.error == "Erro: Senha Muito Grande!") {
                    setAvisoInput("Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Senha Muito Grande',
                        description: 'A senha inserida é muito grande. Insira uma senha menor',
                    });
                    
                }else {
                    throw new Error("A solicitação falhou. Verifique os dados e tente novamente.");
                }
            }
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: "Ah não! Algo deu errado.",
                description: "Houve um problema com sua solicitação. Tente novamente mais tarde!",
            });    
            console.error(error);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            localStorage.removeItem('authToken');
        }
    }, []);

    return (
        <PaginaCorpo>
            <PaginaTopo>
                <Voltar para="entrar"/>
            </PaginaTopo>
            <PaginaMeio>
                <div className="grid place-items-center items-start gap-5 xxs:gap-8 xs:gap-5 mx-[6.8vw] lg:mb-[4vw]">
                    <form onSubmit={handleSubmit} className="grid place-items-center items-center gap-1 xxs:gap-2 xs:gap-1 sm:gap-2">
                        <div className="text-center text-gray-900">
                            <h1 className="font-semibold text-[8.9vw] xxs:text-[10vw] xs:text-[7.3vw] lg:text-[4vw] xl:text-[3.4vw] leading-[1.2]">
                                Junte-se a nós!
                            </h1>
                            <p className="xxs:text-lg xs:text-xl sm:text-[2.7vw] lg:text-base xl:text-[1.3vw] xl:leading-[1.2]">
                                Crie sua conta e aproveite nossos recursos.
                            </p>
                        </div>
                        <div className="w-full grid gap-1 xxs:gap-2 xs:gap-1 sm:mt-2">
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
                            <div>
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
                        </div>
                        <div className="w-full mt-1 xxs:mt-2 xs:mt-1 sm:mt-2">
                            <Button
                                type="submit"
                                className="w-full"
                            >
                                {
                                    carregando ?
                                    <Spinner />
                                    : "Criar"
                                }
                            </Button>
                        </div>
                        <Toaster />
                    </form>
                </div>
                <div>
                    <img 
                        src={Image}
                        className="my-4 px-[18vw] xxs:px-[12vw] xs:px-[24vw] sm:px-[26vw] lg:px-[8vw]"
                    />
                </div>
            </PaginaMeio>
            <PaginaRodape>
                <Creditos />
            </PaginaRodape>
        </PaginaCorpo>
    )
}