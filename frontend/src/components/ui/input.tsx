import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-2 border-[#bfbfbf] bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus:border-3 focus:border-[#707070] hover:border-[#707070] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

// O componente <InputIntegrado> é um input customizado que possui as mesmas propriedades do componente <Input>
// porém com umas pequenas modificacoes.
const InputIntegrado = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        /*
          rounded-l-md: Arredonda os cantos da esquerda com um raio médio.
          border-t-2: Define a espessura da borda superior como 2px.
          border-b-2: Define a espessura da borda inferior como 2px.
          border-l-2: Define a espessura da borda esquerda como 2px.
          border-r-1: Define a espessura da borda direita como 1px.
          border-[#bfbfbf]: Define a cor da borda como o tom de cinza.
          focus:border-[#707070]: Ao receber foco, a cor da borda muda para um tom de cinza escuro.
          hover:border-[#707070]: Ao passar o mouse sobre o elemento, a cor da borda muda para um tom de cinza escuro.
        */
        className={cn(
          "flex h-10 w-full border rounded-l-md border-t-2 border-b-2 border-l-2 border-r-1 border-[#bfbfbf] bg-transparent px-3 py-1 xxs5:px-3 xxs5:py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none hover:border-[#707070] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props} 
      />
    );
  }
);
// Define o displayName do componente para facilitar a identificação em ferramentas de desenvolvimento.
InputIntegrado.displayName = "InputIntegrado";


// O componente <InputSenha> é um input especializado para senhas, que permite alternar a visibilidade do conteúdo.
const InputSenha = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    // Cria um estado "show" para controlar se a senha será exibida ou ocultada.
    const [show, setShow] = React.useState<boolean>(false);

    return (
      // Integra o componente <InputIntegrado> ao Button, o design de cada um está ajustado para parecer que ambos 
      // os componentes juntos aparentam ser um só.
      <div className="flex w-full select-none">
        {/* 
            Renderiza o <InputIntegrado> reutilizando seus estilos.
            O tipo do input é definido condicionalmente: "text" se "show" for true, ou "password" caso contrário.
            O placeholder também muda conforme o estado para dar uma dica visual ao usuário. 
        */}
        <InputIntegrado
          className={className} // Permite passar classes customizadas.
          type={show ? "text" : "password"} // Alterna o tipo do input conforme o estado "show".
          placeholder={show ? "Abc1234#" : "********"} // Alterna o valor do placeholder conforme o estado "show".
          ref={ref} // Encaminha a ref para o InputIntegrado.
          {...props} // Espalha demais propriedades para o input.
        />
        {/*
          grid: Define o elemento como um contêiner de grid, permitindo o posicionamento flexível dos itens internos.
          place-items-center: Centraliza os itens tanto vertical quanto horizontalmente dentro do contêiner de grid.
          items-center: Alinha os itens verticalmente ao centro.
          text-[#bfbfbf]: Define a cor do texto como um tom de cinza claro.
          hover:text-[#707070]: Ao passar o mouse sobre o elemento, a cor do texto muda para um tom de cinza mais escuro.
          h-10: Define a altura do elemento como 40px (10 * 4px).
          border: Adiciona uma borda ao redor do elemento.
          rounded-r-md: Arredonda os cantos da direita com um raio médio.
          rounded-l-none: Remove qualquer arredondamento nos cantos da esquerda.
          border-t-2: Define a espessura da borda superior como 2px.
          border-b-2: Define a espessura da borda inferior como 2px.
          border-r-2: Define a espessura da borda direita como 2px.
          border-l-1: Define a espessura da borda esquerda como 1px.
          border-[#bfbfbf]: Define a cor da borda como um tom de cinza claro.
          hover:border-[#707070]: Ao passar o mouse sobre o elemento, a cor da borda muda para um tom de cinza escuro.
          hover:border-r-2: Ao passar o mouse sobre o elemento, a borda direita recebe uma espessura de 2px.
        */}
        <div
          className={cn(
            "grid place-items-center items-center text-[#bfbfbf] hover:text-[#707070] h-10 border rounded-r-md rounded-l-none border-t-2 border-b-2 border-r-2 border-l-1 border-[#bfbfbf] bg-transparent px-2 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-[#707070] hover:border-r-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          // Ao clicar, alterna o estado "show" invertendo seu valor, de true para false e vice-versa.
          onClick={() => setShow(!show)}
        >
          {/* 
            Renderiza um ícone condicional:
            Se "show" for true, exibe o componente <EyeOff> indicando o olho fechado.
            Caso contrário, exibe o componente <Eye> indicando o olho aberto.
            Ambos os ícones recebem classes para definir seu tamanho e responsividade. 
          */}
          {show ? (
            <EyeOff className="w-4 lg:w-5 h-auto xxs5:w-auto p-0" />
          ) : (
            <Eye className="w-4 lg:w-5 h-auto xxs5:w-auto p-0" />
          )}
        </div>
      </div>
    );
  }
);
// Define o displayName para facilitar a identificação do componente em ferramentas de desenvolvimento.
InputSenha.displayName = "InputSenha";

export { Input, InputIntegrado, InputSenha};
