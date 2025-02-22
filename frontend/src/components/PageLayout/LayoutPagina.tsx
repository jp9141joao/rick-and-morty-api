import { cn } from "@/lib/utils";

export const PaginaCorpo = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("flex min-h-screen flex-col", className)}>
            { children }
        </div>
    );
};

export const PaginaTopo = ({ children }: { children: React.ReactNode }) => {
    return (
        <header className="">
            { children }
        </header>
    );
};

export const PaginaMeioUmaColuna = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className="grid flex-grow">
            <div className={cn("grid grid-cols-1 place-items-center lg:mx-[5.5vw]", className)}>
                { children }
            </div>
        </div>
    );
};

export const PaginaMeio = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid flex-grow">
            <div className='grid lg:grid-cols-2 place-items-center lg:mx-[5.5vw]'>
                { children }
            </div>
        </div>
    );
};

export const PaginaRodape = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn(`grid place-items-center ${className}`)}>
            { children }
        </div>
    );
};
