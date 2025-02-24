import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-tr from-[#1a9f9a] to-[#b6c937] text-primary-foreground shadow-lg hover:from-[#178681] hover:to-[#9cb12f]",
          /* 
            bg-gradient-to-tr: Define um fundo com gradiente que se direciona para o canto superior direito.
            from-[#1a9f9a]: Define a cor de início do gradiente com um tom azulado.
            to-[#b6c937]: Define a cor final do gradiente com um tom esverdeado.
            shadow-lg: Aplica uma sombra maior oque dá uma profundidade maior ao componente e combina melhor com o gradiente.
            hover:from-[#178681]: Quando o usuário passa o mouse sobre o elemento, a cor de início do gradiente muda para um tom mais escuro do azul.
            hover:to-[#9cb12f]: Quando o usuário passa o mouse sobre o elemento, a cor final do gradiente muda para um tom mais escuro do verde.
          */
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "rounded-md border-2 border-[#bfbfbf] bg-transparent px-3 py-1 text-sm hover:bg-gray-200 hover:border-[#707070]",
          /*
            border-2: Aplica uma borda com largura de 2px ao elemento.
            border-[#bfbfbf]: Define a cor da borda com tom de cinza.
            px-3: Adiciona um padding na direita e esquerda de tamanho 3px.
            py-1: Adiciona um padding em cima e embaixo de tamanho 1px.
            hover:bg-gray-200: Ao passar o mouse sobre o elemento, o fundo muda para tom um cinza claro.
            hover:border-[#707070]: Ao passar o mouse, a cor da borda muda para um tom de cinza escuro.
          */
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-10 rounded-md px-12",
        /*
          xl: define um novo tamanho ao botão
          px-12: Adiciona um padding na direita e esquerda de tamanho 12px.
        */
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
