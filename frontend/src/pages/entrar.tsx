import { PaginaCorpo, PaginaRodape, PaginaMeio, PaginaTopo } from "../components/PageLayout/LayoutPagina";
import Image from '../assets/rick-and-morty-31042.png'
import { Button } from "../components/ui/button";
import { Creditos } from "@/components/Creditos";
import { Voltar } from "@/components/Voltar";
import { Label } from "@/components/ui/label";
import { Input, InputSenha } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/hooks/use-toast"
import { Login } from "@/types/types";
import { autentica } from "@/service/service";

export default function Entrar() {
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [carregando, setCarregando] = useState<boolean>(false);
    const [avisoInput, setAvisoInput] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setCarregando(true);

            const response = await autentica({ email, senha } as Login);

            if (response.success) {
                localStorage.setItem("authToken", response.data);
                navigate("/central");
            } else {
                if (response.error == "Erro: E-mail não Informado!") {
                    setAvisoInput("Email");
                    toast({
                        variant: 'destructive',
                        title: 'E-mail não Informado',
                        description: 'E-mail não foi informado. Forneça um e-mail para continuar.',
                    });                    

                } else if (response.error == "Erro: E-mail com Formato Invalido!") {
                    setAvisoInput("Email");
                    toast({
                        variant: 'destructive',
                        title: 'E-mail com Formato Invalido',
                        description: 'O formato do endereço de e-mail inserido é inválido. Verifique e tente novamente.',
                    });

                } else if (response.error == "Erro: Senha não Informada!") {
                    setAvisoInput("Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Senha não Informada',
                        description: 'Senha não foi informado. Forneça um senha para continuar.',
                    });                    
                } else if (response.error == "Erro: Senha com Formato Invalido!") {
                    setAvisoInput("Senha");
                    toast({
                        variant: 'destructive',
                        title: 'Senha com Formato Invalido',
                        description: 'O formato da senha inserido é inválido. Forneça uma senha que atenda aos critérios mínimos, incluindo pelo menos uma letra maiúscula, um número e um caractere especial e no minimo 8 caracteres.',
                    });

                }  else if (response.error == "Erro: E-mail ou Senha Incorretos!") {
                    setAvisoInput("Email-Senha")
                    toast({
                        variant: 'destructive', 
                        title: 'E-mail ou Senha Incorretos', 
                        description: 'O e-mail ou a senha inseridos são incorretos. Por favor, tente novamente.', 
                    });

                } else {
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

        if (token) {
            localStorage.removeItem('authToken');
        }
    }, []);

    return (
        <PaginaCorpo>
            <PaginaTopo>
                <Voltar para="inicio"/>
            </PaginaTopo>
            <PaginaMeio>
                <div className="hidden lg:block">
                    <img 
                        src={Image}
                        className="px-[4vw]"
                    />
                </div>
                <div className="grid place-items-center items-start gap-5 xxs:gap-8 xs:gap-5 mx-[6.8vw] mb-[4vw]">
                    <div className="lg:hidden">
                        <img 
                            src={Image}
                            className="px-[13vw] xxs:px-[8vw] xs:px-[20vw]"
                        />
                    </div>
                    <form onSubmit={handleSubmit} className="grid place-items-center items-center gap-2">
                        <div className="text-center text-gray-900">
                            <h1 className="font-semibold text-[8.9vw] xxs:text-[10.4vw] xs:text-[7.3vw] lg:text-[4vw] xl:text-[3.4vw] leading-[1.2]">
                                Seja bem-vindo!
                            </h1>
                            <p className="xxs:text-lg xs:text-xl sm:text-[2.7vw] lg:text-base xl:text-[1.3vw] xl:leading-[1.2]">
                                Conecte-se para utilizar nossa ferramenta.
                            </p>
                        </div>
                        <div className="w-full grid gap-2">
                            <div>
                                <Label htmlFor="email">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    placeholder="nome@exemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={["Email", "Email-Senha"].includes(avisoInput)  ? "border-red-500" : ""}
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
                                    className={["Senha", "Email-Senha"].includes(avisoInput) ? "border-red-500" : ""}
                                    onClick={() => setAvisoInput("")}
                                />
                            </div>
                        </div>
                        <div className="w-full mt-2">
                            <Button
                                type="submit"
                                className="w-full"
                            >
                                {
                                    carregando ?
                                    <Spinner />
                                    : "Entrar"
                                }
                            </Button>
                        </div>
                        <div className="flex gap-1 text-p-responsive">
                            <p>
                                Nao tem uma conta?
                            </p>
                            <Link to="/cadastrar">
                                <strong>
                                    Cadastre-se!
                                </strong>
                            </Link>
                        </div>
                        <Toaster />
                    </form>
                </div>
            </PaginaMeio>
            <PaginaRodape>
                <Creditos />
            </PaginaRodape>
        </PaginaCorpo>
    )
}