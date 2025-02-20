export const PaginaCorpo = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col">
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

export const PaginaMeio = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid flex-grow">
            <div className='grid lg:grid-cols-2 place-items-center lg:mx-[5.5vw]'>
                { children }
            </div>
        </div>
    );
};

export const PaginaMeioUmaColuna = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid flex-grow">
            <div className='grid grid-cols-1 place-items-center lg:mx-[5.5vw]'>
                { children }
            </div>
        </div>
    );
};

export const PaginaRodape = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid place-items-center">
            { children }
        </div>
    );
};
