import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function Voltar({ para }: { para: string }){
    
    return (
        <header className="w-full top-0 font-semibold text-gray-900 ">
            <nav className="flex justify-start text-lg mx-5 my-3">
            <Link to={`/${para}`}>
                    <div className="flex items-center gap-1">
                        <MoveLeft className="w-7 h-auto"/>
                    </div>
                </Link>
            </nav>
        </header>
    )
} 