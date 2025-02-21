import { Link } from "react-router-dom";

export function Voltar({ para }: { para: string }){
    
    return (
        <header className="w-full top-0 font-semibold text-gray-900 ">
            <nav className="flex justify-start mx-5 my-3">
            <Link to={`/${para}`}>
                    <p className="text-p-responsive">
                        Voltar
                    </p>
                </Link>
            </nav>
        </header>
    )
} 