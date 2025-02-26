export class Utils {
    // Verifica se o valor existe, ou seja, não é undefined, null, vazio ou false
    public static ValorExiste(valor: any): boolean {
        return valor !== undefined && valor !== null && valor !== '' && valor !== false;
    }    
    
    // Checa se o email se o email e valido
    public static EmailValido(email: any): boolean {
        try {
            // Define um padrão básico para emails como nome@exemplo.com.
            const emailPadrao = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            // Verifica se o email bate com esse padrão e se e realmente uma string
            return emailPadrao.test(email) && typeof email == 'string';
        } catch {
            // Se der algum erro, retorna false
            return false;
        }
    }

    // Valida se a senha se a senha e valida
    public static SenhaValida(senha: any): boolean {
        try {
            // Define um padrão basico para senhas, pelo menos uma letra, um número,
            // um caractere especiale e uma letra maiúscula, tambem e necessario ter no minimo 8 caracteres
            const senhaPadrao = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
            // Testa se a senha atende ao padrão e se é uma string
            return senhaPadrao.test(senha) && typeof senha == 'string';
        } catch {
            // Em caso de erro, retorna false
            return false;
        }
    }

    // Valida se o nome completo e valido
    public static NomeValido(nome: any): boolean {
        try {
            // Remove espaços extras e divide o nome nas partes.
            const partes = nome.trim().split(/\s+/);
    
            // Se tiver menos de duas partes, o nome não é válido pois um 
            // nome completo tem pelo menos dois nomes.
            if (partes.length < 2) return false;
    
            // Verifica cada parte para garantir que tem pelo menos 2 letras e só letras.
            const valido = partes.every((part: any) => {
                if (part.length < 2) return false;
                return /^[a-zA-ZÀ-ÖØ-öø-ÿ'-]+$/.test(part);
            });
    
            // Retorna true se todas as partes forem válidas e se o nome for uma string.
            return valido && typeof nome == 'string';
        } catch {
            // Se ocorrer algum erro, retorna false.
            return false;
        }
    }
}
