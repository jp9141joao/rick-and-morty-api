import React from 'react'; // Importa a biblioteca React, necessária para componentes em React.
import { cn } from '@/lib/utils'; // Importa a função cn(), que é utilizada para concatenar, manipular e combinar classes dinamicamente.
import { VariantProps, cva } from 'class-variance-authority' // Importa VariantProps e cva
// VariantProps: Tipo gerado no automaticamente pelo cva que garante sua tipagem correta no TS.
// cva(): Utilizada para criar classes dinamicas no CSS 
import { Loader2 } from 'lucide-react'; // Importa o ícone 'Loader2' da biblioteca 'lucide-react' para ser usado como um ícone de carregamento.


// spinnerVariants define as variações de estilo para o contêiner do spinner.
// O cva() cria uma função que aceita um objeto de variantes e classes padrão, ajudando a gerar a classe CSS dinamicamente.
const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    // Define as variantes para a visibilidade do spinner.
    // Quando show é verdadeiro, o spinner irá possuir a classe flex e será exibido, 
    // caso false o spinner será escondido devido a classe hiden.
    show: {
      true: 'flex', 
      false: 'hidden',
    },
  },
  defaultVariants: {
    // Define o valor padrão para show como true.
    show: true,
  },
});

// loaderVariants define as variações para o ícone de carregamento.
const loaderVariants = cva('animate-spin text-white', {
  variants: {
    // Define os tamanhos possíveis para o spinner.
    size: {
      small: 'size-6',   // Tamanho pequeno para o spinner que terá um size de 6px.
      medium: 'size-8',  // Tamanho médio para o spinner que terá um size de 8px.
      large: 'size-12',  // Tamanho grande para o spinner que terá um size de 12px.
    },
  },
  defaultVariants: {
    // Define o valor padrão para o tamanho como large.
    size: 'large',
  },
});

// <SpinnerContentProps> define as propriedades que o componente Spinner pode receber.
interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,   // Variantes do spinner de visibilidade.
    VariantProps<typeof loaderVariants> {        // Variantes do loader detamanho.
      className?: string;   // Permite passar classes adicionais para o componente.
      children?: React.ReactNode;  // Permite passar filhos para o componente, como texto ou outros elementos.
}

// <Spinner> renderiza o spinner com base nas propriedades recebidas.
export function Spinner({ size, show, children, className }: SpinnerContentProps) {
  return (
    // A classe dinâmica do contêiner do spinner é definida pelas variantes spinnerVariants com base na prop show.
    <span className={spinnerVariants({ show })}>
        {/* O Loader2 é exibido com o tamanho definido pelas variantes loaderVariants e outras classes adicionais. */}
        <Loader2 className={cn(loaderVariants({ size }), className)} />
        {/* Renderiza os filhos passados para o componente, caso existam. */}
        { children } 
    </span>
  );
}

