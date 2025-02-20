import { PaginaCorpo, PaginaRodape, PaginaMeioUmaColuna, PaginaTopo } from "../components/PageLayout/LayoutPagina";
import Image from '../assets/rick-and-morty-31042.png'
import { Button } from "../components/ui/button";
import { Creditos } from "@/components/Creditos";
import { Voltar } from "@/components/Voltar";
import { Label } from "@/components/ui/label";
import { Input, InputSenha } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/hooks/use-toast"
import { Login } from "@/assets/types/types";

export default function Entrar() {
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [carregando, setCarregando] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setCarregando(true);
            const response = await autentica({ email, senha } as Login);

            if (response.success) {
                localStorage.setItem("authToken", response.data);
                navigate("/central-de-personagens");
            } else {
                if (response.error = "") {
                    
                } else {
                    throw new Error("");
                }
            }
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: "Ah não! Algo deu errado.",
                description: "Houve um problema com sua solicitação. Tente novamente mais tarde!",
            });    
            console.log(error);
        } finally {
            setCarregando(false);
        }
    }

    return (
        <PaginaCorpo>
            <PaginaTopo>
                <Voltar para="inicio"/>
            </PaginaTopo>
            <PaginaMeioUmaColuna>
                <div className="grid gap-8 mx-[6.8vw]">
                    <div>
                        <img 
                            src={Image}
                            className="px-[8vw]"
                        />
                    </div>
                    <div className="grid place-items-center items-center gap-4">
                        <div className="text-center text-gray-900">
                            <h1 className="font-semibold xxs:text-[10vw] leading-[1.2]">
                                Seja Bem-Vindo!
                            </h1>
                            <p className="text-lg">
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
                                />
                            </div>
                            <div>
                                <Label htmlFor="senha">
                                    Senha
                                </Label>
                                <InputSenha
                                    id="senha"
                                    placeholder="Abc1234#"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex w-full gap-2 text-start">
                            <p>
                                Esqueceu a senha?
                            </p>
                            <Link to="/mudar-senha">
                                <strong>
                                    Clique aqui!
                                </strong>
                            </Link>
                        </div>
                        <div className="w-full">
                            <Button
                                className="w-full"
                                onClick={handleSubmit}
                            >
                                {
                                    carregando ?
                                    <Spinner />
                                    : "Entrar"
                                }
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <p>
                                Nao tem uma conta?
                            </p>
                            <Link to="/cadastrar" className="underline">
                                Cadastre-se!
                            </Link>
                        </div>
                        <Toaster />
                    </div>
                </div>
            </PaginaMeioUmaColuna>
            <PaginaRodape>
                <Creditos />
            </PaginaRodape>
        </PaginaCorpo>
    )
}